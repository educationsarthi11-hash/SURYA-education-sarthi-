
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
    SparklesIcon, WrenchScrewdriverIcon, 
    SpeakerWaveIcon, StopCircleIcon, 
    ArrowPathIcon, PlayIcon, CheckCircleIcon,
    RocketLaunchIcon, BeakerIcon, PaperAirplaneIcon
} from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import Loader from './Loader';
import { useSpeech } from '../hooks/useSpeech';

interface Part {
    id: string;
    name: string;
    hindiName: string;
    functionHindi: string;
    icon: string; // Emoji or Icon name
}

const AIMakerLab: React.FC = () => {
    const toast = useToast();
    const [productName, setProductName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isAssembling, setIsAssembling] = useState(false);
    const [parts, setParts] = useState<Part[]>([]);
    const [assembledParts, setAssembledParts] = useState<string[]>([]);
    const [activePart, setActivePart] = useState<Part | null>(null);
    const [advice, setAdvice] = useState('');
    const [loadingAdvice, setLoadingAdvice] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const { playAudio, stopAudio, isSpeaking } = useSpeech({ initialLanguage: 'Hindi' });

    // AI से पार्ट्स की लिस्ट मांगना
    const generateClass = async () => {
        if (!productName.trim()) {
            toast.error("कृपया किसी चीज़ का नाम लिखें (जैसे: Computer)");
            return;
        }
        setIsGenerating(true);
        setParts([]);
        setAssembledParts([]);
        setIsFinished(false);
        setAdvice('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Act as a Master Engineer Teacher. The student wants to learn how to build a "${productName}". 
            Break down this product into exactly 5 essential physical components/parts.
            Return ONLY a JSON object:
            {
              "product": "${productName}",
              "parts": [
                { "id": "p1", "name": "Part Name English", "hindiName": "Part Name Hindi", "functionHindi": "Explanation of function in 1 simple Hindi sentence starting with 'BETA...'", "icon": "Emoji relating to part" }
              ]
            }`;

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });

            const data = JSON.parse(response.text || '{}');
            setParts(data.parts || []);
            setIsAssembling(true);
            toast.success(`${productName} की क्लास तैयार है!`);
        } catch (e) {
            toast.error("AI उस्ताद अभी क्लास नहीं ले पा रहे।");
        } finally {
            setIsGenerating(false);
        }
    };

    // किसी पार्ट को फिट करना
    const handleFitPart = (part: Part) => {
        if (assembledParts.includes(part.id)) return;

        setAssembledParts(prev => [...prev, part.id]);
        setActivePart(part);
        setAdvice(part.functionHindi);
        playAudio(part.functionHindi, 0);

        if (assembledParts.length + 1 === parts.length) {
            setTimeout(() => {
                setIsFinished(true);
                const finalMsg = `बधाई हो बेटा! आपने सफलतापूर्वक ${productName} बना लिया है। अब आप इसके मास्टर बन गए हैं!`;
                setAdvice(finalMsg);
                playAudio(finalMsg, 1);
            }, 2000);
        }
    };

    const reset = () => {
        setProductName('');
        setIsAssembling(false);
        setParts([]);
        setAssembledParts([]);
        setIsFinished(false);
        stopAudio();
    };

    return (
        <div className="bg-slate-950 p-6 rounded-[3rem] shadow-2xl h-full flex flex-col min-h-[750px] border-8 border-slate-900 text-white font-sans overflow-hidden relative">
            {/* BG Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="bg-orange-600 p-4 rounded-3xl shadow-[0_0_30px_rgba(234,88,12,0.3)]">
                        <WrenchScrewdriverIcon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tight leading-none">AI निर्माण शाला</h2>
                        <p className="text-[10px] text-orange-400 font-hindi mt-1 font-bold uppercase tracking-[0.2em]">Build Anything, Learn Everything</p>
                    </div>
                </div>
                {isAssembling && (
                    <button onClick={reset} className="p-4 bg-white/5 rounded-full hover:bg-white/10 border border-white/5 shadow-lg"><ArrowPathIcon className="h-6 w-6 text-orange-300"/></button>
                )}
            </div>

            <div className="flex-1 flex flex-col z-10 overflow-hidden">
                {!isAssembling ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8 animate-pop-in">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white leading-tight">बेटा, आज आप क्या बनाना <br/><span className="text-orange-500">सीखना चाहते हैं?</span></h3>
                            <p className="text-slate-400 font-hindi text-lg">नीचे बॉक्स में किसी भी मशीन या चीज़ का नाम लिखें।</p>
                        </div>

                        <div className="w-full flex gap-3 bg-white/5 p-3 rounded-[2.5rem] border-2 border-white/10 focus-within:border-orange-500 transition-all shadow-inner">
                            <input 
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && generateClass()}
                                placeholder="जैसे: Computer, Drone, Car, Robot..." 
                                className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-bold px-6 py-2 outline-none"
                            />
                            <button 
                                onClick={generateClass}
                                disabled={isGenerating}
                                className="bg-orange-600 text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest hover:bg-orange-500 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                            >
                                {isGenerating ? <Loader message="" /> : <><RocketLaunchIcon className="h-6 w-6"/> शुरू करें</>}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                            {['Computer', 'Drone', 'Electric Car', 'Tractor'].map(item => (
                                <button key={item} onClick={() => setProductName(item)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all text-slate-400">
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                        {/* 1. Parts Shelf */}
                        <div className="lg:col-span-3 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                             <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">बनाने के पार्ट्स (Maker Shelf)</p>
                             <div className="space-y-3">
                                {parts.map(part => {
                                    const isDone = assembledParts.includes(part.id);
                                    return (
                                        <button 
                                            key={part.id} 
                                            onClick={() => handleFitPart(part)}
                                            disabled={isDone}
                                            className={`w-full p-5 rounded-[2rem] border-2 transition-all flex items-center gap-5 ${isDone ? 'opacity-20 grayscale' : 'border-white/5 bg-white/5 hover:border-orange-500/50 hover:bg-orange-500/10 active:scale-95 shadow-lg'}`}
                                        >
                                            <span className="text-4xl">{part.icon}</span>
                                            <div className="text-left">
                                                <span className="block text-xs font-black uppercase tracking-tight">{part.hindiName}</span>
                                                <span className="block text-[8px] font-mono text-slate-500">{part.name}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                             </div>
                        </div>

                        {/* 2. Central Assembly Area */}
                        <div className="lg:col-span-6 bg-black/40 rounded-[4rem] border-2 border-white/5 relative flex flex-col items-center justify-center overflow-hidden shadow-inner group">
                             {/* Large Workspace Visual */}
                             <div className="w-80 h-96 border-4 border-dashed border-slate-700 rounded-[4rem] relative flex items-center justify-center p-10">
                                {isFinished ? (
                                    <div className="text-center animate-pop-in">
                                        <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-bounce">
                                            <CheckCircleIcon className="h-20 w-20 text-white" />
                                        </div>
                                        <h4 className="text-3xl font-black uppercase text-green-400">{productName} Ready!</h4>
                                        <p className="text-sm font-hindi text-slate-400 mt-2">आपने इसे खुद बनाया है।</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-6 opacity-30">
                                        {parts.map((p, i) => (
                                            <div key={i} className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">
                                                {assembledParts.includes(p.id) ? p.icon : '?'}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {/* Floating Label for Active Work */}
                                {!isFinished && (
                                    <div className="absolute top-10 flex flex-col items-center gap-2 animate-pulse">
                                        <span className="text-[10px] font-black uppercase text-orange-400 tracking-[0.3em]">Assembling {productName}</span>
                                        <div className="w-20 h-1 bg-orange-600 rounded-full"></div>
                                    </div>
                                )}
                             </div>

                             {/* Real-time Assembly Log */}
                             <div className="absolute bottom-8 left-8 right-8 flex justify-center">
                                {assembledParts.length < parts.length && (
                                    <div className="bg-orange-600 text-white px-8 py-3 rounded-full text-xs font-black shadow-2xl animate-bounce">
                                        बाएं हाथ के पार्ट्स पर क्लिक करें ⬅️
                                    </div>
                                )}
                             </div>
                        </div>

                        {/* 3. AI Ustad Insight */}
                        <div className="lg:col-span-3 flex flex-col h-full">
                            <div className="p-8 bg-slate-900 border border-white/10 rounded-[3rem] h-full flex flex-col shadow-2xl relative overflow-hidden">
                                <h3 className="font-black mb-6 flex items-center gap-3 text-orange-400 uppercase tracking-tight text-lg border-b border-white/5 pb-4">
                                    <SparklesIcon className="h-6 w-6"/> AI उस्ताद रिपोर्ट
                                </h3>
                                
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    {advice ? (
                                        <div className="animate-pop-in space-y-6">
                                            <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-[2rem] shadow-inner">
                                                <p className="text-xl font-hindi leading-relaxed text-slate-100 font-medium">"{advice}"</p>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <button onClick={() => playAudio(advice, 0)} className="w-full py-5 bg-orange-600 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 shadow-xl hover:bg-orange-500 transition-all">
                                                    {isSpeaking ? <StopCircleIcon className="h-6 w-6 animate-pulse"/> : <SpeakerWaveIcon className="h-6 w-6"/>} दोबारा सुनें
                                                </button>
                                                {isFinished && (
                                                    <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-center">
                                                        <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Startup Opportunity</p>
                                                        <p className="text-xs text-slate-300 font-hindi">आप {productName} रिपेयरिंग का काम शुरू कर सकते हैं!</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center opacity-20 h-full text-center px-6">
                                            <BeakerIcon className="h-20 w-20 mb-6 text-slate-400" />
                                            <p className="text-sm font-black uppercase tracking-[0.2em] leading-snug">पार्ट्स जोड़ें और उस्ताद से हुनर सीखें</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIMakerLab;
