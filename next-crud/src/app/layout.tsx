'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <h1 className="mt-5 mb-20 text-6xl">Americanas</h1> */}

{pathname === '/login' ? null : <Header/>}

        {children}
      </body>
    </html>
  )
}
