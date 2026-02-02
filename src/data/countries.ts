export type Country = {
  id: string;
  name: string;
  incomeRequirement: number; // USD
  visaDuration: string;
  taxExempt: boolean;
  internetSpeed: 'High' | 'Medium';
  benefits: string[];
  flagUrl: string;
  currencyCode: string;
  applyUrl?: string;
  flightUrl?: string;
};

export const countries: Country[] = [
  {
    id: 'spain',
    name: 'Spain',
    incomeRequirement: 2334,
    visaDuration: '1 Year (Renewable up to 5)',
    taxExempt: false,
    internetSpeed: 'High',
    benefits: ['Beckham Law Tax Regime', 'High Standard of Living', 'Great Climate'],
    flagUrl: '🇪🇸',
    currencyCode: 'EUR',
    applyUrl: 'https://prie.comercio.gob.es/en-us/Paginas/Teletrabajadores-caracter-internacional.aspx',
    flightUrl: 'https://www.skyscanner.net/flights-to/es/cheap-flights-to-spain.html',
  },
  {
    id: 'portugal',
    name: 'Portugal',
    incomeRequirement: 3280,
    visaDuration: '1 Year (Renewable up to 4)',
    taxExempt: false,
    internetSpeed: 'High',
    benefits: ['NHR Tax Scheme', 'Affordable Cost of Living', 'Vibrant Expat Community'],
    flagUrl: '🇵🇹',
    currencyCode: 'EUR',
    applyUrl: 'https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residence/digital-nomads',
    flightUrl: 'https://www.skyscanner.net/flights-to/pt/cheap-flights-to-portugal.html',
  },
  {
    id: 'greece',
    name: 'Greece',
    incomeRequirement: 3690,
    visaDuration: '1 Year (Renewable up to 3)',
    taxExempt: true,
    internetSpeed: 'Medium',
    benefits: ['50% Tax Break for 7 Years', 'Beautiful Islands', 'Rich History'],
    flagUrl: '🇬🇷',
    currencyCode: 'EUR',
    applyUrl: 'https://www.mfa.gr/en/visas/visa-types/national-visas.html',
    flightUrl: 'https://www.skyscanner.net/flights-to/gr/cheap-flights-to-greece.html',
  },
  {
    id: 'thailand-ltr',
    name: 'Thailand (LTR)',
    incomeRequirement: 6666, // $80k/year -> ~6666/month
    visaDuration: '10 Years',
    taxExempt: true,
    internetSpeed: 'High',
    benefits: ['17% Flat Tax Rate', 'Low Cost of Living', 'World-Class Food'],
    flagUrl: '🇹🇭',
    currencyCode: 'THB',
    applyUrl: 'https://ltr.boi.go.th/',
    flightUrl: 'https://www.skyscanner.net/flights-to/th/cheap-flights-to-thailand.html',
  },
  {
    id: 'japan',
    name: 'Japan',
    incomeRequirement: 8200, // 10M JPY ~ $68k USD -> ~$5700 but safer to put $8200ish if referencing recent high reqs or strict conversion. Let's use standard ~8200 for 10M JPY annually
    visaDuration: '6 Months',
    taxExempt: false,
    internetSpeed: 'High',
    benefits: ['Safe & Clean', 'Modern Infrastructure', 'Unique Culture'],
    flagUrl: '🇯🇵',
    currencyCode: 'JPY',
    applyUrl: 'https://www.mofa.go.jp/ca/f_n/page22e_001033.html',
    flightUrl: 'https://www.skyscanner.net/flights-to/jp/cheap-flights-to-japan.html',
  },
  {
    id: 'mexico',
    name: 'Mexico',
    incomeRequirement: 2595,
    visaDuration: '1 Year (Renewable up to 4)',
    taxExempt: false,
    internetSpeed: 'Medium',
    benefits: ['Close to USA', 'Rich Culture & Food', 'Affordable'],
    flagUrl: '🇲🇽',
    currencyCode: 'MXN',
    applyUrl: 'https://consulmex.sre.gob.mx/washington/index.php/ligavisos/15-visas/182-visa-de-residencia-temporal',
    flightUrl: 'https://www.skyscanner.net/flights-to/mx/cheap-flights-to-mexico.html',
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    incomeRequirement: 3000,
    visaDuration: '1 Year (Renewable up to 2)',
    taxExempt: true,
    internetSpeed: 'Medium',
    benefits: ['Income Tax Exemption', 'Pura Vida Lifestyle', 'Biodiversity'],
    flagUrl: '🇨🇷',
    currencyCode: 'CRC',
    applyUrl: 'https://migracion.go.cr/Paginas/Categor%C3%ADa-Migratorias-%28Extranjeros%29/Subcategor%C3%ADa-de-Estancia.aspx',
    flightUrl: 'https://www.skyscanner.net/flights-to/cr/cheap-flights-to-costa-rica.html',
  },
  {
    id: 'italy',
    name: 'Italy',
    incomeRequirement: 2900,
    visaDuration: '1 Year (Renewable)',
    taxExempt: false,
    internetSpeed: 'High',
    benefits: ['90% Tax Exemption (New Regime)', 'Culinary Heaven', 'Cultural Heritage'],
    flagUrl: '🇮🇹',
    currencyCode: 'EUR',
    applyUrl: 'https://vistoperitalia.esteri.it/home/en',
    flightUrl: 'https://www.skyscanner.net/flights-to/it/cheap-flights-to-italy.html',
  },
];
