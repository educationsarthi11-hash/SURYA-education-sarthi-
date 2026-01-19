
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";
import { Institution, TimetableConstraints, Timetable, SarkariJob, Scholarship, User, Transcript, Exam, LearningPath, LearningPathStatus } from "../types";

// Fix: Initializing GoogleGenAI client with API key from environment variable
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Exporting generateText helper used in multiple components
export const generateText = async (prompt: string, model: string = 'gemini-3-flash-preview'): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text || "";
};

// NEW: Sentiment Analysis for Auto-Dialer
export const analyzeSentiment = async (transcript: string): Promise<{ sentiment: string, urgent: boolean }> => {
    const ai = getAI();
    const prompt = `Analyze parent sentiment from this transcript: "${transcript}". 
    Identify if they are Angry, Sad, Neutral, or Happy. 
    Return JSON: {"sentiment": "string", "urgent": boolean}`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{"sentiment": "Neutral", "urgent": false}');
};

// NEW: Market Gap Analysis for Career Predictor
export const analyzeMarketGap = async (career: string): Promise<{ trend: string, demand: string }> => {
    const ai = getAI();
    const prompt = `Perform a job market trend analysis for the role of "${career}" in India for 2025-2030. 
    Explain in 2 simple Hindi sentences. Return JSON: {"trend": "description", "demand": "High/Low"}`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{"trend": "N/A", "demand": "N/A"}');
};

// Existing exported functions...
export const generateTextWithFile = async (prompt: string, file: File, model: string = 'gemini-3-flash-preview'): Promise<string> => {
    const ai = getAI();
    const base64Data = await fileToBase64(file);
    const response = await ai.models.generateContent({
        model,
        contents: {
            parts: [
                { text: prompt },
                { inlineData: { data: base64Data, mimeType: file.type } }
            ]
        }
    });
    return response.text || "";
};

export const analyzeImageAndGetJson = async (prompt: string, file: File, schema: any): Promise<any> => {
    const ai = getAI();
    const base64Data = await fileToBase64(file);
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
            parts: [
                { text: prompt },
                { inlineData: { data: base64Data, mimeType: file.type } }
            ]
        },
        config: {
            responseMimeType: 'application/json',
            responseSchema: schema
        }
    });
    return JSON.parse(response.text || "{}");
};

export const analyzeMultipleImagesAndGetJson = async (prompt: string, files: File[], schema: any): Promise<any> => {
    const ai = getAI();
    const parts = [{ text: prompt }];
    for (const file of files) {
        const base64Data = await fileToBase64(file);
        parts.push({ inlineData: { data: base64Data, mimeType: file.type } } as any);
    }
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
            responseMimeType: 'application/json',
            responseSchema: schema
        }
    });
    return JSON.parse(response.text || "{}");
};

export const predictSyllabusEnd = async (topics: any[], grade: string, subject: string): Promise<{ date: string, advice: string }> => {
    const ai = getAI();
    const prompt = `
        Analyze this syllabus progress for ${grade} ${subject}:
        Data: ${JSON.stringify(topics)}
        
        Task:
        1. Calculate estimated completion date based on 5 topics per week pace.
        2. Provide a motivating 2-sentence advice in Hindi (Hinglish).
        
        Return ONLY JSON: {"date": "DD-MMM-YYYY", "advice": "string"}
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    
    return JSON.parse(response.text || '{"date": "Unknown", "advice": "Keep working hard!"}');
};

export const generateLessonVideo = async (topic: string, duration: string, context: string): Promise<string> => {
    const ai = getAI();
    const prompt = `Educational video about "${topic}" for ${context}. Length: ${duration}. High quality animation.`;
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
    });
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
};

export const generateMarketingVideo = async (topic: string, audience: string, message: string, format: 'portrait' | 'landscape'): Promise<string> => {
    const ai = getAI();
    const prompt = `Professional promotional video for "${topic}". Target Audience: ${audience}. Key Message: ${message}.`;
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: format === 'portrait' ? '9:16' : '16:9'
        }
    });
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
};

export const generateImageForTopic = async (prompt: string): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: prompt }],
        config: {
            imageConfig: { aspectRatio: "16:9" }
        }
    });
    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart?.inlineData) {
        return `data:image/png;base64,${imagePart.inlineData.data}`;
    }
    throw new Error("No image generated");
};

export const generateSpeech = async (text: string, voiceName: string = 'Kore', promptWrapper?: (text: string) => string): Promise<AudioBufferSourceNode> => {
    const ai = getAI();
    const prompt = promptWrapper ? promptWrapper(text) : `Say clearly: ${text}`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName },
                },
            },
        },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("TTS Failed");

    const ctx = getOutputAudioContext();
    const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
    return source;
};

let audioContext: AudioContext | null = null;
export const getOutputAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    return audioContext;
};

export const findInstitutionsByQuery = async (query: string): Promise<Institution[]> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
            tools: [{ googleMaps: {} }]
        }
    });
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const institutions: Institution[] = [];
    chunks?.forEach((chunk: any) => {
        if (chunk.maps) {
            institutions.push({
                name: chunk.maps.title,
                address: chunk.maps.uri,
                lat: 0, 
                lng: 0
            });
        }
    });
    return institutions;
};

export const searchWithGrounding = async (query: string): Promise<any> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
            tools: [{ googleSearch: {} }]
        }
    });
    const webResults = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return {
        summary: response.text,
        places: [],
        webResults: webResults.map((c: any) => ({ title: c.web?.title, uri: c.web?.uri }))
    };
};

export const generateTest = async (config: any): Promise<string> => {
    const prompt = `Generate a printable ${config.subject} test paper for ${config.className}, board ${config.board}. 
    Topic: ${config.chapterName}. Questions: ${config.numQuestions}. Language: ${config.language}. 
    Format: HTML with professional academic layout.`;
    return await generateText(prompt, 'gemini-3-pro-preview');
};

export const generateAdCreative = async (topic: string, audience: string, message: string, style: string): Promise<any> => {
    const prompt = `Generate a marketing ad creative for: ${topic}. Audience: ${audience}. Message: ${message}. Style: ${style}. Return JSON: { "adCopy": { "headline": "...", "body": "..." }, "imagePrompt": "..." }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    const data = JSON.parse(response.text || '{}');
    const imageUrl = await generateImageForTopic(data.imagePrompt);
    return { adCopy: data.adCopy, imageUrl };
};

export const generateOnlineExamContent = async (course: string, className: string, subject: string, chapter: string, num: number, types: string[]): Promise<Exam> => {
    const prompt = `Generate an online exam for ${course} ${className} ${subject}, chapter ${chapter}. Questions: ${num}. Types: ${types.join(',')}. 
    Return JSON: { "subject": "...", "className": "...", "duration": 60, "totalMarks": 50, "questions": [{ "question": "...", "options": ["..."], "answer": "...", "marks": 5, "type": "multiple-choice" }] }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const generateRecruitmentMaterial = async (exam: string, sub: string, topic: string, mode: string, lang: string): Promise<any> => {
    const prompt = `Generate ${mode} for ${exam} ${sub} ${topic} in ${lang}. If mode is quiz, return JSON { "questions": [...] }. If notes, return HTML.`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: mode === 'quiz' ? { responseMimeType: 'application/json' } : undefined
    });
    return mode === 'quiz' ? JSON.parse(response.text || '{"questions":[]}') : response.text;
};

export const generateStudentReport = async (data: any): Promise<string> => {
    const prompt = `Generate a comprehensive AI performance report for student ${data.profile.name}. Data: ${JSON.stringify(data)}. Use clean HTML. Language: Hindi/English Mix.`;
    return await generateText(prompt, 'gemini-3-pro-preview');
};

export const generateCertificateText = async (type: string, name: string, exam: string, results: any[]): Promise<string> => {
    const prompt = `Write a short, professional, highly praising sentence for a certificate of ${type} for student ${name} who scored well in ${exam}. Results: ${JSON.stringify(results)}. Return just the sentence.`;
    return await generateText(prompt);
};

export const extractImageFromPdf = async (file: File): Promise<File> => {
    return file;
};

export const generateLearningPath = async (subject: string, className: string, info: string): Promise<LearningPath> => {
    const prompt = `Generate a 5-step learning path for ${subject} ${className}. Student Info: ${info}. 
    Return JSON: { "subject": "...", "steps": [{ "step": 1, "topic": "...", "objective": "...", "status": "To Review", "suggestion": "..." }] }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const generateProjectDescription = async (title: string, skills: string): Promise<string> => {
    const prompt = `Write a detailed, professional job description for a student project titled "${title}" requiring ${skills}. Language: English.`;
    return await generateText(prompt);
};

export const generateTimetable = async (constraints: TimetableConstraints): Promise<Timetable[]> => {
    const prompt = `Generate conflict-free timetables based on these constraints: ${JSON.stringify(constraints)}. 
    Return JSON array of Timetable objects matching the TypeScript interface.`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '[]');
};

export const generateStudentServicePortfolio = async (title: string, desc: string, skills: string[]): Promise<any> => {
    const prompt = `Generate an attractive HTML portfolio and a basic business plan for a student offering: ${title}. Description: ${desc}. Skills: ${skills.join(',')}. 
    Return JSON: { "portfolioHtml": "...", "businessPlanHtml": "..." }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const getGitaVerse = async (): Promise<any> => {
    const prompt = `Provide one random Shrimad Bhagavad Gita shloka with Hindi and English explanations. Return JSON: { "shloka": "...", "hindi_explanation": "...", "english_explanation": "..." }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const getYogaPose = async (): Promise<any> => {
    const prompt = `Provide one random Yoga pose with instructions and benefits in Hindi and English. Return JSON: { "sanskrit_name": "...", "english_name": "...", "instructions_hindi": "...", "instructions_english": "...", "benefits_hindi": "...", "benefits_english": "..." }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const generateInterviewFeedback = async (transcripts: Transcript[], role: string, type: string, jd: string): Promise<string> => {
    const prompt = `Analyze this mock interview transcript for the role of ${role} (${type}). JD: ${jd}. Transcript: ${JSON.stringify(transcripts)}. 
    Provide a detailed performance report in HTML with sections: Score, Strengths, Weaknesses, Tips. Language: English.`;
    return await generateText(prompt, 'gemini-3-pro-preview');
};

export const findSarkariJobs = async (qual: string): Promise<SarkariJob[]> => {
    const prompt = `Find 3 current government job (Sarkari) openings in India for a ${qual} candidate. 
    Return JSON array: [{ "title": "...", "organization": "...", "eligibility": "...", "lastDate": "DD-MMM-YYYY", "link": "...", "requiredDocuments": ["..."] }]`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
            tools: [{ googleSearch: {} }],
            responseMimeType: 'application/json'
        }
    });
    return JSON.parse(response.text || '[]');
};

export const generateNgoApplicationEssay = async (scholarship: Scholarship, user: User): Promise<string> => {
    const prompt = `Write a persuasive Statement of Purpose for student ${user.name} applying for scholarship: ${scholarship.title} by ${scholarship.ngoName}. Scholarship Desc: ${scholarship.description}. Language: English.`;
    return await generateText(prompt, 'gemini-3-pro-preview');
};

export const generateCurriculum = async (className: string, subject: string, board: string, weeks: number): Promise<any> => {
    const prompt = `Create a ${weeks}-week curriculum for ${subject} for ${className} (${board}). 
    Return JSON: { "weeks": [{ "week": 1, "topic": "...", "objective": "...", "activity": "..." }] }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const generateSubstitutionPlan = async (absent: string, sub: string, period: string, available: any[]): Promise<any> => {
    const prompt = `Teacher ${absent} (${sub}) is absent for ${period}. Available teachers: ${JSON.stringify(available)}. 
    Suggest the best substitute and a reason in Hindi. Return JSON: { "bestMatch": "...", "reason": "..." }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const analyzeGrievance = async (text: string): Promise<any> => {
    const prompt = `Analyze this grievance: "${text}". Categorize it and suggest urgency. 
    Return JSON: { "sentiment": "Urgent/Normal", "summary": "...", "category": "..." }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

export const analyzePsychometricResults = async (answers: string[]): Promise<any> => {
    const prompt = `Analyze these psychometric responses: ${answers.join(', ')}. 
    Determine best career stream and personality traits. 
    Return JSON: { "stream": "...", "career": "...", "personality": "..." }`;
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
};

// Helpers
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

export const sanitizeHtml = (html: string) => {
    return html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
               .replace(/on\w+="[^"]*"/g, "");
};

function decode(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}
