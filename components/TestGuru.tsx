
import React, { useState, useRef, useMemo } from 'react';
import { generateTest } from '../services/geminiService';
import Loader from './Loader';
import { PencilSquareIcon, PrinterIcon, SparklesIcon, ArrowDownTrayIcon, ArrowLeftIcon } from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import { useAppConfig } from '../contexts/AppConfigContext';
import { useClassroom } from '../contexts/ClassroomContext';

const TestGuru: React.FC = () => {
    const toast = useToast();
    const { institutionName } = useAppConfig();
    const { selectedClass } = useClassroom();
    const [loading, setLoading] = useState(false);
    const [generatedPaper, setGeneratedPaper] = useState('');
    const [paperSize, setPaperSize] = useState<'a4' | 'legal'>('a4');
    const [viewMode, setViewMode] = useState<'config' | 'preview'>('config');

    // Form State
    const [subject, setSubject] = useState('Science');
    const [chapter, setChapter] = useState('');
    const [numQuestions, setNumQuestions] = useState(10);
    const [language, setLanguage] = useState('Hindi');

    const handleGenerate = async () => {
        if (!subject || !chapter) {
            toast.error("कृपया विषय और अध्याय का नाम लिखें।");
            return;
        }
        setLoading(true);
        try {
            const paperHtml = await generateTest({
                schoolName: institutionName,
                subject,
                className: selectedClass,
                numQuestions,
                chapterName: chapter,
                language,
                testDuration: 60,
                totalMarks: 50
            });
            setGeneratedPaper(paperHtml);
            setViewMode('preview');
            toast.success("AI ने पेपर तैयार कर दिया है! अब प्रीव्यू देखें।");
        } catch (e) {
            toast.error("पेपर बनाने में समस्या आई।");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col h-full bg-slate-100 rounded-xl overflow-hidden">
            <style>
                {`
                    @media print {
                        @page {
                            size: ${paperSize} portrait;
                            margin: 0;
                        }
                        .no-print { display: none !important; }
                        body { background: white !important; }
                        .printable-page {
                            margin: 0 !important;
                            border: none !important;
                            box-shadow: none !important;
                            width: 100% !important;
                            height: 100vh !important;
                            page-break-after: always;
                            position: relative;
                        }
                    }
                    /* स्क्रीन पर पेपर जैसा दिखने के लिए CSS */
                    .preview-scroll-area {
                        background-color: #525659; /* PDF viewer जैसा बैकग्राउंड */
                        padding: 40px 20px;
                        overflow-y: auto;
                        height: 100%;
                    }
                    .printable-page {
                        background: white;
                        margin: 0 auto 20px;
                        padding: 60px;
                        width: 210mm; /* A4 Width */
                        min-height: 297mm; /* A4 Height */
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        position: relative;
                        box-sizing: border-box;
                    }
                    /* हर पेज पर बॉर्डर */
                    .page-border {
                        position: absolute;
                        top: 20px; left: 20px; right: 20px; bottom: 20px;
                        border: 2px solid #334155;
                        pointer-events: none;
                    }
                    /* सवाल कटने से रोकने के लिए */
                    .question-block {
                        page-break-inside: avoid;
                        margin-bottom: 25px;
                        display: block;
                    }
                `}
            </style>

            {/* Top Toolbar */}
            <div className="p-4 bg-white border-b flex justify-between items-center no-print shadow-sm z-20">
                <div className="flex items-center gap-3">
                    <PencilSquareIcon className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-slate-800">Test Guru (Smart Printer)</h2>
                </div>
                <div className="flex gap-3">
                    {viewMode === 'preview' ? (
                        <>
                            <select 
                                value={paperSize} 
                                onChange={e => setPaperSize(e.target.value as any)}
                                className="border rounded-lg px-3 py-2 text-sm font-bold bg-slate-50"
                            >
                                <option value="a4">A4 (Standard)</option>
                                <option value="legal">Legal (Long)</option>
                            </select>
                            <button onClick={handlePrint} className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-primary-dark transition-all">
                                <PrinterIcon className="h-5 w-5"/> प्रिंट करें (Print)
                            </button>
                            <button onClick={() => setViewMode('config')} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold">
                                <ArrowLeftIcon className="h-4 w-4 mr-1 inline"/> वापस (Back)
                            </button>
                        </>
                    ) : (
                        <p className="text-sm font-bold text-slate-400 font-hindi uppercase">पेपर सेटअप करें</p>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {viewMode === 'config' ? (
                    <div className="max-w-2xl mx-auto p-10 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
                            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                <SparklesIcon className="h-6 w-6 text-primary"/> पेपर का विवरण भरें
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Subject (विषय)</label>
                                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Language (भाषा)</label>
                                        <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full p-3 border rounded-xl bg-slate-50">
                                            <option>Hindi</option>
                                            <option>English</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Chapter Name (अध्याय का नाम)</label>
                                    <input type="text" value={chapter} onChange={e => setChapter(e.target.value)} placeholder="जैसे: प्रकाश का परावर्तन" className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Number of Questions (सवालों की संख्या)</label>
                                    <input type="number" value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} className="w-full p-3 border rounded-xl bg-slate-50" />
                                </div>
                                <button 
                                    onClick={handleGenerate} 
                                    disabled={loading} 
                                    className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-primary transition-all transform active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <Loader message="AI पेपर लिख रहा है..." /> : "मैजिक पेपर तैयार करें (Generate)"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="preview-scroll-area custom-scrollbar">
                        {/* 
                          Paper Container: This shows exactly what will be printed.
                          We use a simple A4 simulation here. 
                        */}
                        <div className="printable-page animate-pop-in no-scrollbar" id="print-area">
                            <div className="page-border no-print"></div> {/* Screen-only border visual */}
                            <div className="prose prose-sm max-w-none font-hindi leading-relaxed text-slate-900">
                                {/* The AI returns HTML. Our styles above ensure no splitting of question blocks */}
                                <div dangerouslySetInnerHTML={{ __html: generatedPaper }} />
                            </div>
                            
                            {/* Paper Info Footer (Only in preview) */}
                            <div className="absolute bottom-10 left-0 right-0 text-center no-print">
                                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Page 1 of 1 • Education Sarthi System</p>
                            </div>
                        </div>
                        
                        <div className="h-20 no-print"></div> {/* Extra space at bottom of preview */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestGuru;
