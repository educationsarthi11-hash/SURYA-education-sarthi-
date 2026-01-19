
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { generateText, sanitizeHtml } from '../services/geminiService';
import Loader from './Loader';
import { useToast } from '../hooks/useToast';
import { BuildingLibraryIcon, ArrowDownTrayIcon, PrinterIcon, SparklesIcon, MapPinIcon, BookOpenIcon } from './icons/AllIcons';
import { useClassroom } from '../contexts/ClassroomContext';
import { bookData, getBoardsForType, bookChapterMap } from '../config/classroomData';
import { useAppConfig } from '../contexts/AppConfigContext';

declare const jspdf: any;
declare const html2canvas: any;

const explanationLanguages = ['English', 'Hindi', 'Hinglish', 'Marathi', 'Bengali'];

const BookSelector: React.FC = () => {
    const { institutionType, selectedClass } = useClassroom();
    const { selectedState, selectedBoard } = useAppConfig(); // Using global context
    const toast = useToast();

    const [board, setBoard] = useState(selectedBoard || 'CBSE');
    const [subject, setSubject] = useState('Science');
    const [language, setLanguage] = useState('Hindi');
    const [bookName, setBookName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [topic, setTopic] = useState('');
    const [studyMaterial, setStudyMaterial] = useState('');
    const [loading, setLoading] = useState(false);
    const materialContentRef = useRef<HTMLDivElement>(null);

    // --- ऑटो-चैप्टर लॉजिक ---
    const availableChapters = useMemo(() => {
        return bookChapterMap[bookName] || [];
    }, [bookName]);

    // किताब बदलते ही पहला चैप्टर ऑटो-सिलेक्ट करें
    useEffect(() => {
        if (availableChapters.length > 0) {
            setChapterName(availableChapters[0]);
        } else {
            setChapterName('');
        }
    }, [availableChapters]);

    const availableBoards = useMemo(() => getBoardsForType(institutionType, selectedState), [institutionType, selectedState]);
    const currentClassKey = selectedClass;
    const currentBooksByCompany = useMemo(() => bookData[currentClassKey]?.[board] || {}, [currentClassKey, board]);
    const availableBookCompanies = Object.keys(currentBooksByCompany);
    const [selectedBookCompany, setSelectedBookCompany] = useState<string>(availableBookCompanies[0] || '');

    const currentBookList = useMemo(() => {
        return selectedBookCompany ? currentBooksByCompany[selectedBookCompany] || [] : [];
    }, [currentBooksByCompany, selectedBookCompany]);

    useEffect(() => {
        if (currentBookList.length > 0) setBookName(currentBookList[0]);
    }, [currentBookList]);

    // Ensure local board syncs if global board changes
    useEffect(() => {
        if (selectedBoard) setBoard(selectedBoard);
    }, [selectedBoard]);

    const handleGenerate = async () => {
        if (!bookName || !chapterName || !topic) {
            toast.error('कृपया किताब, चैप्टर और टॉपिक चुनें।');
            return;
        }
        setLoading(true);
        setStudyMaterial('');

        try {
            const prompt = `Explain "${topic}" from ${bookName}, ${chapterName} (${board}) in ${language}. Use professional style with examples. Format as HTML.`;
            const response = await generateText(prompt, 'gemini-3-pro-preview');
            setStudyMaterial(sanitizeHtml(response));
        } catch (err) {
            toast.error('Material generation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-soft h-full flex flex-col overflow-hidden border-t-4 border-blue-600">
            <div className="flex items-center mb-4 shrink-0">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
                    <BookOpenIcon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">AI Study Material</h2>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
                {/* --- Left Form: Input --- */}
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar p-1">
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex justify-between items-center">
                        <span className="font-bold text-blue-800 text-sm">Target: {selectedClass}</span>
                        <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">{selectedState} | {board}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Change Board</label>
                            <select value={board} onChange={e => setBoard(e.target.value)} className="w-full p-2 border-2 border-slate-100 rounded-lg text-sm bg-white">
                                {availableBoards.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Language</label>
                            <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full p-2 border-2 border-slate-100 rounded-lg text-sm">
                                {explanationLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Select Book (किताब चुनें)</label>
                        <select value={bookName} onChange={e => setBookName(e.target.value)} className="w-full p-3 border-2 border-blue-50 rounded-lg font-bold text-blue-900 bg-blue-50/30">
                            <option value="">-- Choose Book --</option>
                            {currentBookList.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Chapter (अध्याय)</label>
                        {availableChapters.length > 0 ? (
                            <select value={chapterName} onChange={e => setChapterName(e.target.value)} className="w-full p-3 border-2 border-slate-100 rounded-lg text-sm bg-white">
                                {availableChapters.map(ch => <option key={ch} value={ch}>{ch}</option>)}
                            </select>
                        ) : (
                            <input type="text" value={chapterName} onChange={e => setChapterName(e.target.value)} placeholder="Type Chapter Name" className="w-full p-3 border-2 border-slate-100 rounded-lg text-sm" />
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Topic (विषय)</label>
                        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Laws of Motion" className="w-full p-3 border-2 border-slate-100 rounded-lg text-sm" />
                    </div>

                    <button onClick={handleGenerate} disabled={loading} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                        {loading ? 'AI is writing...' : <><SparklesIcon className="h-5 w-5"/> Generate Study Guide</>}
                    </button>
                </div>

                {/* --- Right View: Material --- */}
                <div className="bg-slate-50 rounded-xl border-2 border-blue-50 overflow-y-auto custom-scrollbar p-6">
                    {loading ? (
                        <div className="h-full flex items-center justify-center"><Loader message="AI सार्थी नोट्स तैयार कर रहा है..." /></div>
                    ) : studyMaterial ? (
                        <div ref={materialContentRef} className="animate-pop-in">
                            <div className="flex justify-end gap-2 mb-4 no-print">
                                <button onClick={() => window.print()} className="p-2 bg-white rounded-lg border shadow-sm text-blue-600"><PrinterIcon className="h-5 w-5"/></button>
                            </div>
                            <div className="prose prose-blue max-w-none font-hindi" dangerouslySetInnerHTML={{ __html: studyMaterial }} />
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-40">
                            <SparklesIcon className="h-20 w-20 mb-4" />
                            <p className="font-bold">Select Book & Chapter to start learning</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookSelector;
