
import React from 'react';
import { PhoneIcon, MapPinIcon, CurrencyRupeeIcon, SpeakerWaveIcon, HeartIcon, LeafIcon, SparklesIcon, CheckCircleIcon, ArrowRightIcon } from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import { useAppConfig } from '../contexts/AppConfigContext';
import { ServiceName } from '../types';

interface ParentPortalProps {
    setActiveService?: (s: ServiceName) => void;
}

const ParentPortal: React.FC<ParentPortalProps> = ({ setActiveService }) => {
    const toast = useToast();
    const { fatherName, motherName, userName, institutionName, logoUrl } = useAppConfig();
    
    // डमी चेक: क्या यह ग्रामीण यूजर है?
    const isRural = localStorage.getItem('sarthi_country') === 'IN';

    return (
        <div className="p-4 sm:p-8 space-y-8 animate-pop-in max-w-[1400px] mx-auto pb-32">
            {/* Parent Welcome Header */}
            <div className="bg-slate-900 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-2xl border-4 border-white/5">
                <div className="absolute top-0 right-0 p-24 bg-primary/10 rounded-full blur-[100px] -mr-10 -mt-10"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Parent Secure Access</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black mb-3">नमस्ते, {fatherName || 'अभिभावक'} जी! 👋</h2>
                        <p className="text-slate-400 font-hindi text-xl max-w-xl">{userName} की प्रगति और सुरक्षा रिपोर्ट यहाँ {institutionName} पोर्टल पर उपलब्ध है।</p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl p-4 border-4 border-white/10">
                        {logoUrl ? <img src={logoUrl} className="max-w-full max-h-full object-contain" alt="Institution Logo"/> : <div className="font-black text-slate-200">LOGO</div>}
                    </div>
                </div>
            </div>

            {/* QUICK FEE ALERT (Dynamic Context) */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-[3rem] p-8 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 transform hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-6">
                    <div className="bg-white/20 p-5 rounded-[2rem] backdrop-blur-md border border-white/20">
                        <CurrencyRupeeIcon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Online Fee Counter</h3>
                        <p className="text-orange-100 font-hindi font-bold text-lg opacity-90 mt-1">अगस्त महीने की फीस जमा करने का लिंक सक्रिय है।</p>
                    </div>
                </div>
                <button 
                    onClick={() => setActiveService?.('Fee Management')}
                    className="px-10 py-5 bg-white text-orange-600 font-black rounded-3xl shadow-xl hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 active:scale-95"
                >
                    फीस जमा करें <ArrowRightIcon className="h-5 w-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Track Child */}
                <button onClick={() => toast.info(`${userName} अभी स्कूल बस में है और घर की ओर आ रहा है।`)} className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 hover:border-primary transition-all shadow-sm hover:shadow-2xl text-center group active:scale-95 transform overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                        <MapPinIcon className="h-10 w-10" />
                    </div>
                    <h3 className="font-black text-slate-800 text-2xl font-hindi">बच्चा कहाँ है?</h3>
                    <p className="text-xs text-slate-400 mt-2 uppercase font-bold tracking-widest">Real-time Bus Tracking</p>
                </button>

                {/* 2. Audio Summary */}
                <button onClick={() => setActiveService?.('Progress Monitor')} className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 hover:border-primary transition-all shadow-sm hover:shadow-2xl text-center group active:scale-95 transform overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                    <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner">
                        <SpeakerWaveIcon className="h-10 w-10" />
                    </div>
                    <h3 className="font-black text-slate-800 text-2xl font-hindi">आज क्या सीखा?</h3>
                    <p className="text-xs text-slate-400 mt-2 uppercase font-bold tracking-widest">Daily Voice Summary</p>
                </button>

                {/* 3. Special Feature (Agriculture or Events) */}
                <button onClick={() => setActiveService?.('AI Gallery')} className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 hover:border-primary transition-all shadow-sm hover:shadow-2xl text-center group active:scale-95 transform overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                        <SparklesIcon className="h-10 w-10" />
                    </div>
                    <h3 className="font-black text-slate-800 text-2xl font-hindi">स्कूल की खबरें</h3>
                    <p className="text-xs text-slate-400 mt-2 uppercase font-bold tracking-widest">Events & Highlights</p>
                </button>
            </div>
            
            <div className="bg-white p-10 rounded-[4rem] border-4 border-red-50 shadow-sm flex flex-col md:flex-row items-center gap-10">
                <div className="p-8 bg-red-100 text-red-600 rounded-full animate-pulse shadow-xl shadow-red-100">
                    <HeartIcon className="h-12 w-12" />
                </div>
                <div className="text-center md:text-left flex-1">
                    <h4 className="font-black text-slate-900 text-3xl font-hindi tracking-tight">आपातकालीन संपर्क (Safety SOS)</h4>
                    <p className="text-lg text-slate-500 font-hindi font-medium mt-1 leading-relaxed">बच्चे की सुरक्षा या किसी अन्य समस्या के लिए सीधे {institutionName} के मुख्य एडमिन से बात करें।</p>
                </div>
                <a href="tel:919876543210" className="w-full md:w-auto px-12 py-6 bg-red-600 text-white font-black text-xl rounded-3xl shadow-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-4 group">
                    <PhoneIcon className="h-7 w-7 group-hover:animate-bounce" /> CALL NOW
                </a>
            </div>
        </div>
    );
};

export default ParentPortal;
