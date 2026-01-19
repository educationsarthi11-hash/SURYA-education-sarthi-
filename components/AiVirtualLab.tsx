
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { generateText, generateImageForTopic } from '../services/geminiService';
import { 
    WrenchScrewdriverIcon, SparklesIcon, PlayIcon, 
    ArrowPathIcon, SpeakerWaveIcon, StopCircleIcon, 
    BoltIcon, FireIcon, BeakerIcon, MicrophoneIcon,
    PaperAirplaneIcon, ChatBubbleIcon, XCircleIcon
} from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import Loader from './Loader';
import { useSpeech } from '../hooks/useSpeech';

interface Experiment {
    id: string;
    title: string;
    subject: 'Physics' | 'Chemistry' | 'Biology';
    variables: { name: string; min: number; max: number; unit: string; current: number }[];
    description: string;
}

const experiments: Experiment[] = [
    { id: 'ex-1', title: 'Chemical Reaction: Acid + Base', subject: 'Chemistry', variables: [{ name: 'pH Level', min: 1, max: 14, unit: 'pH', current: 7 }, { name: 'Concentration', min: 0, max: 100, unit: '%', current: 10 }], description: 'Observe how neutralization happens when you mix acids and bases.' },
    { id: 'ex-2', title: 'Photosynthesis Rate', subject: 'Biology', variables: [{ name: 'Light Intensity', min: 0, max: 1000, unit: 'lux', current: 500 }, { name: 'CO2 Level', min: 0, max: 100, unit: 'ppm', current: 30 }], description: 'Adjust light and CO2 to see how fast a plant produces oxygen.' },
    { id: 'ex-3', title: 'Electric Circuit: Ohm\'s Law', subject: 'Physics', variables: [{ name: 'Voltage', min: 0, max: 24, unit: 'V', current: 5 }, { name: 'Resistance', min: 1, max: 100, unit: 'Ω', current: 10 }], description: 'See how current changes when you vary voltage and resistance.' }
];

const AiVirtualLab: React.FC = () => {
    const toast = useToast();
    const [selectedEx, setSelectedEx] = useState<Experiment | null>(null);
    const [loading, setLoading] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [aiExplanation, setAiExplanation] = useState('');
    
    // Virtual Desk State
    const [isDeskOpen, setIsDeskOpen] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([]);
    const [deskInput, setDeskInput] = useState('');
    const [deskLoading, setDeskLoading] = useState(false);

    const { playAudio, stopAudio, isSpeaking, isListening, speechInput, setSpeechInput, toggleListening } = useSpeech({ initialLanguage: 'Hindi' });

    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatInstance = ai.chats.create({ 
            model: 'gemini-3-flash-preview', 
            config: { systemInstruction: "आप वर्चुअल लैब के साइंटिस्ट हैं। छात्र के विज्ञान प्रयोगों में मदद करें। आसान हिंदी में जवाब दें।" } 
        });
        setChat(chatInstance);
    }, []);

    useEffect(() => {
        if (speechInput && !isListening && isDeskOpen) {
            handleDeskQuery(speechInput);
            setSpeechInput('');
        }
    }, [speechInput, isListening, isDeskOpen]);

    const handleDeskQuery = async (textOverride?: string) => {
        const text = textOverride || deskInput;
        if (!text.trim() || !chat) return;
        setDeskInput('');
        setMessages(prev => [...prev, { sender: 'user', text }]);
        setDeskLoading(true);
        try {
            const response = await chat.sendMessage({ message: text });
            const aiText = response.text || "बेटा, समझ नहीं आया।";
            setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
            playAudio(aiText, messages.length + 1);
        } catch (e) {
            toast.error("AI सर्वर व्यस्त है।");
        } finally {
            setDeskLoading(false);
        }
    };

    const handleVariableChange = (varName: string, value: number) => {
        if (!selectedEx) return;
        const updatedVars = selectedEx.variables.map(v => v.name === varName ? { ...v, current: value } : v);
        setSelectedEx({ ...selectedEx, variables: updatedVars });
    };

    const runExperiment = async () => {
        if (!selectedEx) return;
        setLoading(true);
        setResultImage(null);
        setAiExplanation('');
        stopAudio();
        const varsContext = selectedEx.variables.map(v => `${v.name}: ${v.current}${v.unit}`).join(', ');
        try {
            const prompt = `Virtual Lab Scientist. Experiment: ${selectedEx.title}. Variables: ${varsContext}. Explain result in simple Hindi (Hinglish). Format: HTML.`;
            const imagePrompt = `Scientific diagram showing ${selectedEx.title} with ${varsContext}. 3D render, high quality. Labels in English.`;
            const [textRes, imgUrl] = await Promise.all([generateText(prompt, 'gemini-2.5-flash'), generateImageForTopic(imagePrompt)]);
            setAiExplanation(textRes);
            setResultImage(imgUrl);
            playAudio(textRes, 0);
            toast.success("प्रयोग संपन्न हुआ!");
        } catch (e) { toast.error("AI Lab is busy."); }
        finally { setLoading(false); }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-soft h-full flex flex-col min-h-[600px] relative">
            {/* Assistance Button */}
            <button 
                onClick={() => setIsDeskOpen(true)}
                className="fixed bottom-32 right-12 z-40 bg-indigo-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-pulse border-4 border-white"
            >
                {/* Fix: Replaced ChatBubbleLeftEllipsisIcon with ChatBubbleIcon */}
                <ChatBubbleIcon className="h-8 w-8" />
            </button>

            <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><WrenchScrewdriverIcon className="h-8 w-8" /></div>
                    <div><h2 className="text-2xl font-bold text-neutral-900">AI Virtual Lab (स्मार्ट लैब)</h2><p className="text-sm text-neutral-500 font-hindi">प्रयोग करें और उस्ताद से सवाल पूछें।</p></div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
                {/* Left: Controls */}
                <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-3">
                        {experiments.map(ex => (
                            <button key={ex.id} onClick={() => { setSelectedEx(ex); setResultImage(null); setAiExplanation(''); }} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedEx?.id === ex.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:bg-slate-50'}`}>
                                <h4 className="font-bold text-slate-800 text-sm">{ex.title}</h4>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{ex.description}</p>
                            </button>
                        ))}
                    </div>
                    {selectedEx && (
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6 animate-pop-in">
                            {selectedEx.variables.map(v => (
                                <div key={v.name}>
                                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase"><span>{v.name}</span><span className="text-primary">{v.current} {v.unit}</span></div>
                                    <input type="range" min={v.min} max={v.max} value={v.current} onChange={(e) => handleVariableChange(v.name, Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                </div>
                            ))}
                            <button onClick={runExperiment} disabled={loading} className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                                {loading ? <Loader message="..." /> : <><PlayIcon className="h-5 w-5"/> Run Experiment</>}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Results */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden flex flex-col relative shadow-inner">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-white"><Loader message="AI सिमुलेशन चल रहा है..." /></div>
                    ) : resultImage ? (
                        <div className="flex-1 flex flex-col overflow-hidden animate-pop-in">
                            <div className="h-1/2 p-4 flex items-center justify-center bg-black/20"><img src={resultImage} className="max-h-full max-w-full object-contain rounded-xl shadow-2xl" alt="Result" /></div>
                            <div className="flex-1 bg-white p-6 overflow-y-auto custom-scrollbar">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><SparklesIcon className="h-6 w-6 text-primary"/> AI लैब रिपोर्ट</h3>
                                    <button onClick={() => isSpeaking ? stopAudio() : playAudio(aiExplanation, 0)} className={`p-2 rounded-full shadow-md transition-all ${isSpeaking ? 'bg-red-500 text-white' : 'bg-slate-100 text-primary'}`}>{isSpeaking ? <StopCircleIcon className="h-6 w-6"/> : <SpeakerWaveIcon className="h-6 w-6"/>}</button>
                                </div>
                                <div className="prose prose-sm max-w-none text-slate-700 font-hindi leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: aiExplanation }} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-10 text-center"><BeakerIcon className="h-20 w-20 opacity-20 mb-4" /><h3 className="text-lg font-bold text-slate-400 font-hindi">प्रयोग शुरू करें और जादुई विज्ञान देखें।</h3></div>
                    )}
                </div>
            </div>

            {/* AI Lab Desk Drawer */}
            {isDeskOpen && (
                <div className="fixed inset-0 z-[100] bg-slate-900/90 flex items-center justify-center p-4 animate-fade-in backdrop-blur-md">
                    <div className="bg-white w-full max-w-2xl h-[70vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl animate-pop-in">
                         <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3"><SparklesIcon className="h-8 w-8 text-yellow-300" /><h3 className="font-black text-xl uppercase">AI लैब उस्ताद डेस्क</h3></div>
                            <button onClick={() => {setIsDeskOpen(false); stopAudio();}} className="p-2 hover:bg-white/10 rounded-full"><XCircleIcon className="h-8 w-8"/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50 custom-scrollbar">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-3xl text-lg font-hindi leading-relaxed shadow-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 rounded-tl-none text-slate-700'}`}>
                                        {m.text}
                                        {m.sender === 'ai' && <button onClick={() => playAudio(m.text, i)} className="ml-2 inline-block"><SpeakerWaveIcon className="h-4 w-4 text-indigo-500"/></button>}
                                    </div>
                                </div>
                            ))}
                            {deskLoading && <Loader message="उस्ताद जी गणना कर रहे हैं..." />}
                        </div>
                        <div className="p-4 bg-white border-t flex gap-3 items-center">
                             <button onClick={toggleListening} className={`p-4 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-bounce' : 'bg-slate-100 text-slate-400'}`}><MicrophoneIcon className="h-6 w-6"/></button>
                             <input value={deskInput} onChange={e => setDeskInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleDeskQuery()} placeholder="अपना विज्ञान का सवाल पूछें..." className="flex-1 p-4 bg-slate-100 rounded-full font-hindi text-sm border-none focus:ring-2 focus:ring-indigo-600 outline-none" />
                             <button onClick={() => handleDeskQuery()} className="p-4 bg-indigo-600 text-white rounded-full shadow-lg"><PaperAirplaneIcon className="h-6 w-6"/></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiVirtualLab;
