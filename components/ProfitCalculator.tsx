
import React, { useState, useMemo } from 'react';
import { CalculatorIcon, CurrencyRupeeIcon, ChartBarIcon, ArrowTrendingUpIcon, SparklesIcon, BuildingOfficeIcon } from './icons/AllIcons';

const ProfitCalculator: React.FC = () => {
    const [studentCount, setStudentCount] = useState(200);
    const [avgFee, setAvgFee] = useState(1500);
    const [staffCount, setStaffCount] = useState(2); // With AI, we need very few staff

    const calculations = useMemo(() => {
        const monthlyRevenue = studentCount * avgFee;
        const franchiseFeePercent = 0.10; // Mock 10%
        const aiCost = 5000; // Flat monthly AI license
        const staffSalary = staffCount * 12000;
        const totalExpenses = (monthlyRevenue * franchiseFeePercent) + aiCost + staffSalary + 10000; // + rent/bills
        const netProfit = monthlyRevenue - totalExpenses;
        const profitMargin = (netProfit / monthlyRevenue) * 100;

        return { monthlyRevenue, totalExpenses, netProfit, profitMargin };
    }, [studentCount, avgFee, staffCount]);

    return (
        <div className="bg-white p-6 rounded-3xl shadow-soft h-full flex flex-col animate-pop-in">
            <div className="flex items-center gap-3 mb-8 border-b pb-6">
                <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                    <CalculatorIcon className="h-8 w-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">ROI & Profit Calculator</h2>
                    <p className="text-sm text-slate-500 font-hindi">अपनी फ्रेंचाइजी के लाभ का अनुमान लगाएं</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <BuildingOfficeIcon className="h-5 w-5 text-primary"/> Input Parameters
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Number of Students</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" min="50" max="1000" step="10" value={studentCount} onChange={e => setStudentCount(Number(e.target.value))} className="flex-1 accent-primary" />
                                    <span className="w-16 text-center font-black text-primary">{studentCount}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Avg. Monthly Fee (₹)</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" min="500" max="10000" step="100" value={avgFee} onChange={e => setAvgFee(Number(e.target.value))} className="flex-1 accent-green-600" />
                                    <span className="w-20 text-center font-black text-green-600">{avgFee}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Required Staff (Clerks/Admins)</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" min="0" max="10" step="1" value={staffCount} onChange={e => setStaffCount(Number(e.target.value))} className="flex-1 accent-orange-500" />
                                    <span className="w-16 text-center font-black text-orange-500">{staffCount}</span>
                                </div>
                                <p className="text-[10px] text-orange-600 font-bold mt-2 uppercase tracking-tighter">* AI handles 90% of tasks, reducing staff needs.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 flex gap-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm"><SparklesIcon className="h-6 w-6 text-primary"/></div>
                        <p className="text-sm font-hindi text-primary-dark leading-relaxed font-medium">
                            "AI ऑटोमेशन से आप क्लर्क और एडमिन स्टाफ का खर्चा 80% तक कम कर सकते हैं, जिससे आपका शुद्ध मुनाफा (Net Profit) बढ़ जाता है।"
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Revenue</p>
                             <p className="text-3xl font-black">₹{calculations.monthlyRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-white border-2 border-slate-100 p-6 rounded-3xl shadow-sm">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Expenses</p>
                             <p className="text-3xl font-black text-red-500">₹{calculations.totalExpenses.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-8 rounded-[2.5rem] text-white shadow-2xl relative">
                        <div className="absolute top-4 right-6 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Calculated Net Profit</div>
                        <p className="text-sm font-bold opacity-80 font-hindi mb-2">आपका मासिक शुद्ध लाभ</p>
                        <h4 className="text-6xl font-black tracking-tighter">₹{calculations.netProfit.toLocaleString()}</h4>
                        
                        <div className="mt-8 pt-6 border-t border-white/20 flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-bold uppercase opacity-60 mb-1">Profit Margin</p>
                                <p className="text-xl font-black">{calculations.profitMargin.toFixed(1)}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase opacity-60 mb-1">Annual Take Home</p>
                                <p className="text-xl font-black">₹{(calculations.netProfit * 12).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <ChartBarIcon className="h-6 w-6 text-primary"/>
                             <span className="text-sm font-bold text-slate-600">Break-even Period: <span className="text-slate-900">~ 4 Months</span></span>
                         </div>
                         <button className="text-xs font-black text-primary hover:underline">Full Report PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfitCalculator;
