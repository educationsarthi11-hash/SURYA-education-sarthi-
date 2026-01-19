import React, { useState } from 'react';
import { Franchise } from '../types';
import { franchiseService } from '../services/franchiseService';
import { BuildingOfficeIcon, UsersIcon, CurrencyRupeeIcon, ArrowRightIcon } from './icons/AllIcons';

interface FranchiseOverviewProps {
  onManage: (franchise: Franchise) => void;
}

const FranchiseCard: React.FC<{ franchise: Franchise, onManage: () => void }> = ({ franchise, onManage }) => (
    <div className="bg-white p-5 rounded-xl shadow-soft flex flex-col h-full hover:shadow-lifted hover:-translate-y-1 transition-all">
        <div className="flex items-start gap-4">
            <div className="text-primary bg-primary/10 p-3 rounded-lg mt-1">
                <BuildingOfficeIcon className="h-6 w-6" />
            </div>
            <div>
                <h4 className="text-lg font-bold text-neutral-800">{franchise.name}</h4>
                <p className="text-sm font-medium text-neutral-500">{franchise.type}</p>
            </div>
        </div>
        <div className="flex-grow mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
                <UsersIcon className="h-5 w-5 text-neutral-400"/>
                <span className="font-semibold">{franchise.studentCount.toLocaleString()}</span> Students
            </div>
             <div className="flex items-center gap-2 text-sm">
                <CurrencyRupeeIcon className="h-5 w-5 text-neutral-400"/>
                <span className="font-semibold">₹{franchise.revenue.toLocaleString()}</span> Annual Revenue
            </div>
        </div>
        <button
            onClick={onManage}
            className="w-full mt-4 text-sm font-semibold text-primary hover:text-primary-dark flex items-center justify-center p-2 bg-primary/10 rounded-md transition-colors"
        >
            Manage Franchise <ArrowRightIcon className="h-4 w-4 ml-1" />
        </button>
    </div>
);


const FranchiseOverview: React.FC<FranchiseOverviewProps> = ({ onManage }) => {
    const [franchises] = useState<Franchise[]>(franchiseService.getFranchises());
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFranchises = franchises.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-pop-in">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Franchise Management Hub</h2>
            <p className="text-md text-slate-500 mb-6 font-hindi">
                सभी फ्रैंचाइज़ी संस्थानों का प्रबंधन और निगरानी करें।
            </p>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search franchises by name or type..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full max-w-lg p-3 border rounded-lg shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFranchises.map(franchise => (
                    <FranchiseCard 
                        key={franchise.id} 
                        franchise={franchise} 
                        onManage={() => onManage(franchise)}
                    />
                ))}
            </div>
             {filteredFranchises.length === 0 && (
                <div className="text-center py-16 text-neutral-500 md:col-span-3">
                    <p>No franchises found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default FranchiseOverview;
