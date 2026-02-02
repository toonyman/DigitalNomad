'use client';

import React from 'react';
import { Search, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { sourceCountries } from '@/data/sourceCountries';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
    income: number;
    setIncome: (value: number) => void;
    nationality: string;
    setNationality: (value: string) => void;
}

export default function Hero({ income, setIncome, nationality, setNationality }: HeroProps) {
    const { t } = useLanguage();
    const selectedCountry = sourceCountries.find(c => c.name === nationality);
    const currency = selectedCountry ? selectedCountry.currency : 'USD';
    const incomeLabel = t.monthlyIncome.replace('USD', currency);

    return (
        <div className="relative w-full h-[600px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background with Gradient Blobs */}
            <div className="absolute inset-0 bg-gray-900 pointer-events-none -z-20">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* Theme Toggle & Language Switcher */}
            <div className="absolute top-6 right-6 z-[100] flex items-center gap-3">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>

            {/* Background Image Overlay (optional, just using gradients for now for clean look) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-20 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto z-10"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight drop-shadow-lg user-select-none whitespace-pre-wrap">
                    {t.heroTitle}
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-light whitespace-pre-wrap">
                    {t.heroSubtitle}
                </p>

                {/* Glassmorphism Input Bar */}
                <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 max-w-2xl mx-auto shadow-2xl">

                    {/* Nationality Input */}
                    <div className="flex items-center gap-3 w-full md:w-1/2 bg-gray-100/50 dark:bg-gray-900/40 rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-500/50 transition-colors">
                        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <div className="flex flex-col items-start text-left w-full gap-0.5">
                            <label className="text-xs uppercase tracking-wide text-gray-500 font-bold">{t.iamfrom}</label>
                            <select
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                                className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-base font-medium appearance-none cursor-pointer"
                            >
                                <option value="" disabled>{t.selectCountry}</option>
                                {sourceCountries.map((country) => (
                                    <option key={country.code} value={country.name} className="text-gray-900 bg-white">
                                        {country.flag} {country.name} ({country.currency})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Income Input */}
                    <div className="flex items-center gap-3 w-full md:w-1/2 bg-gray-100/50 dark:bg-gray-900/40 rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-500/50 transition-colors">
                        <DollarSign className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <div className="flex flex-col items-start text-left w-full gap-0.5">
                            <label className="text-xs uppercase tracking-wide text-gray-500 font-bold">{incomeLabel}</label>
                            <input
                                type="number"
                                value={income || ''}
                                onChange={(e) => setIncome(Number(e.target.value))}
                                placeholder="3000"
                                className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-base font-medium placeholder-gray-500 appearance-none"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    {/* Search Button */}
                    <button className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center shrink-0" aria-label={t.search}>
                        <Search className="w-6 h-6" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
