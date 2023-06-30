import Head from 'next/head'
import { ToastContainerWrap } from './ToastContainerWrap'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TrueSecureSign',
  description: 'TrueSecureSign is a tool for securely signing your documents without sending you keys to our servers. It uses 1password for keys management',
  'manifest': '/site.webmanifest',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainerWrap />
      </body>
    </html>
  )
}
