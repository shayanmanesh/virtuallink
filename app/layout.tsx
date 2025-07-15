import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientNavigation from '@/components/ClientNavigation'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Virtual.link - Encyclopedia of Virtual Terms',
  description: 'Comprehensive encyclopedia of virtual-related terms, definitions, and concepts. From virtual reality to virtual assistants.',
  keywords: ['virtual', 'virtual reality', 'virtual assistant', 'virtual machine', 'virtual environment', 'metaverse'],
  other: {
    'google-adsense-account': 'ca-pub-5635114711353420',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5635114711353420"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ClientNavigation />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  )
}