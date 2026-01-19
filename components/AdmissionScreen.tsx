

import React from 'react';
import AdmissionForm from './AdmissionForm';
import { ArrowLeftIcon, EduSarthiLogo } from './icons/AllIcons';

interface AdmissionScreenProps {
  onBack: () => void;
}

const AdmissionScreen: React.FC<AdmissionScreenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-neutral-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-soft">
            <EduSarthiLogo className="h-16" />
            <button 
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md shadow-sm text-neutral-700 bg-white hover:bg-neutral-50"
            >
            <ArrowLeftIcon className="h-5 w-5 mr-2 text-neutral-500" />
            Back to Login
            </button>
        </header>
        <main>
          <AdmissionForm />
        </main>
      </div>
    </div>
  );
};

export default AdmissionScreen;