

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage, User } from '../types';
import Loader from './Loader';
import { ShieldCheckIcon, SparklesIcon, UserCircleIcon, PaperAirplaneIcon, ExclamationTriangleIcon } from './icons/AllIcons';

interface KnowYourRightsProps {
    user: User;
}

const KnowYourRights: React.FC<KnowYourRightsProps> = ({ user }) => {
    // Fix: Chat type is now correctly imported and used
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const systemInstruction = useMemo(() => `You are 'Adhikar Sarathi,' a friendly, knowledgeable, and patient guide for children and young students in India. Your purpose is to explain fundamental and legal rights in a simple, age-appropriate, and easy-to-understand manner. Your responses MUST be in simple Hindi.

        **Core Directives:**
        1.  **Child-Friendly Language:** You MUST simplify complex legal terms. Use stories, analogies, and real-life examples that a child can relate to (e.g., comparing the Right to Equality to sharing snacks fairly).
        2.  **Context:** The user is a student in India. Your explanations should be based on the Constitution of India and relevant Indian laws (like the Right to Education Act, POCSO Act, etc.).
        3.  **CRITICAL SAFETY PROTOCOL:** If a user mentions topics related to abuse (शारीरिक या मानसिक शोषण), danger (खतरा), violence (हिंसा), or feeling unsafe (असुरक्षित महसूस करना), you MUST immediately stop the regular explanation and provide the Childline India helpline number (1098) and advise them to talk to a trusted adult (parent, teacher, or police). Your response in such a case should be exactly this, in Hindi: "यह सुनना बहुत चिंताजनक है। कृपया याद रखें कि मदद उपलब्ध है। आप 1098 पर चाइल्डलाइन को कॉल करके किसी से बात कर सकते हैं जो आपकी मदद कर सकता है। कृपया किसी भरोसेमंद वयस्क, जैसे माता-पिता, शिक्षक, या पुलिस को भी इस बारे में बताएं।"
        4.  **Disclaimer:** Always include a simple disclaimer at the end of your general responses: "याद रखें, मैं एक AI गाइड हूँ। गंभीर मामलों के लिए हमेशा किसी बड़े या विशेषज्ञ से बात करें।"
        5.  **Format:** Use clean HTML with paragraphs (<p>), lists (<ul><li>...</li></ul>), and bold text (<strong>) to make your answers easy to read. Do not use <html> or <body> tags.`, []);

    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        // Fix: Updated model to gemini-3-pro-preview for handling complex text reasoning tasks
        const chatInstance = ai.chats.create({
            model: 'gemini-3-pro-preview',
            config: { systemInstruction },
        });
        setChat(chatInstance);
        setMessages([{
            sender: 'ai',
            text: "नमस्ते! मैं आपका 'अधिकार सारथी' हूँ। मैं यहाँ आपको आपके अधिकारों के बारे में बताने के लिए हूँ। आप मुझसे कुछ भी पूछ सकते हैं, या नीचे दिए गए विषयों में से चुन सकते हैं।"
        }]);
    }, [systemInstruction]);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);
    
    const handleSend = async (predefinedQuery?: string) => {
        const textToSend = predefinedQuery || input;
        if (!textToSend.trim() || !chat) return;
        
        setInput('');
        const userMessage: ChatMessage = { sender: 'user', text: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await chat.sendMessage({ message: textToSend });
            const aiMessage: ChatMessage = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: "मुझे क्षमा करें, अभी मैं कनेक्ट नहीं कर पा रहा हूँ। कृपया थोड़ी देर बाद प्रयास करें।" }]);
        } finally {
            setLoading(false);
        }
    };
    
    const quickTopics = [
        "शिक्षा का अधिकार क्या है?",
        "अगर कोई मुझे स्कूल में परेशान करे तो क्या करूँ?",
        "समानता का अधिकार क्या होता है?",
        "चाइल्ड लेबर (बाल श्रम) क्या है?",
    ];

    return (
        <div className="bg-white rounded-xl shadow-soft flex flex-col min-h-[75vh] max-h-[800px]">
            <div className="p-4 border-b bg-neutral-50 rounded-t-xl flex items-center">
                <ShieldCheckIcon className="h-8 w-8 text-primary" />
                <div className="ml-3">
                    <h2 className="text-2xl font-bold text-neutral-900">अपने अधिकार जानें</h2>
                    <p className="text-sm text-neutral-500 font-hindi">आपका व्यक्तिगत अधिकार सारथी</p>
                </div>
            </div>

            <div className="p-3 bg-red-50 border-b border-red-200 text-xs text-red-800 flex items-start gap-2">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                    <strong>महत्वपूर्ण:</strong> यदि आप किसी खतरे में हैं, तो तुरंत <strong>1098</strong> पर कॉल करें या किसी भरोसेमंद वयस्क से बात करें।
                </span>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
                <div className="md:col-span-1 p-4 border-r border-neutral-200 overflow-y-auto bg-neutral-50/50">
                     <h3 className="font-bold text-neutral-800 mb-3">त्वरित विषय (Quick Topics)</h3>
                     <div className="space-y-2">
                        {quickTopics.map(topic => (
                            <button
                                key={topic}
                                onClick={() => handleSend(topic)}
                                className="w-full text-left p-2.5 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                            >
                                {topic}
                            </button>
                        ))}
                     </div>
                </div>
                <div className="md:col-span-2 flex flex-col h-full">
                    <div ref={messagesEndRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6" role="log" aria-live="polite">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><SparklesIcon className="h-6 w-6"/></div>}
                                <div className={`w-full max-w-lg rounded-xl px-4 py-3 shadow-sm font-hindi ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-neutral-800 rounded-bl-none border border-neutral-200'}`}>
                                    <div className="prose prose-sm max-w-none prose-p:my-1" dangerouslySetInnerHTML={{ __html: msg.text }} />
                                </div>
                                {msg.sender === 'user' && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500"><UserCircleIcon className="h-6 w-6"/></div>}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start items-end gap-3">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><SparklesIcon className="h-6 w-6"/></div>
                                <div className="p-3 rounded-xl bg-white shadow-sm"><Loader message="सोच रहा हूँ..."/></div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t bg-neutral-50/80 backdrop-blur-sm sticky bottom-0 rounded-b-xl">
                        <div className="flex items-center space-x-2">
                            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="अपना सवाल यहाँ पूछें..." className="flex-1 p-2.5 border border-neutral-300 bg-white rounded-full focus:ring-2 focus:ring-primary focus:border-primary transition-shadow font-hindi" disabled={loading} />
                            <button onClick={() => handleSend()} disabled={loading || !input.trim()} className="p-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark disabled:bg-neutral-400 transition-colors"><PaperAirplaneIcon className="h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowYourRights;

