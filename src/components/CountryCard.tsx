'use client';

import React from 'react';
import { Country } from '@/data/countries';
import { motion } from 'framer-motion';
import { Globe, DollarSign, Wifi, Check, Plane, RefreshCw } from 'lucide-react';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { useLanguage } from '@/contexts/LanguageContext';

interface CountryCardProps {
    country: Country;
    baseCurrency: string;
}

const ButtonLink = ({ href, children, className, variant = 'primary' }: { href?: string, children: React.ReactNode, className?: string, variant?: 'primary' | 'secondary' }) => {
    if (!href) {
        return (
            <button disabled className={`${className} opacity-50 cursor-not-allowed`} title="Link not available">
                {children}
            </button>
        );
    }
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            {children}
        </a>
    );
};

export default function CountryCard({ country, baseCurrency }: CountryCardProps) {
    // Rate for displaying "1 YourCurrency = X LocalCurrency" (Existing logic)
    const { rate, loading } = useExchangeRate(baseCurrency, country.currencyCode);

    // Rate for converting USD Income Requirement to Your Currency
    const { rate: incomeRate } = useExchangeRate('USD', baseCurrency);
    const { t } = useLanguage();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-gray-200/20 dark:border-gray-700/30 hover:shadow-xl transition-all group"
        >
            {/* Header with Flag */}
            <div className="relative h-32 bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-6xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                    {country.flagUrl}
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <span className="text-xs font-semibold text-gray-800 dark:text-white uppercase tracking-wider">
                        {country.id}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {country.name}
                    </h2>
                    {country.taxExempt && (
                        <span className="text-xs font-bold bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                            {t.taxFree}
                        </span>
                    )}
                </div>

                {/* Key Metrics */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <DollarSign className="w-5 h-5 text-blue-500" />
                            <span className="text-sm">{t.minIncome}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {/* Showing USD if baseCurrency is USD, or if loading. If converted, show converted amount */}
                            {!incomeRate || baseCurrency === 'USD'
                                ? `$${country.incomeRequirement.toLocaleString()}`
                                : `${(country.incomeRequirement * incomeRate).toLocaleString(undefined, { maximumFractionDigits: 0 })} ${baseCurrency}`
                            }
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Globe className="w-5 h-5 text-purple-500" />
                            <span className="text-sm">{t.duration}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {country.visaDuration}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Wifi className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm">{t.internet}</span>
                        </div>
                        <span className={`text-sm font-bold ${country.internetSpeed === 'High' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                            {country.internetSpeed}
                        </span>
                    </div>

                    {/* Exchange Rate */}
                    {baseCurrency !== country.currencyCode && (
                        <div className="flex items-center justify-between p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <RefreshCw className={`w-4 h-4 text-blue-500 ${loading ? 'animate-spin' : ''}`} />
                                <span className="text-xs">{t.exchangeRate}</span>
                            </div>
                            <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                                {loading ? t.thinking : rate ? `1 ${baseCurrency} ≈ ${rate.toFixed(2)} ${country.currencyCode}` : 'N/A'}
                            </div>
                        </div>
                    )}
                </div>

                {/* Benefits */}
                <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Highlights</p>
                    <ul className="space-y-2">
                        {country.benefits.slice(0, 3).map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <ButtonLink
                        href={country.applyUrl}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        {t.applyDetails}
                    </ButtonLink>
                    <ButtonLink
                        href={country.flightUrl || `https://www.google.com/travel/flights?q=flights+to+${country.name}`}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-colors"
                    >
                        <Plane className="w-4 h-4" />
                        {t.checkFlights}
                    </ButtonLink>
                </div>
            </div>
        </motion.div>
    );
}
