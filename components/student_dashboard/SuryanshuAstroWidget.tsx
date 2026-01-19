
import React, { useState, useEffect } from 'react';
import { SparklesIcon, BoltIcon, SunIcon, ClockIcon } from '../icons/AllIcons';
import { useAppConfig } from '../../contexts/AppConfigContext';

const SuryanshuAstroWidget: React.FC = () => {
    const { tob, userName } = useAppConfig();
    const [energy, setEnergy] = useState(0);
    const [status, setStatus] = useState('Checking Solar Alignment...');

    useEffect(() => {
        // Simple logic based on current hour vs TOB
        const hour = new Date().getHours();
        const birthHour = parseInt(tob.split(':')[0]);
        
        // Sun energy is peak during day (6am to 6pm) and especially near TOB
        let currentEnergy = 0;
        if (hour >= 6 && hour <= 18) {
            currentEnergy = 70 + (Math.random() * 20);
            if (Math.abs(hour - birthHour) < 2) {
                currentEnergy = 95;
                setStatus('PEAK POWER: Best time for tough subjects!');
            } else {
                setStatus('Active: Good for learning new concepts.');
            }
        } else {
            currentEnergy = 40 + (Math.random() * 10);
            setStatus('Rest Mode: Perfect for revision & reading.');
        }
        setEnergy(Math.floor(currentEnergy));
    }, [tob]);
    
    return (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-2 border-amber-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <SunIcon className="h-24 w-24 text-primary" />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <SparklesIcon className="h-3 w-3" /> Solar Focus Sync
                    </span>
                </div>
                
                <h3 className="text-xl font-black text-slate-800 leading-tight">
                    {userName}, आपकी आज की <br/><span className="text-primary font-hindi text-2xl">एकाग्रता शक्ति (Focus Power)</span>
                </h3>
                
                <div className="mt-8 flex items-end gap-5">
                    <div className="flex-1">
                        <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
                            <span>Current Battery</span>
                            <span>{energy}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden shadow-inner border border-slate-200 p-0.5">
                            <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ width: `${energy}%` }}>
                                <div className="w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl animate-bounce-slow border-4 border-white">
                        <BoltIcon className="h-7 w-7"/>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-slate-900 rounded-2xl border-l-4 border-primary shadow-lg">
                    <div className="flex items-start gap-3">
                        <ClockIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs font-hindi text-slate-300 leading-relaxed font-medium">
                            "{status}"
                        </p>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                .animate-shimmer { animation: shimmer 2s infinite; }
            `}</style>
        </div>
    );
};

export default SuryanshuAstroWidget;
