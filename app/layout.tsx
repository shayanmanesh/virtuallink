import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientNavigation from '@/components/ClientNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Virtual.link - Encyclopedia of Virtual Terms',
  description: 'Comprehensive encyclopedia of virtual-related terms, definitions, and concepts. From virtual reality to virtual assistants.',
  keywords: ['virtual', 'virtual reality', 'virtual assistant', 'virtual machine', 'virtual environment', 'metaverse'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientNavigation />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  )
}