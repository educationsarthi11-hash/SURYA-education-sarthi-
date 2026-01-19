
import { JobOpening, JobApplication } from '../types';
import { GoogleGenAI } from "@google/genai";

let jobs: JobOpening[] = [];
let applications: JobApplication[] = [];
let listeners: (() => void)[] = [];

const notify = () => listeners.forEach(l => l());

// MLM / Network Marketing कीवर्ड्स की लिस्ट
const BANNED_KEYWORDS = [
    "network marketing", "mlm", "chain system", "refer and earn", 
    "direct selling", "member joining", "no investment", "work from home money",
    "pyramid scheme", "marketing executive chain"
];

export const placementService = {
    getJobOpenings: () => jobs.filter(j => j.isApproved), // केवल अप्रूव्ड जॉब्स ही दिखेंगी
    
    postJobOpening: async (job: JobOpening) => {
        // 1. Basic Keyword Check
        const content = (job.jobTitle + " " + job.description).toLowerCase();
        const isMLM = BANNED_KEYWORDS.some(keyword => content.includes(keyword));

        if (isMLM) {
            throw new Error("Network Marketing / MLM Jobs are strictly prohibited on Sarthi Platform.");
        }

        // 2. AI Scanning (Gemini)
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Analyze if this job post sounds like Network Marketing, MLM, or a Pyramid Scheme. 
            Job Title: ${job.jobTitle}
            Description: ${job.description}
            Return ONLY a JSON: {"isFake": boolean, "reason": "string"}`;

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: "application/json" }
            });

            const aiCheck = JSON.parse(response.text || '{}');
            if (aiCheck.isFake) {
                throw new Error("AI Detection: This post matches MLM/Network Marketing patterns.");
            }
        } catch (e: any) {
            if (e.message.includes("AI Detection") || e.message.includes("MLM")) throw e;
            // If AI is busy, we allow but keep isApproved = false for Admin to manual check
        }

        jobs = [job, ...jobs];
        notify();
    },

    approveJob: (jobId: string) => {
        jobs = jobs.map(j => j.id === jobId ? { ...j, isApproved: true } : j);
        notify();
    },

    applyForJob: (studentId: string, jobId: string) => {
        const app: JobApplication = {
            id: `APP-${Date.now()}`,
            jobId,
            studentId,
            status: 'Applied'
        };
        applications = [app, ...applications];
        notify();
    },

    subscribe: (l: () => void) => {
        listeners.push(l);
        return () => { listeners = listeners.filter(li => li !== l); };
    }
};
