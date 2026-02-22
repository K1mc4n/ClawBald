import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawBald — Bankr Token Platform',
  description: 'Launch tokens, track fee earnings, and manage on-chain transactions. Powered by Bankr CLI on Base.',
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'ClawBald',
    description: 'Token Platform for Degens — Powered by Bankr CLI',
    images: ['/logo.png'],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
