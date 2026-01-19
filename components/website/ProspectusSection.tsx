
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { DocumentTextIcon, ArrowDownTrayIcon, SparklesIcon, CheckCircleIcon } from '../icons/AllIcons';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';

const ProspectusSection: React.FC = () => {
    const { t } = useLanguage();
    const toast = useToast();

    const handleDownload = () => {
        toast.success("प्रोस्पेक्टस डाउनलोड हो रहा है...");
        // In a real app, this would be a real PDF link
        window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
    };

    return (
        <SectionWrapper id="prospectus" className="bg-slate-900 py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/30">
                            <SparklesIcon className="h-4 w-4"/> Admissions 2024-25 Open
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
                            हमारा <span className="text-primary">डिजिटल प्रोस्पेक्टस</span> डाउनलोड करें
                        </h2>
                        <p className="text-slate-400 text-lg font-hindi leading-relaxed">
                            मंगमत स्कूल की कार्यप्रणाली, फीस स्ट्रक्चर और AI स्मार्ट क्लासरूम के बारे में विस्तार से जानें। सफलता की नई दिशा की ओर पहला कदम बढ़ाएं।
                        </p>
                        <div className="space-y-4">
                            {['आधुनिक AI लैब', 'क्षेत्रीय भाषा सपोर्ट', '100% पेपरलेस एडमिशन', 'सुरक्षित कैंपस और बस ट्रैकिंग'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-200">
                                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    <span className="font-bold font-hindi">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all"></div>
                        <div className="relative bg-white p-10 rounded-[3rem] shadow-2xl border-8 border-slate-800 text-center">
                            <DocumentTextIcon className="h-24 w-24 text-primary mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase">Official Prospectus</h3>
                            <p className="text-slate-500 text-sm mb-8">PDF Version (English & Hindi)</p>
                            <button 
                                onClick={handleDownload}
                                className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-4 active:scale-95 uppercase tracking-widest"
                            >
                                <ArrowDownTrayIcon className="h-6 w-6" /> Download Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default ProspectusSection;
