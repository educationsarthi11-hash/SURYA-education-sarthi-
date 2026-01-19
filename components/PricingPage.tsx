
import React, { useState } from 'react';
import { CheckCircleIcon, SparklesIcon, GlobeAltIcon, BuildingOfficeIcon, LeafIcon } from './icons/AllIcons';

const ruralPlans = [
    { 
        name: 'गांव सार्थी (Nursery-5)', 
        price: '49', 
        features: [
            '7 दिन फ्री ट्रायल', 
            'AI कविताएं और कहानियां', 
            'बेसिक गणित (बोलकर)', 
            'मुफ्त एग्रीकल्चर लैब (किसानों के लिए)', // विशेष ग्रामीण फीचर
        ], 
        specialFeature: "FREE Agriculture AI for Farmers",
        color: 'border-green-200 bg-green-50/50' 
    },
    { 
        name: 'गांव विद्वान (6-12)', 
        price: '99', 
        features: [
            '7 दिन फ्री ट्रायल', 
            'AI सार्थी गुरु (पूरी किताब)', 
            'बोर्ड परीक्षा की तैयारी', 
            'मुफ्त एग्रीकल्चर लैब (लाइफ टाइम)', // विशेष ग्रामीण फीचर
        ], 
        specialFeature: "FREE Agriculture AI for Farmers",
        recommended: true,
        color: 'border-blue-200 bg-blue-50/50' 
    },
];

const urbanPlans = [
    { name: 'Metro Junior (Nursery-5)', price: '149', features: ['7 Days Trial', 'Premium AI Storyteller', 'English Speaking Lab', 'Visual 3D Learning'], color: 'border-orange-200 bg-orange-50/50' },
    { name: 'Metro Elite (6-12)', price: '299', features: ['7 Days Trial', 'AI Advance Coach', 'Mock Competitive Tests', 'Career Path Predictor'], color: 'border-purple-200 bg-purple-50/50', recommended: true },
];

const PricingPage: React.FC = () => {
    const [locationMode, setLocationMode] = useState<'Rural' | 'Urban'>('Rural');
    const activePlans = locationMode === 'Rural' ? ruralPlans : urbanPlans;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-soft font-sans animate-pop-in">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase mb-4">
                    <SparklesIcon className="h-4 w-4"/> विशेष ऑफर: ग्रामीण क्षेत्रों के लिए भारी छूट
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-2">अपनी लोकेशन चुनें</h2>
                <p className="text-slate-500 font-hindi mb-8">ग्रामीण क्षेत्रों में किसानों के लिए हमारी सेवा मुफ्त और रियायती है।</p>
                
                {/* Location Toggle */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto border-2 border-slate-200 shadow-inner">
                    <button 
                        onClick={() => setLocationMode('Rural')}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${locationMode === 'Rural' ? 'bg-white text-green-600 shadow-md' : 'text-slate-500'}`}
                    >
                        <GlobeAltIcon className="h-5 w-5"/> गांव (Rural)
                    </button>
                    <button 
                        onClick={() => setLocationMode('Urban')}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${locationMode === 'Urban' ? 'bg-white text-orange-600 shadow-md' : 'text-slate-500'}`}
                    >
                        <BuildingOfficeIcon className="h-5 w-5"/> शहर (Metro)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {activePlans.map((plan, index) => (
                    <div key={index} className={`relative p-8 rounded-3xl border-2 transition-all hover:shadow-2xl flex flex-col ${plan.color} ${plan.recommended ? 'scale-105 border-primary shadow-xl ring-4 ring-primary/5' : 'border-slate-100'}`}>
                        {plan.recommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                                Best Value
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-slate-800 mb-2 font-hindi">{plan.name}</h3>
                        <div className="mb-4">
                            <span className="text-5xl font-black text-slate-900">₹{plan.price}</span>
                            <span className="text-slate-500 font-bold ml-1">/ महीना</span>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-grow mt-4">
                            {plan.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-bold font-hindi">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500"/> {f}
                                </li>
                            ))}
                        </ul>

                        {locationMode === 'Rural' && (
                            <div className="mb-6 p-3 bg-green-500 text-white rounded-xl flex items-center gap-3 animate-pulse">
                                <LeafIcon className="h-5 w-5" />
                                <span className="text-xs font-black uppercase tracking-tighter">मुफ्त एग्रीकल्चर AI शामिल है</span>
                            </div>
                        )}

                        <button className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${plan.recommended ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-slate-800 border-2 border-slate-200'}`}>
                            अभी शुरू करें
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 bg-slate-900 p-8 rounded-3xl text-white text-center">
                <h3 className="text-xl font-bold mb-2">क्या आप एक किसान हैं?</h3>
                <p className="text-slate-400 font-hindi mb-6 text-sm">ग्रामीण क्षेत्रों में खेती के सुझावों के लिए आपको कोई पैसा नहीं देना होगा।</p>
                <button className="bg-white text-slate-900 px-10 py-3 rounded-xl font-black text-sm hover:bg-slate-100">
                    अपना किसान कार्ड स्कैन करें
                </button>
            </div>
        </div>
    );
};

export default PricingPage;
