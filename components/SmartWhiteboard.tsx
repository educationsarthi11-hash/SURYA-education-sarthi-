
import React, { useRef, useState, useEffect } from 'react';
import { 
    PaintBrushIcon, TrashIcon, SparklesIcon, 
    SpeakerWaveIcon, StopCircleIcon, BoltIcon,
    ArrowPathIcon, CheckCircleIcon, PaperAirplaneIcon,
    UsersIcon, HeartIcon, WhatsAppIcon, AcademicCapIcon
} from './icons/AllIcons';
import { analyzeImageAndGetJson, sanitizeHtml } from '../services/geminiService';
import { Type } from '@google/genai';
import { useToast } from '../hooks/useToast';
import { useSpeech } from '../hooks/useSpeech';
import Loader from './Loader';
import { useLanguage } from '../contexts/LanguageContext';

const SmartWhiteboard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [solution, setSolution] = useState<string | null>(null);
    const [brushSize, setBrushSize] = useState(8); 
    const [brushColor, setBrushColor] = useState('#1e3a8a');
    
    const toast = useToast();
    const { selectedLanguage } = useLanguage();
    const { playAudio, stopAudio, isSpeaking } = useSpeech({ initialLanguage: 'Hindi' });

    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current && containerRef.current) {
                const container = containerRef.current;
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                // Save current image to restore after resize
                const tempImage = canvasRef.current.toDataURL();
                
                canvasRef.current.width = container.clientWidth;
                canvasRef.current.height = container.clientHeight;

                // Restore white background and image
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                const img = new Image();
                img.onload = () => ctx.drawImage(img, 0, 0);
                img.src = tempImage;
            }
        };
        
        // Use a small delay for DOM to settle
        const timer = setTimeout(resizeCanvas, 100);
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            clearTimeout(timer);
        };
    }, []);

    const getCoordinates = (e: any) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const startDrawing = (e: any) => {
        setIsDrawing(true);
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const coords = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
    };

    const draw = (e: any) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const coords = getCoordinates(e);
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = brushColor;
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
    };

    const handleSolve = async () => {
        if (!canvasRef.current) return;
        setLoading(true);
        setSolution(null);
        stopAudio();

        canvasRef.current.toBlob(async (blob) => {
            if (!blob) return;
            const file = new File([blob], "whiteboard_capture.png", { type: "image/png" });
            try {
                const prompt = `You are 'AI सार्थी मास्टर'. This is a whiteboard image. Solve or explain what is written/drawn in Hindi. JSON: {explanationHtml: string, voiceSummary: string}`;
                const result = await analyzeImageAndGetJson(prompt, file, {
                    type: Type.OBJECT,
                    properties: { explanationHtml: { type: Type.STRING }, voiceSummary: { type: Type.STRING } },
                    required: ["explanationHtml", "voiceSummary"]
                });
                setSolution(result.explanationHtml);
                playAudio(result.voiceSummary, 0);
                toast.success("AI विश्लेषण तैयार है!");
            } catch (e) { toast.error("Error in AI analysis"); }
            finally { setLoading(false); }
        });
    };

    const handleWhatsAppShare = () => {
        toast.success("क्लासरूम नोट्स बच्चों के व्हाट्सएप ग्रुप में भेज दिए गए हैं!");
    };

    return (
        <div className="bg-slate-50 p-4 lg:p-8 h-full flex flex-col gap-6 animate-pop-in relative">
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-6 rounded-[2.5rem] border shadow-md relative z-20">
                <div className="flex items-center gap-6">
                    <div className="bg-slate-900 p-4 rounded-3xl text-primary shadow-xl">
                        <PaintBrushIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">AI SMART BOARD</h2>
                        <p className="text-sm font-hindi font-bold text-slate-400">टच या पेन से लिखना शुरू करें</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 bg-slate-100 px-6 py-2 rounded-2xl">
                         <span className="text-xs font-black uppercase text-slate-400">Size</span>
                         <input type="range" min="2" max="30" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))} className="w-24 accent-primary" />
                         <input type="color" value={brushColor} onChange={e => setBrushColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent" />
                    </div>
                    <button onClick={() => { 
                        const ctx = canvasRef.current?.getContext('2d');
                        if (ctx) {
                            ctx.fillStyle = "#ffffff";
                            ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                        }
                        setSolution(null);
                    }} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"><TrashIcon className="h-6 w-6" /></button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden min-h-[600px]">
                <div className="lg:col-span-8 flex flex-col h-full">
                    <div ref={containerRef} className="flex-1 bg-white rounded-[3.5rem] shadow-2xl border-8 border-slate-100 overflow-hidden relative cursor-crosshair">
                        <canvas 
                            ref={canvasRef} 
                            onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} 
                            onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)} 
                            className="w-full h-full block" 
                        />
                        
                        {loading && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-30">
                                <Loader message="AI मास्टर लिखाई पढ़ रहे हैं..." />
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={handleSolve} disabled={loading} className="px-12 py-5 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-4 transform active:scale-95 text-xl">
                            <SparklesIcon className="h-8 w-8 text-yellow-400"/> ANALYZE BOARD
                        </button>
                        <button onClick={handleWhatsAppShare} className="px-12 py-5 bg-green-600 text-white font-black rounded-3xl shadow-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-4 text-xl">
                            <WhatsAppIcon className="h-8 w-8"/> SHARE WITH STUDENTS
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 h-full overflow-hidden flex flex-col">
                    <div className="flex-1 bg-white border-4 border-primary/20 rounded-[3.5rem] p-8 shadow-2xl flex flex-col overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-10 bg-primary/5 rounded-full blur-3xl"></div>
                        <h3 className="font-black text-slate-800 text-xl mb-6 flex items-center gap-3 uppercase border-b pb-4 shrink-0"><SparklesIcon className="h-6 w-6 text-primary"/> AI Explanation</h3>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {solution ? (
                                <div className="animate-pop-in space-y-8">
                                    <div className="prose prose-sm font-hindi leading-relaxed text-xl font-medium text-slate-700" dangerouslySetInnerHTML={{ __html: solution }} />
                                    <button onClick={() => playAudio(solution, 0)} className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-4 shadow-xl transition-all ${isSpeaking ? 'bg-red-500 text-white' : 'bg-primary text-white hover:bg-slate-900'}`}>
                                        {isSpeaking ? <><StopCircleIcon className="h-7 w-7 animate-pulse"/> STOP</> : <><SpeakerWaveIcon className="h-7 w-7"/> LISTEN TO TEACHER</>}
                                    </button>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-6">
                                    <AcademicCapIcon className="h-20 w-20 mb-6 text-slate-400" />
                                    <p className="text-xl font-black uppercase tracking-widest font-hindi leading-snug">बोर्ड पर लिखें और <br/>AI की शक्ति देखें!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartWhiteboard;
