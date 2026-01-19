
import React, { useState } from 'react';
import { UtensilsIcon, StarIcon, TrashIcon } from './icons/AllIcons';
import { useToast } from '../hooks/useToast';

const MessManagement: React.FC = () => {
    const toast = useToast();
    const [rating, setRating] = useState(0);
    const [waste, setWaste] = useState('');
    
    const handleSubmit = () => {
        if (!waste) { toast.error("Enter waste amount."); return; }
        toast.success(`Feedback recorded! Today's waste: ${waste}kg logged.`);
        setRating(0);
        setWaste('');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-soft h-full min-h-[500px]">
            <div className="flex items-center mb-6">
                <UtensilsIcon className="h-8 w-8 text-orange-600" />
                <div className="ml-3">
                    <h2 className="text-2xl font-bold text-neutral-900">Smart Mess & Waste Tracker</h2>
                    <p className="text-sm text-neutral-500 font-hindi">भोजन फीडबैक और बर्बादी ट्रैकर</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                    <h3 className="font-bold text-orange-900 mb-4">Rate Today's Lunch</h3>
                    <div className="flex gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                                <StarIcon className={`h-8 w-8 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-slate-300'}`} />
                            </button>
                        ))}
                    </div>
                    
                    <h3 className="font-bold text-orange-900 mb-2">Log Food Waste (Admin)</h3>
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            value={waste} 
                            onChange={e => setWaste(e.target.value)} 
                            placeholder="Waste in Kg" 
                            className="flex-1 p-2 border rounded-md"
                        />
                        <button onClick={handleSubmit} className="bg-orange-600 text-white px-4 py-2 rounded-md font-bold hover:bg-orange-700">Log</button>
                    </div>
                </div>

                <div className="bg-white border rounded-xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Waste Analysis (This Week)</h3>
                    <div className="flex items-end gap-2 h-40 pb-2 border-b">
                        <div className="w-1/5 bg-green-500 rounded-t" style={{height: '20%'}}></div>
                        <div className="w-1/5 bg-green-500 rounded-t" style={{height: '30%'}}></div>
                        <div className="w-1/5 bg-yellow-500 rounded-t" style={{height: '50%'}}></div>
                        <div className="w-1/5 bg-orange-500 rounded-t" style={{height: '40%'}}></div>
                        <div className="w-1/5 bg-red-500 rounded-t" style={{height: '80%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">High waste on Friday. Action: Revise Friday Menu.</p>
                </div>
            </div>
        </div>
    );
};

export default MessManagement;
