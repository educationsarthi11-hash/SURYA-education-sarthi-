
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { GoogleGenAI, Chat, Part } from "@google/genai";
import { ChatMessage, Transcript, User } from '../types';
import Loader from './Loader';
import { fileToBase64 } from '../services/geminiService';
import { SparklesIcon, PaperClipIcon, XCircleIcon, UserCircleIcon, CameraIcon, PhoneIcon, PaperAirplaneIcon, Cog6ToothIcon, MicrophoneIcon, FaceSmileIcon } from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import LiveClass from './LiveClass';
import { useAppConfig } from '../contexts/AppConfigContext';
import { useSpeech } from '../hooks/useSpeech';

const AiAssistant: React.FC = () => {
  const { institutionName } = useAppConfig();
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toast = useToast();

  const [isLiveClassActive, setIsLiveClassActive] = useState(false);
  const [language, setLanguage] = useState('English');

  const { isListening, speechInput, setSpeechInput, toggleListening } = useSpeech({ enableSpeechRecognition: true, initialLanguage: language });

  const systemInstruction = useMemo(() => `You are an expert AI Staff Assistant for "${institutionName}". Help with professional tasks like drafting emails, lesson plans, and summarizing docs. Responses in ${language}. Format as clean HTML.`, [institutionName, language]);

  const liveVisualAidGenerator = useCallback((text: string) => `Professional diagram for: "${text.substring(0, 200)}". Text in ENGLISH.`, []);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Fixed: Updated to use recommended gemini-3-pro-preview for complex text tasks.
    const chatInstance = ai.chats.create({ model: 'gemini-3-pro-preview', config: { systemInstruction } });
    setChat(chatInstance);
    setMessages([{ sender: 'ai', text: `Hello! I'm your AI Staff Assistant. How can I help you today?` }]);
  }, [systemInstruction]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSend = useCallback(async (textOverride?: string) => {
    const textToSend = (textOverride || input).trim();
    if ((!textToSend && !file) || !chat) return;
    setInput(''); setFile(null); setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    const userMessage: ChatMessage = { sender: 'user', text: textToSend, filePreview: filePreview || undefined, fileType: file?.type };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    try {
      const messageParts: Part[] = [{ text: textToSend }];
      if (file) {
        const base64Data = await fileToBase64(file);
        messageParts.push({ inlineData: { data: base64Data, mimeType: file.type } });
      }
      const response = await chat.sendMessage({ message: messageParts });
      setMessages(prev => [...prev, { sender: 'ai', text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Error processing request." }]);
    } finally { setLoading(false); }
  }, [chat, input, file, filePreview]);
  
  useEffect(() => {
    if (speechInput && !isListening) {
      setInput(speechInput);
      handleSend(speechInput);
      setSpeechInput('');
    }
  }, [speechInput, isListening, handleSend, setSpeechInput]);

  if (isLiveClassActive) {
      return <div className="h-full w-full"><LiveClass systemInstruction={systemInstruction} onEnd={() => setIsLiveClassActive(false)} sessionTitle="Live Assistant Session" visualAidPromptGenerator={liveVisualAidGenerator} /></div>;
  }

  return (
    <div className="flex flex-col h-[80vh] min-h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden relative border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 p-4 flex items-center justify-between text-white z-10 shadow-md">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30"><SparklesIcon className="h-6 w-6 text-white"/></div>
                <div><h3 className="font-bold text-base">AI Staff Assistant</h3><p className="text-xs text-slate-400">Always Online</p></div>
            </div>
            <div className="flex gap-4">
                 <button onClick={() => setIsLiveClassActive(true)} className="hover:bg-white/10 p-2 rounded-full transition-colors" title="Start Live Call"><PhoneIcon className="h-5 w-5"/></button>
            </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 bg-slate-50">
            {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`relative max-w-[80%] p-3 px-4 text-sm shadow-sm rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'}`}>
                        {msg.filePreview && <img src={msg.filePreview} alt="Upload" className="mb-2 rounded-lg max-h-48 w-full object-cover border border-white/20" />}
                        <div className={`prose prose-sm max-w-none ${msg.sender === 'user' ? 'text-white' : 'text-slate-700'}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
                        <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-200">
                        <Loader message="Thinking..."/>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-end gap-2 z-10">
            {filePreview && (
                <div className="absolute bottom-20 left-4 bg-white p-2 rounded-xl shadow-lg border border-slate-200">
                    <img src={filePreview} className="h-20 w-20 object-cover rounded-lg" alt="Preview" />
                    <button onClick={() => { setFile(null); setFilePreview(null); }} className="absolute -top-2 -right-2 bg-red-50 text-white rounded-full p-1 shadow-md hover:bg-red-600"><XCircleIcon className="h-4 w-4"/></button>
                </div>
            )}
            
            <button onClick={() => fileInputRef.current?.click()} className="p-3 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors">
                <PaperClipIcon className="h-6 w-6" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

            <div className="flex-1 bg-slate-100 rounded-3xl flex items-center px-4 py-1 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyPress={e => e.key === 'Enter' && handleSend()} 
                    placeholder="Type a message..." 
                    className="flex-1 p-2 border-none focus:ring-0 bg-transparent text-slate-800 placeholder:text-slate-400 text-sm" 
                    disabled={loading} 
                />
            </div>
            
            <button 
                onClick={input.trim() || file ? () => handleSend() : toggleListening} 
                className={`p-3 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95 ${input.trim() || file ? 'bg-primary text-white hover:bg-orange-600' : isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
            >
                {input.trim() || file ? <PaperAirplaneIcon className="h-5 w-5" /> : <MicrophoneIcon className="h-5 w-5" />}
            </button>
        </div>
    </div>
  );
};

export default AiAssistant;
