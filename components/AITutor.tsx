
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI, Chat, Part } from "@google/genai";
import { ChatMessage } from '../types';
import { fileToBase64 } from '../services/geminiService';
import { useToast } from '../hooks/useToast';
import { SparklesIcon, UploadIcon, XCircleIcon, PaperAirplaneIcon, ArrowLeftIcon, BookOpenIcon, CalculatorIcon, SpeakerWaveIcon, StopCircleIcon, CameraIcon, MicrophoneIcon } from './icons/AllIcons';
import Loader from './Loader';
import { useClassroom } from '../contexts/ClassroomContext';
import { useSpeech } from '../hooks/useSpeech';
import UnifiedScanner from './UnifiedScanner';
import { allLevels, getSubjectsForClass } from '../config/classroomData';

type Mode = 'upload' | 'chat';
type TutorType = 'explainer' | 'solver';

const AITutor: React.FC = () => {
    const toast = useToast();
    const { selectedClass: contextClass, setSelectedClass } = useClassroom();

    const [tutorType, setTutorType] = useState<TutorType>('explainer');
    const [localClass, setLocalClass] = useState(contextClass || 'Class 10');
    const [localSubject, setLocalSubject] = useState('General Knowledge');
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);
    const [mode, setMode] = useState<Mode>('upload');
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const { playAudio, stopAudio, playingMessageIndex, isListening, speechInput, setSpeechInput, toggleListening } = useSpeech({ 
        enableSpeechRecognition: true,
        initialLanguage: 'Hindi'
    });

    const dynamicSubjects = useMemo(() => getSubjectsForClass(localClass), [localClass]);

    // Ensure localSubject exists in new dynamic list
    useEffect(() => {
        // Fix: Use dynamicSubjects instead of dynamic_subjects to match declaration on line 46
        if (!dynamicSubjects.some(s => s.name === localSubject)) {
            setLocalSubject(dynamicSubjects[0]?.name || 'General Knowledge');
        }
    }, [dynamicSubjects, localSubject]);

    useEffect(() => {
        if (speechInput && !isListening) {
            setInput(speechInput);
            handleSend(speechInput);
            setSpeechInput('');
        }
    }, [speechInput, isListening]);

    const handleFileChange = (selectedFiles: FileList | null) => {
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            setFiles(prev => [...prev, ...newFiles]);
            const newUrls = newFiles.map(file => URL.createObjectURL(file));
            setFilePreviewUrls(prev => [...prev, ...newUrls]);
        }
    };

    const handleStartSession = async () => {
        if (files.length === 0 && tutorType === 'solver') {
            toast.error("कृपया फोटो या डॉक्यूमेंट अपलोड करें।");
            return;
        }

        setLoading(true);
        setSelectedClass(localClass); 
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const instruction = `You are an expert AI Tutor for ${localClass}, Subject: ${localSubject}. 
            Explain concepts in a way a student of this level can understand.
            Language: Hindi (Devanagari) or Hinglish.
            Be supportive and use encouraging words like 'Beta' or 'Laadle'.
            Format your response in clean HTML for the web.`;
            
            const chatInstance = ai.chats.create({
                model: 'gemini-3-pro-preview',
                config: { systemInstruction: instruction },
            });
            setChat(chatInstance);

            const fileParts: Part[] = await Promise.all(
                files.map(async (file) => {
                    const base64Data = await fileToBase64(file);
                    return { inlineData: { data: base64Data, mimeType: file.type } };
                })
            );
            
            const initialPrompt: Part = { text: files.length > 0 ? "Analyze this content and explain it." : "नमस्ते! चलिए सीखना शुरू करते हैं।" };
            const response = await chatInstance.sendMessage({ message: [initialPrompt, ...fileParts] });

            setMessages([{ sender: 'ai', text: response.text }]);
            setMode('chat');
        } catch (error) {
            toast.error("AI विश्लेषण विफल रहा।");
        } finally {
            setLoading(false);
        }
    };

    const handleSend = useCallback(async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim() || !chat || loading) return;
        setInput('');
        setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
        setLoading(true);
        try {
            const response = await chat.sendMessage({ message: textToSend });
            setMessages(prev => [...prev, { sender: 'ai', text: response.text }]);
        } catch (error) {
            toast.error("Failed to get response.");
        } finally {
            setLoading(false);
        }
    }, [chat, input, loading]);

    return (
        <div className="bg-white rounded-[3.5rem] shadow-2xl h-full flex flex-col overflow-hidden border border-slate-100">
            {mode === 'upload' ? (
                <div className="max-w-4xl mx-auto w-full p-8 sm:p-12 animate-pop-in overflow-y-auto custom-scrollbar">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <SparklesIcon className="h-4 w-4"/> AI Personal Tutor
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">AI सार्थी ट्यूटर</h2>
                        <p className="text-slate-400 font-hindi mt-4 text-lg">अपनी क्लास और विषय चुनें और जादुई तरीके से सीखना शुरू करें।</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">1. कक्षा चुनें (Class)</label>
                            <select 
                                value={localClass} 
                                onChange={e => setLocalClass(e.target.value)}
                                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold focus:border-primary outline-none appearance-none"
                            >
                                {allLevels.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">2. विषय (Subject)</label>
                            <select 
                                value={localSubject} 
                                onChange={e => setLocalSubject(e.target.value)}
                                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold focus:border-primary outline-none appearance-none"
                            >
                                {dynamicSubjects.map(s => <option key={s.name} value={s.name}>{s.hindi}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-10">
                        <button onClick={() => setTutorType('explainer')} className={`flex-1 p-8 rounded-[2.5rem] border-4 transition-all flex flex-col items-center gap-4 ${tutorType === 'explainer' ? 'border-primary bg-primary/5' : 'border-slate-50 bg-slate-50 opacity-60'}`}>
                            <BookOpenIcon className={`h-10 w-10 ${tutorType === 'explainer' ? 'text-primary' : 'text-slate-400'}`}/>
                            <span className="font-black text-xs uppercase tracking-widest">Topic Explainer</span>
                        </button>
                        <button onClick={() => setTutorType('solver')} className={`flex-1 p-8 rounded-[2.5rem] border-4 transition-all flex flex-col items-center gap-4 ${tutorType === 'solver' ? 'border-primary bg-primary/5' : 'border-slate-50 bg-slate-50 opacity-60'}`}>
                            <CalculatorIcon className={`h-10 w-10 ${tutorType === 'solver' ? 'text-primary' : 'text-slate-400'}`}/>
                            <span className="font-black text-xs uppercase tracking-widest">Doubt Solver</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        <button onClick={() => setIsScannerOpen(true)} className="p-10 border-4 border-dashed border-primary/20 bg-primary/5 rounded-[3rem] flex flex-col items-center gap-4 hover:bg-primary/10 hover:border-primary transition-all group">
                            <CameraIcon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform"/>
                            <span className="font-black text-primary uppercase text-sm tracking-widest">AI Smart Scan</span>
                        </button>
                        <button onClick={() => fileInputRef.current?.click()} className="p-10 border-4 border-slate-100 bg-slate-50 rounded-[3rem] flex flex-col items-center gap-4 hover:bg-slate-100 transition-all group">
                            <UploadIcon className="h-12 w-12 text-slate-300 group-hover:scale-110 transition-transform"/>
                            <span className="font-black text-slate-400 uppercase text-sm tracking-widest">Upload File</span>
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" multiple={tutorType==='explainer'} onChange={e => handleFileChange(e.target.files)}/>
                    </div>

                    <button 
                        onClick={handleStartSession}
                        disabled={loading}
                        className="w-full py-6 bg-slate-950 text-white font-black rounded-[2rem] shadow-2xl hover:bg-primary transition-all disabled:opacity-50 transform active:scale-95 text-xl tracking-tight"
                    >
                        {loading ? <Loader message="AI गुरु जी आ रहे हैं..." /> : 'सबक शुरू करें (Start Learning)'}
                    </button>

                    <UnifiedScanner 
                        isOpen={isScannerOpen} 
                        onClose={() => setIsScannerOpen(false)} 
                        onScanComplete={(d, f) => { setFiles([f]); setFilePreviewUrls([URL.createObjectURL(f)]); }} 
                    />
                </div>
            ) : (
                <div className="flex flex-col h-full bg-slate-50">
                    <div className="p-5 bg-white border-b flex justify-between items-center px-10 shadow-sm relative z-20">
                        <button onClick={() => setMode('upload')} className="text-[10px] font-black text-primary flex items-center gap-2 bg-primary/5 px-6 py-2.5 rounded-full hover:bg-primary/10 transition-all uppercase tracking-widest">
                            <ArrowLeftIcon className="h-4 w-4"/> वापस बदलें
                        </button>
                        <div className="text-center">
                            <h3 className="font-black text-slate-900 uppercase tracking-tighter text-xl">{localSubject} Master</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">{localClass}</p>
                        </div>
                        <div className="w-24"></div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 custom-scrollbar relative">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                                <div className={`max-w-[85%] p-6 rounded-[2.5rem] shadow-xl relative ${m.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-slate-100 rounded-tl-none'}`}>
                                     <div className={`absolute top-0 w-0 h-0 border-[10px] border-transparent ${m.sender === 'user' ? 'right-[-10px] border-t-primary border-l-primary' : 'left-[-10px] border-t-white border-r-white'}`}></div>
                                    <div className={`prose prose-sm font-hindi leading-relaxed ${m.sender === 'user' ? 'text-white' : 'text-slate-700'}`} dangerouslySetInnerHTML={{ __html: m.text }} />
                                    {m.sender === 'ai' && (
                                        <button onClick={() => playAudio(m.text, i)} className="mt-6 text-[10px] font-black uppercase text-primary bg-primary/5 px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-primary/10 transition-all shadow-sm">
                                            {playingMessageIndex === i ? <StopCircleIcon className="h-4 w-4 animate-pulse"/> : <SpeakerWaveIcon className="h-4 w-4"/>} Listen
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="flex justify-start"><div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100"><Loader message="विचार कर रहा हूँ..." /></div></div>}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="p-6 bg-white border-t flex gap-4 px-10 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                        <div className="flex-1 flex items-center bg-slate-50 rounded-[2rem] border-2 border-slate-100 focus-within:border-primary focus-within:bg-white transition-all overflow-hidden shadow-inner pr-2">
                             <button onClick={toggleListening} className={`p-4 transition-all ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-primary'}`}><MicrophoneIcon className="h-7 w-7"/></button>
                             <input 
                                value={input} 
                                onChange={e => setInput(e.target.value)} 
                                onKeyPress={e => e.key === 'Enter' && handleSend()} 
                                placeholder="अपना सवाल यहाँ पूछें..." 
                                className="flex-1 p-4 bg-transparent border-none focus:ring-0 font-bold font-hindi text-lg"
                             />
                        </div>
                        <button onClick={() => handleSend()} className="p-5 bg-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-primary/30">
                            <PaperAirplaneIcon className="h-8 w-8"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AITutor;
