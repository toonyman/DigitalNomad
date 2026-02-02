import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Script from 'next/script';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NomadPass',
  url: 'https://nomadpass.com',
  description: 'Global utility to compare digital nomad visas instantly.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://nomadpass.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export const metadata: Metadata = {
  title: 'Digital Nomad Visa Comparison 2026 | NomadPass',
  description: 'Find the best digital nomad visas for 2026. Compare income requirements, tax benefits, and visa duration for Spain, Portugal, Thailand, and more.',
  keywords: ['Digital Nomad Visa', 'Remote Work', 'Visa Comparison', 'Nomad Pass', 'Spain Digital Nomad Visa', 'Portugal D8'],
  openGraph: {
    title: 'Digital Nomad Visa Comparison 2026 | NomadPass',
    description: 'Global utility to compare digital nomad visas instantly.',
    type: 'website',
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
  other: {
    'geo.region': 'Global',
    'geo.placename': 'Global',
    'geo.position': '0;0',
    'ICBM': '0, 0',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2YPYPL25BY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2YPYPL25BY');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
