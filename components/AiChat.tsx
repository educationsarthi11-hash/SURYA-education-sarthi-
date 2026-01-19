
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, User } from '../types';
import { 
    SparklesIcon, PaperAirplaneIcon, SpeakerWaveIcon, 
    MicrophoneIcon, StopCircleIcon, XIcon, BoltIcon
} from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../contexts/LanguageContext';

const AiChat: React.FC<{ user?: User; setActiveService?: (service: any) => void }> = ({ user, setActiveService }) => {
  const toast = useToast();
  const { selectedLanguage } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playAudio, stopAudio, isListening, toggleListening, playingMessageIndex } = useSpeech({ 
      initialVoice: 'Kore', initialLanguage: 'Hindi', enableSpeechRecognition: true 
  });

  const systemInstruction = useMemo(() => `
    आप 'AI सार्थी' हैं। आपकी विशेषता यह है कि आप उसी भाषा में बात करते हैं जो यूजर ने चुनी है।
    
    वर्तमान चुनी हुई भाषा: **${selectedLanguage.nativeName}**।
    
    सख्त निर्देश:
    1. भाषा (Dialect): पूरी तरह से **${selectedLanguage.nativeName}** का ही प्रयोग करें। 
    2. अगर भाषा हरियाणवी है, तो "ठेठ हरियाणवी" में ही बात करें। जैसे: "कै हाल सै", "पढ़ाई-लिखाई", "बाळका", "थारा"।
    3. अगर यूजर माता-पिता (Parents) हैं, तो उन्हें बहुत सम्मान से "जी" लगाकर संबोधित करें। उन्हें शिक्षा की बातें ऐसे समझाएं जैसे गांव का कोई समझदार व्यक्ति समझाता है।
    4. कठिन शब्दों से बचें: 'Syllabus' को 'कोर्स' या 'पढ़ाई', 'Result' को 'नतीजा' या 'नंबर' कहें।
    5. बातचीत का लहजा: अपनेपन से भरा, देसी और उत्साहवर्धक रखें।
  `, [selectedLanguage]);

  useEffect(() => {
    if (messages.length === 0) {
        const welcomeText = selectedLanguage.code === 'hr' 
            ? "राम-राम जी! मैं थारा AI सार्थी हूँ। बताइये, आज बालकां की पढ़ाई में के मदद करूँ?" 
            : "नमस्ते! मैं आपका AI सार्थी हूँ। बताइये, आज पढ़ाई में आपकी क्या मदद करूँ?";
        setMessages([{ sender: 'ai', text: welcomeText }]);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = (textOverride || input).trim();
    if (!textToSend || isStreaming) return;
    
    setInput('');
    stopAudio();
    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setIsStreaming(true);
    setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const result = await ai.models.generateContentStream({
            model: 'gemini-3-flash-preview',
            contents: textToSend,
            config: { 
                systemInstruction,
                thinkingConfig: { thinkingBudget: 0 }
            }
        });

        let fullResponse = "";
        for await (const chunk of result) {
            fullResponse += (chunk as GenerateContentResponse).text || "";
            setMessages(prev => {
                const newMsgs = [...prev];
                const last = newMsgs[newMsgs.length - 1];
                if (last && last.sender === 'ai') last.text = fullResponse;
                return newMsgs;
            });
        }
    } catch (error) { 
        toast.error("AI सेवा व्यस्त है।"); 
        setMessages(prev => prev.slice(0, -1));
    }
    finally { setIsStreaming(false); }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative font-sans">
        <div className="p-4 bg-primary text-white flex justify-between items-center sticky top-0 z-20 shadow-xl border-b border-white/10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20"><SparklesIcon className="h-6 w-6 text-yellow-300" /></div>
                <div>
                    <h3 className="font-black text-base leading-none">AI सार्थी (देसी गाइड)</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black bg-green-500 px-2 py-0.5 rounded text-white animate-pulse">NATIVE MODE: {selectedLanguage.nativeName}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-white/50">
            {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-pop-in`}>
                    <div className={`relative max-w-[85%] p-4 rounded-3xl shadow-xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                        <div className="prose prose-sm max-w-none font-hindi leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: msg.text || '...' }} />
                        {msg.sender === 'ai' && msg.text && (
                             <div className="mt-3 flex gap-2">
                                <button 
                                    onClick={() => playAudio(msg.text, i)} 
                                    className={`flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-lg border ${playingMessageIndex === i ? 'bg-red-500 text-white border-red-500' : 'bg-slate-50 text-primary'}`}
                                >
                                    {playingMessageIndex === i ? <StopCircleIcon className="h-3 w-3"/> : <SpeakerWaveIcon className="h-3 w-3"/>}
                                    अपनी भाषा में सुनें
                                </button>
                             </div>
                        )}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-end gap-3 z-20">
            <div className="flex-1 bg-slate-50 rounded-[2rem] flex items-center px-2 py-1 shadow-inner border border-slate-200">
                <button onClick={toggleListening} className={`p-3 rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400'}`}><MicrophoneIcon className="h-6 w-6" /></button>
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyPress={e => e.key === 'Enter' && handleSend()} 
                    placeholder={`${selectedLanguage.nativeName} में पूछें...`} 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold font-hindi p-3" 
                    disabled={isStreaming}
                />
            </div>
            <button onClick={() => handleSend()} disabled={isStreaming || !input.trim()} className="p-4 bg-primary text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all">
                <PaperAirplaneIcon className="h-6 w-6"/>
            </button>
        </div>
    </div>
  );
};

export default AiChat;
