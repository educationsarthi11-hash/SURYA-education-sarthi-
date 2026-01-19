
import { useState, useRef, useCallback, useEffect } from 'react';
import { generateSpeech, getOutputAudioContext } from '../services/geminiService';
import { useToast } from './useToast';

// Fixed: Add global Window type declarations for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface UseSpeechOptions {
    initialVoice?: 'Kore' | 'Puck' | 'Zephyr' | 'Charon' | 'Fenrir';
    initialLanguage?: string;
    enableSpeechRecognition?: boolean;
    languageCodes?: { [key: string]: string };
}

const defaultLanguageCodes: { [key: string]: string } = {
    'English': 'en-US', 'Hindi': 'hi-IN', 'Bengali': 'bn-IN', 'Marathi': 'mr-IN',
    'Telugu': 'te-IN', 'Tamil': 'ta-IN', 'Gujarati': 'gu-IN', 'Urdu': 'ur-IN',
    'Kannada': 'kn-IN', 'Odia': 'or-IN', 'Malayalam': 'ml-IN', 'Punjabi': 'pa-IN',
};

export const useSpeech = (options?: UseSpeechOptions) => {
    const {
        initialVoice = 'Puck',
        initialLanguage = 'English',
        enableSpeechRecognition = false,
        languageCodes = defaultLanguageCodes,
    } = options || {};

    const toast = useToast();
    const [selectedVoice, setSelectedVoice] = useState<'Kore' | 'Puck' | 'Zephyr' | 'Charon' | 'Fenrir'>(initialVoice);
    const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);

    const currentAudioSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const [playingMessageIndex, setPlayingMessageIndex] = useState<number | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Speech Recognition
    const recognitionRef = useRef<any>(null);
    const [isListening, setIsListening] = useState(false);
    const [speechInput, setSpeechInput] = useState('');

    const stopAudio = useCallback(() => {
        if (currentAudioSourceRef.current) {
            try {
                currentAudioSourceRef.current.stop();
            } catch (e) {
                // Ignore errors if already stopped
            }
            currentAudioSourceRef.current = null;
        }
        setPlayingMessageIndex(null);
        setIsSpeaking(false);
    }, []);

    const playAudio = useCallback(async (text: string, index: number, voice?: 'Kore' | 'Puck' | 'Zephyr' | 'Charon' | 'Fenrir', promptWrapper?: (text: string) => string) => {
        const plainText = text.replace(/<[^>]*>/g, '');
        if (!plainText) return;

        if (playingMessageIndex === index) {
            stopAudio();
            return;
        }
        stopAudio();

        const ctx = getOutputAudioContext();

        // Attempt to resume context if it was suspended
        if (ctx.state === 'suspended') {
            try {
                await ctx.resume();
            } catch (e) {
                console.error("Could not resume audio context", e);
            }
        }

        setPlayingMessageIndex(index);
        setIsSpeaking(true);
        try {
            // Fixed: generateSpeech call
            const newSource = await generateSpeech(plainText, voice || selectedVoice, promptWrapper);
            currentAudioSourceRef.current = newSource;
            newSource.onended = () => {
                setPlayingMessageIndex(null);
                currentAudioSourceRef.current = null;
                setIsSpeaking(false);
            };
        } catch (error) {
            console.error("Failed to play audio:", error);
            setPlayingMessageIndex(null);
            setIsSpeaking(false);
        }
    }, [playingMessageIndex, selectedVoice, stopAudio]);

    useEffect(() => {
        return () => stopAudio();
    }, [stopAudio]);

    useEffect(() => {
        if (!enableSpeechRecognition) return;
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            if (!recognitionRef.current) { // Show warning only once
                 console.warn("Speech recognition is not supported in this browser.");
            }
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false; // Stop after a pause
        recognition.interimResults = true; // Show results as you speak
        recognition.lang = languageCodes[currentLanguage] || 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
            if (event.error !== 'no-speech') {
                console.error(`Speech recognition error: ${event.error}`);
            }
            setIsListening(false);
        };
        
        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setSpeechInput(finalTranscript || interimTranscript);
        };
        
        recognitionRef.current = recognition;

    }, [enableSpeechRecognition, toast, currentLanguage, languageCodes]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setSpeechInput('');
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Failed to start recognition", e);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                 console.error("Failed to stop recognition", e);
            }
        }
    }, [isListening]);

    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    return {
        selectedVoice,
        setSelectedVoice,
        currentLanguage,
        setCurrentLanguage,
        playAudio,
        stopAudio,
        playingMessageIndex,
        isSpeaking,
        setIsSpeaking,
        isListening,
        speechInput,
        setSpeechInput,
        startListening,
        stopListening,
        toggleListening,
    };
};
