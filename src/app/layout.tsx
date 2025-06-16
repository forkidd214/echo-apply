import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import type { Metadata } from 'next'
import Providers from './_providers'
import './globals.css'
import { cn } from '@/utils/cn'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Echo Apply',
  description: 'Echo Apply is a platform for creating and managing forms.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content="Echo Apply" />
      </head>
      <body className={cn(inter.className, 'relative flex h-screen flex-col')}>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  )
}
