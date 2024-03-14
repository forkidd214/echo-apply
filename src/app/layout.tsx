import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import Providers from './_providers'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Echo Apply',
  description: 'Generated by Jason Zou',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex h-screen flex-col')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
