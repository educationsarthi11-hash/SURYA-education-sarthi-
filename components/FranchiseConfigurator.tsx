
import React, { useState, useEffect } from 'react';
import { LocationType } from '../types';
import { useToast } from '../hooks/useToast';
import { getBoardsForType } from '../config/classroomData';
import { INDIAN_STATES } from '../config/institutions';
import { 
    Cog6ToothIcon, PhotoIcon, SparklesIcon, PaintBrushIcon, 
    GlobeAltIcon, AcademicCapIcon, CheckCircleIcon, SunIcon, 
    BuildingOfficeIcon, BuildingLibraryIcon, WrenchScrewdriverIcon 
} from './icons/AllIcons';
import { useAppConfig } from '../contexts/AppConfigContext';

const FranchiseConfigurator: React.FC = () => {
    const toast = useToast();
    const { institutionName, setConfig, institutionType, primaryColor, logoUrl, selectedState, selectedBoard } = useAppConfig();
    
    const [localInstName, setLocalInstName] = useState(institutionName);
    const [localColor, setLocalColor] = useState(primaryColor);
    const [localState, setLocalState] = useState(selectedState);
    const [selectedType, setSelectedType] = useState<LocationType>(institutionType);
    
    const availableBoards = getBoardsForType(selectedType, localState);
    const [localBoard, setLocalBoard] = useState(selectedBoard || availableBoards[0]);

    useEffect(() => {
        if (!availableBoards.includes(localBoard)) {
            setLocalBoard(availableBoards[0]);
        }
    }, [localState, selectedType, availableBoards]);

    const handleSaveAll = () => {
        setConfig({ 
            institutionName: localInstName, 
            institutionType: selectedType,
            primaryColor: localColor,
            selectedState: localState,
            selectedBoard: localBoard
        });
        toast.success(`सिस्टम अपडेट सफल! अब डैशबोर्ड ${selectedType} मोड में चलेगा।`);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setConfig({ logoUrl: url });
            toast.success("लोगो अपडेट हो गया!");
        }
    };

    const instOptions = [
        { type: LocationType.School, label: 'School / Coaching', hindi: 'स्कूल / कोचिंग', icon: <BuildingOfficeIcon className="h-5 w-5"/> },
        { type: LocationType.College, label: 'College / Degree', hindi: 'कॉलेज / डिग्री', icon: <AcademicCapIcon className="h-5 w-5"/> },
        { type: LocationType.University, label: 'University', hindi: 'यूनिवर्सिटी', icon: <GlobeAltIcon className="h-5 w-5"/> },
        { type: LocationType.ITI, label: 'ITI / Technical', hindi: 'तकनीकी संस्थान (ITI)', icon: <WrenchScrewdriverIcon className="h-5 w-5"/> },
    ];

    return (
        <div className="bg-white p-4 sm:p-10 rounded-[4rem] shadow-soft space-y-12 animate-pop-in border border-slate-100">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b pb-8 gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-slate-900 rounded-[1.5rem] text-primary shadow-2xl rotate-3">
                        <SunIcon className="h-10 w-10 animate-spin-slow"/>
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none">HUB CONFIGURATOR</h2>
                        <p className="text-sm text-slate-400 font-hindi font-bold tracking-widest uppercase mt-1">सिस्टम सेटअप और ब्रांडिंग</p>
                    </div>
                </div>
                <button onClick={handleSaveAll} className="w-full md:w-auto px-14 py-6 bg-primary text-slate-950 font-black rounded-3xl shadow-xl hover:bg-slate-900 hover:text-white transition-all transform active:scale-95 text-lg uppercase tracking-widest">APPLY CHANGES</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 bg-slate-50/50 p-10 rounded-[3.5rem] border-2 border-slate-100 space-y-10 shadow-inner">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-4 uppercase tracking-tighter"><PaintBrushIcon className="h-6 w-6 text-primary"/> Identity Setup</h3>
                    
                    <div className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-2">Institution Name (नाम)</label>
                            <input type="text" value={localInstName} onChange={e => setLocalInstName(e.target.value)} className="w-full p-6 bg-white border-4 border-transparent rounded-[2.5rem] font-black text-2xl focus:border-primary outline-none shadow-xl transition-all" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-2">Management Mode (प्रकार चुनें)</label>
                            <div className="grid grid-cols-2 gap-3">
                                {instOptions.map(opt => (
                                    <button 
                                        key={opt.type}
                                        onClick={() => setSelectedType(opt.type)}
                                        className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${selectedType === opt.type ? 'border-primary bg-primary/10 text-primary shadow-md' : 'bg-white border-slate-100 text-slate-500'}`}
                                    >
                                        {opt.icon}
                                        <div className="text-left">
                                            <p className="text-[10px] font-black uppercase leading-none mb-1">{opt.label}</p>
                                            <p className="text-xs font-bold font-hindi">{opt.hindi}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 ml-2">State (राज्य)</label>
                                <select value={localState} onChange={e => setLocalState(e.target.value)} className="w-full p-5 bg-white border-2 border-slate-200 rounded-2xl font-bold">
                                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 ml-2">Board (बोर्ड)</label>
                                <select value={localBoard} onChange={e => setLocalBoard(e.target.value)} className="w-full p-5 bg-white border-2 border-slate-200 rounded-2xl font-bold">
                                    {availableBoards.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border-4 border-primary/20">
                         <div className="absolute top-0 right-0 p-16 bg-primary/20 rounded-full blur-[120px] -mr-20 -mt-20"></div>
                         <SunIcon className="h-20 w-20 text-primary mb-10 opacity-80" />
                         <h4 className="text-4xl font-black mb-6 tracking-tighter leading-none uppercase">Smart <br/> Intelligence</h4>
                         <p className="text-slate-400 font-hindi text-lg leading-relaxed">
                            जब आप **{selectedType}** मोड चुनते हैं, तो AI आपके डैशबोर्ड को उसके अनुसार कस्टमाइज़ कर देता है। 
                            <br/><br/>
                            इससे आपको सिर्फ वही टूल्स दिखते हैं जो आपकी संस्था के लिए जरूरी हैं।
                         </p>
                    </div>

                    <div className="bg-white p-10 rounded-[3.5rem] border-4 border-slate-100 flex flex-col items-center text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Hub Logo</p>
                        <div className="w-40 h-40 bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-200 flex items-center justify-center p-6 overflow-hidden relative group cursor-pointer" onClick={() => (document.getElementById('logo-upload-config') as any).click()}>
                            {logoUrl ? <img src={logoUrl} className="max-h-full max-w-full object-contain" alt="Logo"/> : <PhotoIcon className="h-14 w-14 text-slate-200" />}
                        </div>
                        <input id="logo-upload-config" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        <button onClick={() => (document.getElementById('logo-upload-config') as any).click()} className="mt-6 text-[10px] font-black text-primary uppercase hover:underline">Change Logo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FranchiseConfigurator;
