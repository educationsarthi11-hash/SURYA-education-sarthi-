
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { useToast } from '../hooks/useToast';
import { 
    SparklesIcon, MicrophoneIcon, XCircleIcon, MicrophoneSlashIcon, 
    SignalIcon, PresentationChartBarIcon, BoltIcon, StopCircleIcon,
    SpeakerWaveIcon
} from './icons/AllIcons';
import { generateImageForTopic, getOutputAudioContext } from '../services/geminiService';
import Loader from './Loader';
import { Transcript } from '../types';

// Manual Base64 Implementation
function encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
}

// Raw PCM Audio Decoder
async function decodeAudioStream(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

function createBlob(data: Float32Array): { data: string, mimeType: string } {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
        const s = Math.max(-1, Math.min(1, data[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
}

const LiveClass: React.FC<{ 
    systemInstruction: string; 
    onEnd: (transcripts: Transcript[]) => void; 
    sessionTitle: string; 
    visualAidPromptGenerator: (aiOutput: string) => string; 
    startMuted?: boolean;
}> = ({ systemInstruction, onEnd, sessionTitle, visualAidPromptGenerator, startMuted = false }) => {
    
    const toast = useToast();
    const [status, setStatus] = useState<'connecting' | 'live' | 'error'>('connecting'); 
    const [liveCaptions, setLiveCaptions] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(startMuted);
    const [currentVisual, setCurrentVisual] = useState<string | null>(null);
    const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
    
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);
    const transcriptsRef = useRef<Transcript[]>([]);
    useEffect(() => {
        transcriptsRef.current = transcripts;
    }, [transcripts]);

    const streamRef = useRef<MediaStream | null>(null);
    const sessionRef = useRef<any>(null);
    const nextStartTimeRef = useRef<number>(0);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    const cleanup = () => {
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
        sourcesRef.current.clear();
        if (sessionRef.current) sessionRef.current.close();
    };

    useEffect(() => {
        const startSession = async () => {
            try {
                const outCtx = getOutputAudioContext();
                if (outCtx.state === 'suspended') await outCtx.resume();

                const micStream = await navigator.mediaDevices.getUserMedia({ 
                    audio: { echoCancellation: true, noiseSuppression: true } 
                });
                streamRef.current = micStream;

                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const sessionPromise = ai.live.connect({
                    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                    callbacks: {
                        onopen: () => {
                            setStatus('live');
                            toast.success("AI गुरु जी क्लास में आ गए हैं!");
                            const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                            const source = inCtx.createMediaStreamSource(micStream);
                            const processor = inCtx.createScriptProcessor(4096, 1, 1);
                            processor.onaudioprocess = (audioProcessingEvent) => {
                                // Solely rely on sessionPromise resolve to send data
                                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                                const blob = createBlob(inputData);
                                sessionPromise.then(s => {
                                    if (!isMuted) s.sendRealtimeInput({ media: blob });
                                });
                            };
                            source.connect(processor);
                            processor.connect(inCtx.destination);
                        },
                        onmessage: async (message: LiveServerMessage) => {
                            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                            if (audioData) {
                                setIsSpeaking(true);
                                const buffer = await decodeAudioStream(decode(audioData), outCtx, 24000, 1);
                                const source = outCtx.createBufferSource();
                                source.buffer = buffer;
                                source.connect(outCtx.destination);
                                const playTime = Math.max(outCtx.currentTime, nextStartTimeRef.current);
                                source.start(playTime);
                                nextStartTimeRef.current = playTime + buffer.duration;
                                sourcesRef.current.add(source);
                                source.onended = () => {
                                    sourcesRef.current.delete(source);
                                    if (sourcesRef.current.size === 0) setIsSpeaking(false);
                                };
                            }
                            
                            // Accumulate model output transcriptions
                            const text = message.serverContent?.modelTurn?.parts?.find(p => p.text)?.text || message.serverContent?.outputAudioTranscription?.text;
                            if (text) {
                                setLiveCaptions(prev => (prev + " " + text).slice(-500));
                                if (text.length > 40 && !isGeneratingVisual) updateVisuals(text);
                                
                                setTranscripts(prev => {
                                    const last = prev[prev.length - 1];
                                    if (last && last.role === 'model') {
                                        return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                                    }
                                    return [...prev, { role: 'model', text }];
                                });
                            }

                            // Accumulate user input transcriptions
                            const userText = message.serverContent?.inputAudioTranscription?.text;
                            if (userText) {
                                setTranscripts(prev => {
                                    const last = prev[prev.length - 1];
                                    if (last && last.role === 'user') {
                                        return [...prev.slice(0, -1), { ...last, text: last.text + userText }];
                                    }
                                    return [...prev, { role: 'user', text: userText }];
                                });
                            }
                        },
                        onerror: () => setStatus('error'),
                        onclose: () => onEnd(transcriptsRef.current)
                    },
                    config: {
                        responseModalities: [Modality.AUDIO],
                        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                        systemInstruction,
                        outputAudioTranscription: {},
                        inputAudioTranscription: {}
                    }
                });
                sessionRef.current = await sessionPromise;
            } catch (e) { setStatus('error'); }
        };

        startSession();
        return cleanup;
    }, []);

    const updateVisuals = async (text: string) => {
        setIsGeneratingVisual(true);
        try {
            const img = await generateImageForTopic(visualAidPromptGenerator(text));
            setCurrentVisual(img);
        } catch (e) {} finally { setIsGeneratingVisual(false); }
    };

    return (
        <div className="flex flex-col h-full bg-[#020617] text-white">
            <div className="p-4 bg-slate-900 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="bg-red-500 w-3 h-3 rounded-full animate-ping"></div>
                    <h3 className="font-black text-sm uppercase tracking-widest">{sessionTitle}</h3>
                </div>
                <button onClick={() => onEnd(transcripts)} className="p-2 bg-red-600 rounded-xl hover:bg-red-700 transition-colors"><XCircleIcon className="h-6 w-6" /></button>
            </div>

            <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                <div className="lg:col-span-8 bg-slate-900 rounded-[3rem] relative flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
                    {isGeneratingVisual ? <Loader message="Updating Board..." /> : currentVisual ? <img src={currentVisual} className="max-h-full max-w-full object-contain p-8 animate-pop-in" /> : <div className="text-center opacity-20"><PresentationChartBarIcon className="h-32 w-32 mx-auto" /><p className="font-hindi text-xl mt-4">स्मार्ट बोर्ड</p></div>}
                    {isSpeaking && (
                        <div className="absolute bottom-10 right-10 flex gap-1 h-8 items-end">
                            {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 bg-primary rounded-full animate-wave" style={{animationDelay: `${i*0.1}s`}}></div>)}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4 bg-slate-900/50 rounded-[3rem] border border-white/5 p-6 flex flex-col gap-4 overflow-hidden">
                    <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2"><BoltIcon className="h-4 w-4"/> Live Captions</h4>
                    <div className="flex-1 overflow-y-auto font-hindi text-lg text-slate-300 italic leading-relaxed custom-scrollbar">
                        {liveCaptions || "सार्थी गुरु जी की प्रतीक्षा कर रहे हैं..."}
                    </div>
                </div>
            </div>

            <div className="p-8 flex justify-center bg-slate-900/80 backdrop-blur-xl border-t border-white/5">
                 <button onClick={() => setIsMuted(!isMuted)} className={`p-8 rounded-full shadow-2xl transition-all active:scale-95 border-4 ${isMuted ? 'bg-red-600 border-red-400' : 'bg-primary border-blue-400'}`}>
                    {isMuted ? <MicrophoneSlashIcon className="h-10 w-10" /> : <MicrophoneIcon className="h-10 w-10" />}
                 </button>
            </div>

            <style>{`
                @keyframes wave { 0%, 100% { height: 20%; } 50% { height: 100%; } }
                .animate-wave { animation: wave 0.8s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default LiveClass;
