import type { Metadata } from 'next'
import './globals.css'
import Chatbot from '@/components/Chatbot'

export const metadata: Metadata = {
  title: 'Louis Miguel Bernal — Full Stack Developer',
  description: 'Full stack developer specializing in building exceptional digital experiences. Crafting performant, scalable web applications with modern technologies.',
  keywords: ['full stack developer', 'react', 'next.js', 'typescript', 'portfolio'],
  authors: [{ name: 'Louis Miguel Bernal' }],
  openGraph: {
    title: 'Louis Miguel Bernal — Full Stack Developer',
    description: 'Full stack developer crafting exceptional digital experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
