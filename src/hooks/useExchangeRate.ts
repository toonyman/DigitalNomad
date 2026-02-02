'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://open.er-api.com/v6/latest';

export function useExchangeRate(baseCurrency: string, targetCurrency: string) {
    const [rate, setRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!baseCurrency || !targetCurrency || baseCurrency === targetCurrency) return;

        const fetchRate = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/${baseCurrency}`);
                const data = await res.json();
                if (data && data.rates && data.rates[targetCurrency]) {
                    setRate(data.rates[targetCurrency]);
                }
            } catch (error) {
                console.error('Failed to fetch exchange rate', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRate();
    }, [baseCurrency, targetCurrency]);

    return { rate, loading };
}
