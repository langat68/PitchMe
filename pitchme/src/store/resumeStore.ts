import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    github: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    current: boolean;
    gpa: string;
    location: string;
    description: string[];
}

export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location: string;
    employmentType: string;
    responsibilities: string[];
}

export interface Skills {
    technical: string[];
    soft: string[];
    languages: { name: string; proficiency: string }[];
    tools: string[];
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: Skills;
}

interface ResumeStore {
    currentStep: number;
    resumeData: ResumeData;

    // Actions
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    previousStep: () => void;

    // Personal Info
    updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

    // Summary
    updateSummary: (summary: string) => void;

    // Education
    addEducation: () => void;
    updateEducation: (id: string, data: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    reorderEducation: (startIndex: number, endIndex: number) => void;

    // Experience
    addExperience: () => void;
    updateExperience: (id: string, data: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    reorderExperience: (startIndex: number, endIndex: number) => void;

    // Skills
    updateSkills: (skills: Partial<Skills>) => void;
    addSkill: (category: keyof Skills, skill: string | { name: string; proficiency: string }) => void;
    removeSkill: (category: keyof Skills, index: number) => void;

    // Reset
    resetResume: () => void;
}

const initialState: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
        github: '',
    },
    summary: '',
    education: [],
    experience: [],
    skills: {
        technical: [],
        soft: [],
        languages: [],
        tools: [],
    },
};

export const useResumeStore = create<ResumeStore>()(
    persist(
        (set) => ({
            currentStep: 0,
            resumeData: initialState,

            // Step management
            setCurrentStep: (step) => set({ currentStep: step }),
            nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
            previousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

            // Personal Info
            updatePersonalInfo: (info) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        personalInfo: { ...state.resumeData.personalInfo, ...info },
                    },
                })),

            // Summary
            updateSummary: (summary) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, summary },
                })),

            // Education
            addEducation: () =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: [
                            ...state.resumeData.education,
                            {
                                id: Date.now().toString(),
                                school: '',
                                degree: '',
                                fieldOfStudy: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                gpa: '',
                                location: '',
                                description: [],
                            },
                        ],
                    },
                })),

            updateEducation: (id, data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.map((edu) =>
                            edu.id === id ? { ...edu, ...data } : edu
                        ),
                    },
                })),

            removeEducation: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.filter((edu) => edu.id !== id),
                    },
                })),

            reorderEducation: (startIndex, endIndex) =>
                set((state) => {
                    const result = Array.from(state.resumeData.education);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);
                    return {
                        resumeData: { ...state.resumeData, education: result },
                    };
                }),

            // Experience
            addExperience: () =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: [
                            ...state.resumeData.experience,
                            {
                                id: Date.now().toString(),
                                jobTitle: '',
                                company: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                location: '',
                                employmentType: 'Full-time',
                                responsibilities: [],
                            },
                        ],
                    },
                })),

            updateExperience: (id, data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.map((exp) =>
                            exp.id === id ? { ...exp, ...data } : exp
                        ),
                    },
                })),

            removeExperience: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.filter((exp) => exp.id !== id),
                    },
                })),

            reorderExperience: (startIndex, endIndex) =>
                set((state) => {
                    const result = Array.from(state.resumeData.experience);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);
                    return {
                        resumeData: { ...state.resumeData, experience: result },
                    };
                }),

            // Skills
            updateSkills: (skills) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: { ...state.resumeData.skills, ...skills },
                    },
                })),

            addSkill: (category, skill) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: {
                            ...state.resumeData.skills,
                            [category]: [...state.resumeData.skills[category], skill],
                        },
                    },
                })),

            removeSkill: (category, index) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: {
                            ...state.resumeData.skills,
                            [category]: state.resumeData.skills[category].filter((_, i) => i !== index),
                        },
                    },
                })),

            // Reset
            resetResume: () => set({ resumeData: initialState, currentStep: 0 }),
        }),
        {
            name: 'resume-storage',
        }
    )
);