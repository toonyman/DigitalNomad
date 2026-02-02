'use client';

import React, { useState, useMemo } from 'react';
import { countries } from '@/data/countries';
import Hero from '@/components/Hero';
import CountryCard from '@/components/CountryCard';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { AnimatePresence as AnimatePresence2, motion as motion2 } from 'framer-motion'; // Renamed to avoid conflict
import { useLanguage } from '@/contexts/LanguageContext';
import { ShareButtons } from '@/components/ShareButtons';

type SortOption = 'income_asc' | 'visa_duration_desc';

export default function Home() {
  const { t } = useLanguage();
  const [income, setIncome] = useState<number>(0);
  const [nationality, setNationality] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('income_asc');

  // Simple mapping for demo purposes. In a real app, use a library or API.
  const baseCurrency = useMemo(() => {
    const text = nationality.toLowerCase();
    if (text.includes('korea')) return 'KRW';
    if (text.includes('japan')) return 'JPY';
    if (text.includes('euro') || text.includes('germany') || text.includes('france') || text.includes('spain')) return 'EUR';
    if (text.includes('uk') || text.includes('kingdom')) return 'GBP';
    return 'USD'; // Default
  }, [nationality]);

  const filteredCountries = useMemo(() => {
    let result = [...countries];

    // Filter by income (if income is set)
    if (income > 0) {
      result = result.filter(c => c.incomeRequirement <= income);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'income_asc') {
        return a.incomeRequirement - b.incomeRequirement;
      } else if (sortBy === 'visa_duration_desc') {
        // Simple string comparison for duration is tricky, but for MVP we can check first char or length
        // Better to use a value, but for now specific implementation:
        // '10 Years' > '1 Year'
        const durationValue = (str: string) => {
          if (str.includes('10 Years')) return 10;
          if (str.includes('Wait')) return 0;
          if (str.includes('6 Months')) return 0.5;
          return 1; // Default 1 year
        };
        return durationValue(b.visaDuration) - durationValue(a.visaDuration);
      }
      return 0; // Should not happen with defined sort options
    });

    return result;
  }, [income, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pb-20 transition-colors duration-300">
      <Hero income={income} setIncome={setIncome} nationality={nationality} setNationality={setNationality} />

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <ShareButtons />
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Showing {filteredCountries.length} countries based on your criteria</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="income_asc">{t.sortLowestIncome}</option>
              <option value="visa_duration_desc">{t.sortLongestVisa}</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredCountries.map((country, index) => (
              <React.Fragment key={country.id}>
                <CountryCard country={country} baseCurrency={baseCurrency} />

              </React.Fragment>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">No countries match your income criteria.</p>
            <p className="text-sm">Try increasing your income or checking different regions.</p>
          </div>
        )}


      </div>
    </main>
  );
}
