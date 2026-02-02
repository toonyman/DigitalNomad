'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link as LinkIcon, Facebook, Twitter, Linkedin, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ShareButtons() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : 'https://nomadpass.com';
    const title = 'NomadPass - Compare Digital Nomad Visas';

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        { name: 'X (Twitter)', icon: <Twitter className="w-5 h-5" />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}` },
        { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
        { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
        { name: 'Reddit', icon: <span className="font-bold text-lg leading-none">r</span>, url: `https://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(title)}` },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-2">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-2 mb-2"
                    >
                        {shareLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:scale-110 hover:text-blue-500 transition-all border border-gray-100 dark:border-gray-700"
                                title={`Share on ${link.name}`}
                            >
                                {link.icon}
                            </a>
                        ))}
                        <button
                            onClick={handleCopy}
                            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:scale-110 hover:text-green-500 transition-all border border-gray-100 dark:border-gray-700"
                            title="Copy Link"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-[100] ${isOpen ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 rotate-45' : 'bg-blue-600 text-white hover:bg-blue-500'
                    }`}
            >
                {isOpen ? <Share2 className="w-6 h-6 rotate-45" /> : <Share2 className="w-6 h-6" />}
            </button>
        </div>
    );
}
