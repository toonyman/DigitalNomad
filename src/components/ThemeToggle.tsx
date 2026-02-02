'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-110 transition-transform text-gray-800 dark:text-yellow-400"
            aria-label="Toggle Theme"
        >
            <div className="relative w-5 h-5">
                <Sun className="absolute w-full h-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute w-full h-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
        </button>
    );
}
