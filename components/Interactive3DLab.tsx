import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage, User } from '../types';
import { generateImageForTopic, generateText } from '../services/geminiService';
import { useToast } from '../hooks/useToast';
import Loader from './Loader';
import { CubeIcon, SparklesIcon, PaperAirplaneIcon, UserCircleIcon, VideoCameraIcon, XIcon } from './icons/AllIcons';

const predefinedModels = [
    { id: 'heart', name: 'Human Heart', prompt: 'A detailed, photorealistic 3D model render of a human heart with labels for major parts like aorta, ventricles, and atriums, on a clean white background, educational diagram style.' },
    { id: 'solar', name: 'Solar System', prompt: 'A visually stunning 3D model render of the Solar System showing the sun and all planets in their orbits, with a dark space background, educational poster style.' },
    { id: 'volcano', name: 'Volcano Eruption', prompt: 'A cross-section 3D model render of an erupting volcano, showing the magma chamber, conduit, and lava flow, with clear labels, educational diagram style.' },
    { id: 'heart-dna', name: 'DNA Structure', prompt: 'A beautiful and clear 3D model render of a DNA double helix, with color-coded base pairs, on a clean light background, scientific illustration style.' }
];

interface Interactive3DLabProps {
    user: User;
}

const Interactive3DLab: React.FC<Interactive3DLabProps> = ({ user }) => {
    const toast = useToast();
    const [selectedModel, setSelectedModel] = useState<{ id: string; name: string; prompt: string } | null>(null);
    const [modelImageUrl, setModelImageUrl] = useState<string | null>(null);
    const [loadingModel, setLoadingModel] = useState(false);
    
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loadingChat, setLoadingChat] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [language, setLanguage] = useState('English');
    const [isVrMode, setIsVrMode] = useState(false);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);

    const handleModelSelect = async (model: { id: string; name: string; prompt: string }) => {
        setSelectedModel(model);
        setLoadingModel(true);
        setModelImageUrl(null);
        setMessages([]);
        setChat(null);

        try {
            const [imageUrl, initialText] = await Promise.all([
                generateImageForTopic(`${model.prompt} All labels MUST be in ${language}.`),
                /* Updated to use gemini-3-pro-preview for detailed scientific introduction */
                generateText(`As an expert science teacher, provide a clear and engaging introduction to the topic of the "${model.name}" for a student. Explain its main function and key components. Format as clean HTML. The explanation must be in ${language}.`, 'gemini-3-pro-preview')
            ]);
            
            setModelImageUrl(imageUrl);

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            /* Updated to use gemini-3-pro-preview for specialized lab guidance */
            const chatInstance = ai.chats.create({
                model: 'gemini-3-pro-preview',
                config: {
                    systemInstruction: `You are an expert science communicator acting as a guide for an interactive 3D lab. The student is currently viewing a model of a "${model.name}". Your role is to answer their questions about this specific model and its related concepts. Be clear, concise, and encouraging. Your responses MUST be in ${language}.`,
                },
            });
            setChat(chatInstance);
            setMessages([{ sender: 'ai', text: initialText }]);

        } catch (error) {
            console.error("Failed to load 3D model resources:", error);
            toast.error("Could not load the 3D lab model. Please try again.");
            setSelectedModel(null);
        } finally {
            setLoadingModel(false);
        }
    };

     const handleSend = async () => {
        if (!input.trim() || !chat || loadingChat) return;
        
        const textToSend = input;
        setInput('');
        const userMessage: ChatMessage = { sender: 'user', text: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setLoadingChat(true);

        try {
            const response = await chat.sendMessage({ message: textToSend });
            const aiMessage: ChatMessage = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to get a response from the AI guide.");
        } finally {
            setLoadingChat(false);
        }
    };

    return (
        <div className={`bg-white p-6 rounded-xl shadow-soft flex flex-col ${isVrMode ? 'fixed inset-0 z-50 p-0 rounded-none' : 'min-h-[80vh] min-h-[600px]'}`}>
            {!isVrMode && (
                <div className="flex items-center mb-4 border-b pb-4">
                    <CubeIcon className="h-8 w-8 text-primary"/>
                    <div className="ml-3">
                        <h2 className="text-2xl font-bold text-neutral-900">Interactive 3D Lab</h2>
                        <p className="text-sm text-neutral-500 font-hindi">AI-संचालित 3D मॉडल (Metaverse Ready)</p>
                    </div>
                </div>
            )}

            <div className={`flex-1 grid ${isVrMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12 gap-6'} overflow-hidden relative`}>
                {/* Model Selection (Hidden in VR) */}
                {!isVrMode && (
                    <div className="lg:col-span-3 h-full overflow-y-auto pr-2">
                        <h3 className="text-lg font-bold text-neutral-800 mb-3">Select a Model</h3>
                        <div className="space-y-2">
                            {predefinedModels.map(model => (
                                <button
                                    key={model.id}
                                    onClick={() => handleModelSelect(model)}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${selectedModel?.id === model.id ? 'bg-primary/10 border-primary font-semibold' : 'bg-neutral-100 border-transparent hover:bg-neutral-200'}`}
                                >
                                    {model.name}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="lang-select-3d" className="block text-sm font-medium text-neutral-700">Label Language</label>
                            <select id="lang-select-3d" value={language} onChange={e => setLanguage(e.target.value)} className="w-full mt-1 p-2 border rounded-md">
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* 3D Viewer */}
                <div className={`${isVrMode ? 'w-full h-full' : 'lg:col-span-5'} bg-neutral-900 rounded-lg flex items-center justify-center p-4 relative overflow-hidden`}>
                    {isVrMode && (
                        <button 
                            onClick={() => setIsVrMode(false)}
                            className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/80"
                        >
                            <XIcon className="h-8 w-8" />
                        </button>
                    )}
                    
                    {loadingModel && <Loader message="Building 3D Metaverse Model..." />}
                    
                    {!loadingModel && modelImageUrl && (
                        <div className={`relative w-full h-full flex items-center justify-center ${isVrMode ? 'flex-row gap-4' : ''}`}>
                             {/* Standard View */}
                            <img src={modelImageUrl} alt={`3D model of ${selectedModel?.name}`} className={`object-contain animate-pop-in ${isVrMode ? 'w-1/2 h-full' : 'max-w-full max-h-full'}`} />
                            
                            {/* Stereoscopic View for VR Mode */}
                            {isVrMode && (
                                <img src={modelImageUrl} alt={`3D model of ${selectedModel?.name} Right Eye`} className="w-1/2 h-full object-contain animate-pop-in border-l-2 border-black" />
                            )}
                            
                            {!isVrMode && (
                                <button 
                                    onClick={() => setIsVrMode(true)}
                                    className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors text-sm font-bold"
                                >
                                    <VideoCameraIcon className="h-4 w-4" /> Enter VR Mode
                                </button>
                            )}
                        </div>
                    )}
                    {!loadingModel && !modelImageUrl && selectedModel && (
                         <div className="text-center text-neutral-400">
                            <CubeIcon className="h-16 w-16 mx-auto mb-4"/>
                            <p>Visual model unavailable.</p>
                        </div>
                    )}
                    {!loadingModel && !selectedModel && (
                        <div className="text-center text-neutral-500">
                            <CubeIcon className="h-16 w-16 mx-auto mb-4"/>
                            <p>Select a model to begin.</p>
                        </div>
                    )}
                </div>
                
                {/* AI Guide Chat (Hidden in VR for now) */}
                {!isVrMode && (
                    <div className="lg:col-span-4 flex flex-col bg-neutral-50 rounded-lg border">
                        <h3 className="text-lg font-bold text-neutral-800 p-4 border-b shrink-0">AI Lab Guide</h3>
                        <div ref={messagesEndRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                    {msg.sender === 'ai' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white"><SparklesIcon className="h-5 w-5"/></div>}
                                    <div className={`w-fit max-w-xs rounded-xl px-3 py-2 shadow-sm text-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white'}`}>
                                        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    </div>
                                    {msg.sender === 'user' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500"><UserCircleIcon className="h-5 w-5"/></div>}
                                </div>
                            ))}
                             {loadingChat && (
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white"><SparklesIcon className="h-5 w-5"/></div>
                                    <div className="w-fit max-w-xs rounded-xl px-3 py-2 shadow-sm bg-white"><Loader message="Thinking..." /></div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t shrink-0">
                             <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={selectedModel ? `Ask about the ${selectedModel.name}...` : 'Select a model first'}
                                    className="flex-1 p-2 border border-neutral-300 bg-white rounded-full text-sm focus:ring-2 focus:ring-primary"
                                    disabled={!chat || loadingChat || !selectedModel}
                                />
                                <button onClick={handleSend} disabled={!chat || loadingChat || !input.trim()} className="p-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark disabled:bg-neutral-400">
                                    <PaperAirplaneIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Interactive3DLab;