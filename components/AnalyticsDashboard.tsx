
import React from 'react';
import { ChartBarIcon, SparklesIcon, ArrowTrendingUpIcon, CurrencyRupeeIcon, UsersIcon } from './icons/AllIcons';

// --- Reusable Components defined inside for simplicity ---

const Stat: React.FC<{ title: string; value: string; change?: string; icon: React.ReactNode; changeColor?: string }> = ({ title, value, change, icon, changeColor }) => (
    <div className="bg-white p-5 rounded-xl shadow-soft border">
        <div className="flex items-center mb-2">
            <div className="p-3 bg-slate-100 rounded-full">{icon}</div>
        </div>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
        {change && <p className={`text-sm font-semibold mt-2 ${changeColor}`}>{change}</p>}
    </div>
);

const BarChart: React.FC<{ data: { label: string; value: number; color: string }[]; title: string; unit?: string }> = ({ data, title, unit = '' }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="bg-white p-6 rounded-xl shadow-soft border h-full">
            <h4 className="font-bold text-lg text-slate-800 mb-4">{title}</h4>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.label} className="grid grid-cols-8 gap-4 items-center">
                        <span className="col-span-2 text-sm font-medium text-slate-600 truncate">{item.label}</span>
                        <div className="col-span-5 flex items-center">
                            <div className="w-full bg-slate-200 rounded-full h-4 relative">
                                <div
                                    className={`${item.color} h-4 rounded-full transition-all duration-500 ease-out`}
                                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                                />
                            </div>
                        </div>
                        <span className="col-span-1 text-sm font-bold text-right text-slate-700">{unit}{item.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LineChart: React.FC<{ data: { label: string; value: number }[]; title: string }> = ({ data, title }) => {
    const width = 500;
    const height = 200;
    const padding = 40;
    const maxValue = 100; // Assuming performance is %
    const minValue = 60;

    const points = data.map((point, i) => {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = height - padding - ((point.value - minValue) / (maxValue - minValue)) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-white p-6 rounded-xl shadow-soft border">
            <h4 className="font-bold text-lg text-slate-800 mb-4">{title}</h4>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Y-axis labels */}
                <text x="10" y={height - padding + 5} fontSize="10" fill="#94a3b8"> {minValue}% </text>
                <text x="10" y={padding} fontSize="10" fill="#94a3b8"> {maxValue}% </text>
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" />
                
                {/* Line */}
                <polyline fill="none" stroke="var(--tw-color-primary)" strokeWidth="2" points={points} />

                {/* Points and X-axis labels */}
                {data.map((point, i) => {
                    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
                    const y = height - padding - ((point.value - minValue) / (maxValue - minValue)) * (height - 2 * padding);
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="4" fill="var(--tw-color-primary)" />
                            <text x={x} y={height - padding + 20} textAnchor="middle" fontSize="10" fill="#94a3b8">{point.label}</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};


// --- Main Component ---
const AnalyticsDashboard: React.FC = () => {
    
    // Mock Data
    const toolUsageData = [
      { label: 'Test Paper Guru', value: 820, color: 'bg-primary' },
      { label: 'Video Generator', value: 650, color: 'bg-sky-500' },
      { label: 'Online Exam', value: 450, color: 'bg-amber-400' },
      { label: 'Placement Forum', value: 310, color: 'bg-secondary' },
      { label: 'AI Tutor', value: 250, color: 'bg-red-400' },
    ];

    const performanceData = [
      { label: 'Jan', value: 72 }, { label: 'Feb', value: 75 }, { label: 'Mar', value: 74 },
      { label: 'Apr', value: 78 }, { label: 'May', value: 82 }, { label: 'Jun', value: 85 },
    ];

    const revenueData = [
        { label: 'January', value: 120000, color: 'bg-green-400' },
        { label: 'February', value: 110000, color: 'bg-green-400' },
        { label: 'March', value: 150000, color: 'bg-green-400' },
        { label: 'April', value: 130000, color: 'bg-green-400' },
        { label: 'May', value: 160000, color: 'bg-green-400' },
        { label: 'June', value: 180000, color: 'bg-green-400' },
    ];


    return (
        <div className="space-y-8 animate-pop-in">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h2>
                <p className="mt-1 text-md text-slate-500 font-hindi">संस्था के प्रदर्शन का समग्र दृष्टिकोण</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Stat title="Total Users" value="1,335" change="+12% this month" icon={<UsersIcon className="h-6 w-6 text-primary"/>} changeColor="text-green-600"/>
                <Stat title="Avg. Performance" value="85.3%" change="+2.1% this month" icon={<ArrowTrendingUpIcon className="h-6 w-6 text-green-600"/>} changeColor="text-green-600"/>
                <Stat title="Revenue (This Month)" value="₹1.8L" change="+15% vs last month" icon={<CurrencyRupeeIcon className="h-6 w-6 text-amber-600"/>} changeColor="text-green-600"/>
                <Stat title="Most Active Tool" value="Test Paper Guru" icon={<SparklesIcon className="h-6 w-6 text-sky-600"/>} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BarChart data={toolUsageData} title="AI Tool Usage (Interactions)" />
                <LineChart data={performanceData} title="Student Performance Trend (Avg. Score %)" />
                <div className="lg:col-span-2">
                    <BarChart data={revenueData} title="Monthly Revenue Collection" unit="₹"/>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
