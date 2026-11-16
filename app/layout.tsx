import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://www.udayabhanuaich.org')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Udayabhanu Aich — Software Engineer & AI Engineer',
    template: '%s | Udayabhanu Aich',
  },
  description:
    'Portfolio of Udayabhanu Aich — Full-Stack and AI Systems Engineer building scalable Python architectures, real-time proctoring systems, multi-turn voice agents, and high-performance applications.',
  keywords: [
    'Udayabhanu Aich',
    'Full-Stack Developer',
    'AI Systems Engineer',
    'Python',
    'FastAPI',
    'Django',
    'Next.js',
    'RAG',
    'LLM',
    'WebSockets',
    'AWS Certified AI Practitioner',
    'Claude Certified Architect',
    'Anthropic Claude',
    'MCP',
    'TensorFlow',
  ],
  authors: [{ name: 'Udayabhanu Aich' }],
  creator: 'Udayabhanu Aich',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Udayabhanu Aich — Software Engineer & AI Engineer',
    description: 'Scalable Python architectures, real-time proctoring systems, and multi-turn AI agents.',
    siteName: 'Udayabhanu Aich',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Udayabhanu Aich — Software Engineer & AI Engineer',
    description: 'Scalable Python architectures, real-time proctoring systems, and multi-turn AI agents.',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#090a0f',
  colorScheme: 'dark',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Udayabhanu Aich',
  jobTitle: 'Software Engineer & AI Engineer',
  worksFor: { '@type': 'Organization', name: 'SmallDay IT Services Pvt. Ltd.' },
  url: siteUrl,
  sameAs: ['https://github.com/Manish10000', 'https://linkedin.com/in/udayabhanuaich'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3C0LE2ME0H"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3C0LE2ME0H');
            `,
          }}
        ></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-cyan-500/20 selection:text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-black font-medium"
        >
          Skip to content
        </a>
        <div id="main">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
