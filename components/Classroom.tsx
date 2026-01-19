
import React, { useState, useCallback, useMemo } from 'react';
import LiveClass from './LiveClass';
import { 
    PlayIcon, BookOpenIcon, VideoCameraIcon,
    BoltIcon, GlobeAltIcon, 
    CalculatorIcon, MapIcon, SignalIcon, LeafIcon,
    PencilSquareIcon, HeartIcon, PaintBrushIcon,
    ScaleIcon, BanknotesIcon, BriefcaseIcon, ChartBarIcon,
    AcademicCapIcon, XCircleIcon
} from './icons/AllIcons';
import { useClassroom } from '../contexts/ClassroomContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getSubjectsForClass } from '../config/classroomData';

const IconMap: { [key: string]: any } = {
    'BookOpenIcon': BookOpenIcon,
    'PencilSquareIcon': PencilSquareIcon,
    'CalculatorIcon': CalculatorIcon,
    'GlobeAltIcon': GlobeAltIcon,
    'HeartIcon': HeartIcon,
    'PaintBrushIcon': PaintBrushIcon,
    'MapIcon': MapIcon,
    'BoltIcon': BoltIcon,
    'LeafIcon': LeafIcon,
    'ScaleIcon': ScaleIcon,
    'BanknotesIcon': BanknotesIcon,
    'BriefcaseIcon': BriefcaseIcon,
    'ChartBarIcon': ChartBarIcon,
    'AcademicCapIcon': AcademicCapIcon
};

const Classroom: React.FC = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const { selectedClass, subject, setSubject } = useClassroom();
    const { selectedLanguage } = useLanguage();
    const [topic, setTopic] = useState('');
    
    const dynamicSubjects = useMemo(() => getSubjectsForClass(selectedClass), [selectedClass]);

    const visualAidPromptGenerator = useCallback((text: string) => {
        return `Clear educational diagram for ${selectedClass} student about "${text.substring(0, 200)}". Text labels in English.`;
    }, [selectedClass]);

    const systemInstruction = `
        आप एक लाइव AI शिक्षक हैं। 
        आपकी भाषा (Dialect): **${selectedLanguage.nativeName}**।
        
        शिक्षण नीति: 
        1. पूरी तरह से **${selectedLanguage.nativeName}** में पढ़ाएं। अगर भाषा हरियाणवी है, तो उसी प्यार और देसीपन के साथ बात करें।
        2. मानकर चलें कि छात्र के साथ उसके कम पढ़े-लिखे माता-पिता भी बैठे हैं, इसलिए उदाहरण बहुत ही सरल और असली जीवन के दें।
        3. 'Hinglish' का संतुलित प्रयोग करें।
        4. विषय: ${subject}, कक्षा: ${selectedClass}।
        5. टॉपिक: "${topic || 'General Introduction'}"।
    `;

    if (isSessionActive) {
        return (
            <div className="h-screen w-full bg-slate-950 fixed inset-0 z-[100] animate-pop-in">
                <LiveClass 
                    systemInstruction={systemInstruction}
                    onEnd={() => setIsSessionActive(false)}
                    sessionTitle={`${subject} Live Class`}
                    visualAidPromptGenerator={visualAidPromptGenerator}
                />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-10 h-full bg-slate-900 text-white rounded-[3.5rem] overflow-y-auto custom-scrollbar relative">
            <div className="max-w-5xl mx-auto space-y-12 relative z-10">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                        <SignalIcon className="h-5 w-5 text-red-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Live AI Studio</span>
                    </div>
                    <h2 className="text-5xl sm:text-7xl font-black tracking-tighter">
                        AI <span className="text-primary">Classroom</span>
                    </h2>
                    <p className="text-xl text-slate-400 font-hindi">
                        भाषा: **${selectedLanguage.nativeName}** में सीधा संवाद।
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl shadow-2xl">
                        <div className="space-y-8">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">विषय चुनें (Select Subject)</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {dynamicSubjects.map(s => {
                                        const IconComponent = IconMap[s.icon] || BookOpenIcon;
                                        return (
                                            <button 
                                                key={s.name}
                                                onClick={() => setSubject(s.name)}
                                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${subject === s.name ? 'border-primary bg-primary/20 shadow-lg' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                                            >
                                                <div className={`${subject === s.name ? 'text-primary' : 'text-slate-500'}`}><IconComponent className="h-6 w-6"/></div>
                                                <span className="text-[9px] font-black uppercase text-center leading-tight">{s.hindi}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">आज क्या पढ़ना है?</label>
                                <input 
                                    type="text" 
                                    value={topic}
                                    onChange={e => setTopic(e.target.value)}
                                    placeholder="जैसे: सौरमंडल, या गुणा करना..."
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 font-hindi font-bold focus:border-primary outline-none"
                                />
                            </div>

                            <button 
                                onClick={() => setIsSessionActive(true)}
                                className="w-full py-6 bg-primary text-white font-black rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-xl"
                            >
                                <PlayIcon className="h-8 w-8 inline mr-2" /> क्लास शुरू करें
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex-1 bg-slate-900/50 rounded-[3rem] border border-white/5 p-8 flex flex-col justify-center text-center">
                            <h4 className="text-xl font-black mb-2 text-indigo-400">Native Mode On</h4>
                            <p className="text-sm text-slate-500 font-hindi">AI सार्थी आपकी अपनी भाषा **${selectedLanguage.nativeName}** में सिखाने के लिए तैयार है।</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Classroom;
