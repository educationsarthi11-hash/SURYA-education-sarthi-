
import React, { useState } from 'react';
import { GlobeAltIcon, SparklesIcon, CheckCircleIcon, UserPlusIcon, BuildingOfficeIcon, PhoneIcon, MapPinIcon, AcademicCapIcon, WrenchScrewdriverIcon, ArrowRightIcon } from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import { LocationType } from '../types';
import Loader from './Loader';

interface Props {
    onComplete: () => void;
}

const FranchiseRegistrationForm: React.FC<Props> = ({ onComplete }) => {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        ownerName: '',
        institutionName: '',
        type: LocationType.School,
        city: '',
        mobile: '',
        email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
            toast.success("पंजीकरण सफल! हमारी टीम 24 घंटों में कॉल करेगी।");
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-[4rem] shadow-2xl border-8 border-slate-50 overflow-hidden animate-pop-in">
            <div className="p-12 bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-24 bg-primary/20 rounded-full blur-[100px] -mr-16 -mt-16"></div>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="p-5 bg-primary rounded-[2rem] shadow-2xl shadow-primary/40 rotate-3 transition-transform hover:rotate-0"><GlobeAltIcon className="h-12 w-12 text-slate-950"/></div>
                    <div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Partner Registry</h3>
                        <p className="text-sm text-slate-400 font-hindi mt-2 font-bold tracking-widest uppercase opacity-70">Empower your region with AI</p>
                    </div>
                </div>
                <div className="flex gap-4 relative z-10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-2.5 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-primary shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'w-6 bg-white/10'}`}></div>
                    ))}
                </div>
            </div>

            <div className="p-12 sm:p-24 relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                {step === 1 && (
                    <div className="space-y-12 animate-slide-in-right relative z-10">
                        <div className="text-center">
                            <h4 className="text-5xl font-black text-slate-900 mb-4 font-hindi tracking-tighter uppercase leading-none">संस्थान का प्रकार चुनें</h4>
                            <p className="text-slate-500 text-xl font-medium">Select the management ecosystem you want to deploy:</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { type: LocationType.School, label: 'Secondary School', hindi: 'स्कूल (1st-12th)', icon: <BuildingOfficeIcon />, color: 'orange' },
                                { type: LocationType.College, label: 'Degree College', hindi: 'कॉलेज (UG/PG)', icon: <AcademicCapIcon />, color: 'blue' },
                                { type: LocationType.ITI, label: 'Technical ITI', hindi: 'आईटीआई संस्थान', icon: <WrenchScrewdriverIcon />, color: 'teal' },
                                { type: LocationType.CoachingCenter, label: 'Coaching Center', hindi: 'कोचिंग (NEET/JEE)', icon: <SparklesIcon />, color: 'red' }
                            ].map(opt => (
                                <button 
                                    key={opt.type}
                                    onClick={() => { setFormData({...formData, type: opt.type}); setStep(2); }}
                                    className="p-8 rounded-[3rem] border-2 border-slate-100 hover:border-primary hover:bg-slate-50 transition-all text-left flex items-center gap-8 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                                    <div className={`p-6 bg-slate-100 rounded-[2rem] text-slate-400 group-hover:text-primary group-hover:bg-white group-hover:shadow-xl transition-all shadow-inner relative z-10`}>
                                        {React.cloneElement(opt.icon as React.ReactElement, { className: "h-10 w-10" })}
                                    </div>
                                    <div className="relative z-10">
                                        <p className="font-black text-slate-900 text-xs uppercase tracking-widest mb-1">{opt.label}</p>
                                        <p className="text-2xl font-hindi font-black text-slate-500 group-hover:text-slate-900 transition-colors">{opt.hindi}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-12 animate-slide-in-right relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-[0.3em]">Owner Full Name</label>
                                <input value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} placeholder="आपका पूरा नाम" className="w-full p-6 bg-slate-50 border-4 border-transparent rounded-[2.5rem] font-black text-xl focus:bg-white focus:border-primary outline-none shadow-inner transition-all" required />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-[0.3em]">Institution Name</label>
                                <input value={formData.institutionName} onChange={e => setFormData({...formData, institutionName: e.target.value})} placeholder="संस्था का नाम" className="w-full p-6 bg-slate-50 border-4 border-transparent rounded-[2.5rem] font-black text-xl focus:bg-white focus:border-primary outline-none shadow-inner transition-all" required />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-[0.3em]">WhatsApp Number</label>
                                <div className="relative">
                                    <PhoneIcon className="absolute left-6 top-7 h-6 w-6 text-slate-300"/>
                                    <input value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} placeholder="91XXXXXXXX" className="w-full p-6 pl-16 bg-slate-50 border-4 border-transparent rounded-[2.5rem] font-black text-xl focus:bg-white focus:border-primary outline-none shadow-inner transition-all" required />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase ml-3 tracking-[0.3em]">Target Location</label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-6 top-7 h-6 w-6 text-slate-300"/>
                                    <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="शहर / इलाका" className="w-full p-6 pl-16 bg-slate-50 border-4 border-transparent rounded-[2.5rem] font-black text-xl focus:bg-white focus:border-primary outline-none shadow-inner transition-all" required />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button type="button" onClick={() => setStep(1)} className="flex-1 py-6 bg-slate-100 text-slate-500 font-black rounded-3xl uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">BACK</button>
                            <button type="submit" disabled={loading} className="flex-[2] py-8 bg-primary text-slate-950 font-black rounded-[2.5rem] shadow-2xl shadow-primary/30 hover:bg-slate-950 hover:text-white transition-all uppercase tracking-widest text-2xl active:scale-95 group">
                                {loading ? <Loader message="" /> : <span className="flex items-center justify-center gap-4">CONFIRM & REGISTER <ArrowRightIcon className="h-8 w-8 group-hover:translate-x-3 transition-transform" /></span>}
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div className="text-center space-y-12 animate-pop-in py-12 relative z-10">
                        <div className="w-40 h-40 bg-green-100 text-green-600 rounded-[4rem] flex items-center justify-center mx-auto shadow-inner border-8 border-white animate-bounce-slow">
                            <CheckCircleIcon className="h-20 w-20"/>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none italic">SUCCESS!</h4>
                            <p className="text-slate-500 font-hindi text-3xl mt-6 max-w-2xl mx-auto leading-relaxed font-bold">
                                {formData.ownerName} जी, आपका आवेदन स्वीकार कर लिया गया है। सार्थी एक्सपर्ट्स आपसे जल्द संपर्क करेंगे।
                            </p>
                        </div>
                        <button 
                            onClick={onComplete} 
                            className="px-20 py-6 bg-slate-950 text-white font-black rounded-[2.5rem] shadow-2xl hover:bg-primary hover:text-slate-950 transition-all uppercase tracking-widest text-xl transform active:scale-95"
                        >
                            DONE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FranchiseRegistrationForm;
