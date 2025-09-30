import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DataCanvas - CSV to Visualization Magic',
  description: 'Turn your spreadsheet data into compelling visual stories. Drag, drop, and create stunning charts with our intuitive visualization generator.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br to-[#ADC4D4] from-[#e9cdd3] via-[#f5e6d5] via-[#C1D2C1] min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
