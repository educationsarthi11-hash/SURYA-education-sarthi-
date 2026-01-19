
import React, { useEffect, useState } from 'react';
import { MicrophoneIcon, SparklesIcon } from './icons/AllIcons';
import { useSpeech } from '../hooks/useSpeech';
import { ServiceName } from '../types';

interface VoiceNavigationProps {
    onNavigate: (service: ServiceName | 'overview') => void;
}

const VoiceNavigation: React.FC<VoiceNavigationProps> = ({ onNavigate }) => {
    const [isActive, setIsActive] = useState(false);
    const { isListening, speechInput, toggleListening, setSpeechInput } = useSpeech({ enableSpeechRecognition: true });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (speechInput) {
            const cmd = speechInput.toLowerCase();
            setFeedback(`Heard: "${speechInput}"`);
            
            // Simple keyword mapping for Indian context
            if (cmd.includes('dashboard') || cmd.includes('home') || cmd.includes('घर')) {
                onNavigate('overview');
                setFeedback('Navigating to Dashboard...');
            } else if (cmd.includes('exam') || cmd.includes('test') || cmd.includes('परीक्षा')) {
                onNavigate('Online Exam');
                setFeedback('Opening Exams...');
            } else if (cmd.includes('result') || cmd.includes('marks') || cmd.includes('नतीजे')) {
                onNavigate('Exam Result Portal');
                setFeedback('Checking Results...');
            } else if (cmd.includes('quiz') || cmd.includes('game') || cmd.includes('battle')) {
                onNavigate('Quiz Arena');
                setFeedback('Entering Quiz Arena...');
            } else if (cmd.includes('video') || cmd.includes('create') || cmd.includes('वीडियो')) {
                onNavigate('AI Video Generator');
            } else if (cmd.includes('lab') || cmd.includes('प्रयोगशाला')) {
                onNavigate('AI Virtual Lab');
            }

            // Clear input buffer after processing
            setTimeout(() => {
                setSpeechInput('');
                if (!isListening) setFeedback('');
            }, 2000);
        }
    }, [speechInput, onNavigate, isListening, setSpeechInput]);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start no-print">
            {feedback && (
                <div className="mb-2 ml-1 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg animate-fade-in-up backdrop-blur-md bg-opacity-90 border border-white/10">
                    {feedback}
                </div>
            )}
            
            <button
                onClick={toggleListening}
                className={`group flex items-center justify-center h-14 w-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:scale-110 border-4 border-white ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-br from-indigo-600 to-blue-500'}`}
                title="Sarthi Voice Control"
            >
                {isListening ? (
                    <div className="flex gap-1 h-4 items-center">
                        <div className="w-1 h-full bg-white rounded-full animate-wave"></div>
                        <div className="w-1 h-2/3 bg-white rounded-full animate-wave delay-75"></div>
                        <div className="w-1 h-full bg-white rounded-full animate-wave delay-150"></div>
                    </div>
                ) : (
                    <MicrophoneIcon className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                )}
            </button>
        </div>
    );
};

export default VoiceNavigation;
