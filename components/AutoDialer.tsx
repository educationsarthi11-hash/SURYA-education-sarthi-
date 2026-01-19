
import React, { useState } from 'react';
import { PhoneIcon, PlayIcon, StopCircleIcon, SpeakerWaveIcon, ShieldCheckIcon } from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import Loader from './Loader';

const AutoDialer: React.FC = () => {
    const toast = useToast();
    const [isActive, setIsActive] = useState(false);
    const [currentName, setCurrentName] = useState('आरव शर्मा');
    const [status, setStatus] = useState('Idle');

    const startCampaign = () => {
        setIsActive(true);
        setStatus('Dialing +91 98765 4XXXX...');
        setTimeout(() => {
            setStatus('Call Connected. AI speaking in Haryanvi...');
            toast.info("AI कॉल कनेक्ट हो गया है।");
        }, 2000);
        setTimeout(() => {
            setStatus('Call Completed Successfully.');
            toast.success("फीस रिमाइंडर भेज दिया गया।");
            setIsActive(false);
        }, 7000);
    };

    return (
        <div className="bg-white p-8 rounded-[3rem] shadow-soft h-full flex flex-col animate-pop-in border border-slate-100">
            <div className="flex items-center gap-4 mb-10 border-b pb-6">
                <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-xl"><PhoneIcon className="h-8 w-8" /></div>
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">AI Auto-Dialer</h2>
                    <p className="text-sm text-slate-500 font-hindi">स्वचालित फीस रिकवरी सिस्टम (Voice AI Recovery)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-inner">
                        <h3 className="font-black text-slate-800 mb-6 flex items-center gap-3"><ShieldCheckIcon className="h-6 w-6 text-green-600"/> Campaign Details</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500 text-sm font-bold">Target List:</span>
                                <span className="text-slate-800 font-black">Fee Defaulters (AUG)</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500 text-sm font-bold">Total Calls:</span>
                                <span className="text-slate-800 font-black">12 Students</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 text-sm font-bold">AI Language:</span>
                                <span className="text-orange-600 font-black">Theth Haryanvi</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={startCampaign} 
                        disabled={isActive}
                        className="w-full py-6 bg-slate-950 text-white font-black rounded-3xl shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95 flex items-center justify-center gap-4 text-xl"
                    >
                        {isActive ? <Loader message="" /> : <><PlayIcon className="h-8 w-8"/> START RECOVERY</>}
                    </button>
                </div>

                <div className={`p-10 rounded-[3rem] border-4 flex flex-col items-center justify-center text-center transition-all duration-500 ${isActive ? 'bg-slate-900 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.2)]' : 'bg-slate-50 border-slate-100'}`}>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ${isActive ? 'bg-blue-600 animate-ping' : 'bg-white text-slate-300'}`}>
                        <SpeakerWaveIcon className="h-12 w-12" />
                    </div>
                    <h4 className={`text-2xl font-black mb-2 ${isActive ? 'text-white' : 'text-slate-400'}`}>{isActive ? currentName : 'No Active Call'}</h4>
                    <p className={`font-mono text-sm font-bold uppercase tracking-widest ${isActive ? 'text-blue-400 animate-pulse' : 'text-slate-300'}`}>{status}</p>
                </div>
            </div>
        </div>
    );
};

export default AutoDialer;
