'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'jp', label: '日本語', flag: '🇯🇵' },
] as const;

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex bg-gray-100/80 dark:bg-white/10 backdrop-blur-md rounded-full p-1 border border-gray-200 dark:border-white/20">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${language === lang.code
                        ? 'bg-white dark:bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10'
                        }`}
                >
                    <span className="text-sm">{lang.flag}</span>
                    <span className="hidden md:inline">{lang.label}</span>
                </button>
            ))}
        </div>
    );
}
