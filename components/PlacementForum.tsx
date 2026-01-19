
import React, { useState, useEffect } from 'react';
import { User, UserRole, JobOpening } from '../types';
import { placementService } from '../services/placementService';
import { 
    BriefcaseIcon, PlusIcon, SparklesIcon, 
    ArrowRightIcon, ShieldCheckIcon, MapPinIcon,
    PaperAirplaneIcon, XCircleIcon
} from './icons/AllIcons';
import { useToast } from '../hooks/useToast';
import Loader from './Loader';

const PlacementForum: React.FC<{ user: User }> = ({ user }) => {
    const toast = useToast();
    const [view, setView] = useState<'list' | 'post'>('list');
    const [jobs, setJobs] = useState<JobOpening[]>([]);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        const update = () => setJobs(placementService.getJobOpenings());
        update();
        return placementService.subscribe(update);
    }, []);

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // सुरक्षा जांच: अगर कंपनी एडमिन से वेरिफाइड नहीं है
        if (user.role === UserRole.Company && !user.isVerified) {
            toast.error("आपका अकाउंट अभी 'Pending Verification' में है। एडमिन की मंजूरी के बाद ही आप पोस्ट कर पाएंगे।");
            return;
        }

        setLoading(true);
        const newJob: JobOpening = {
            id: `JOB-${Date.now()}`,
            companyId: user.id,
            companyName: user.name,
            jobTitle: title,
            location,
            description: desc,
            postedDate: new Date().toISOString(),
            isApproved: true // Default true for demo, but placementService logic will override
        };

        try {
            await placementService.postJobOpening(newJob);
            toast.success("नौकरी का विज्ञापन पब्लिश हो गया है!");
            setView('list');
        } catch (error: any) {
            toast.error(error.message || "पोस्ट करने में समस्या आई।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-pop-in">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-slate-950 flex items-center gap-3">
                        <BriefcaseIcon className="h-8 w-8 text-primary"/> रोजगार संगम
                    </h2>
                    <p className="text-slate-500 font-hindi mt-1">सुरक्षित और असली नौकरियों का प्लेटफॉर्म</p>
                </div>
                {user.role === UserRole.Company && (
                    <button 
                        onClick={() => setView(view === 'list' ? 'post' : 'list')}
                        className="px-6 py-3 bg-primary text-white font-black rounded-xl shadow-lg flex items-center gap-2"
                    >
                        {view === 'list' ? <><PlusIcon className="h-5 w-5"/> पोस्ट नई वैकेंसी</> : 'वापस'}
                    </button>
                )}
            </div>

            {view === 'post' ? (
                <div className="max-w-2xl mx-auto space-y-6">
                    {!user.isVerified && (
                        <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-3xl flex gap-4">
                            <ShieldCheckIcon className="h-8 w-8 text-orange-600 shrink-0"/>
                            <div>
                                <h4 className="font-bold text-orange-900">Verification Pending</h4>
                                <p className="text-sm text-orange-700 font-hindi">Network Marketing और फ्रॉड को रोकने के लिए, हमारी टीम आपकी कंपनी की जांच कर रही है। इसमें 24 घंटे लग सकते हैं।</p>
                            </div>
                        </div>
                    )}

                    <div className={`bg-white p-10 rounded-[3rem] border-4 border-slate-50 shadow-2xl ${!user.isVerified ? 'opacity-50 pointer-events-none' : ''}`}>
                        <h3 className="text-2xl font-black mb-8 font-hindi text-center">नौकरी की जानकारी</h3>
                        <form onSubmit={handlePost} className="space-y-6">
                            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Job Title" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold" required />
                            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold" required />
                            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} placeholder="Description (AI इसे MLM के लिए स्कैन करेगा)" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold" required />
                            <button type="submit" disabled={loading} className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-3">
                                {loading ? <Loader message="AI Scanning..." /> : 'पब्लिश करें'}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-2 right-2 bg-green-50 text-green-700 px-2 py-1 rounded-full text-[8px] font-black uppercase flex items-center gap-1">
                                <ShieldCheckIcon className="h-3 w-3"/> AI Verified
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">{job.jobTitle}</h3>
                                <p className="text-sm font-bold text-primary mb-4">{job.companyName}</p>
                                <p className="text-sm text-slate-600 font-hindi line-clamp-3 mb-6 italic">"{job.description}"</p>
                            </div>
                            <button onClick={() => placementService.applyForJob(user.id, job.id)} className="w-full py-4 bg-slate-950 text-white font-black rounded-2xl hover:bg-primary transition-all">अप्लाई करें</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlacementForum;
