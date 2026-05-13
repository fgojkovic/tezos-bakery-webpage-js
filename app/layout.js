import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TezBake - Premium Tezos Baking Services',
  description: 'Secure, reliable, and profitable Tezos baking services with industry-leading rewards and 24/7 support.',
  keywords: 'Tezos, baking, XTZ, staking, blockchain, cryptocurrency, rewards',
  openGraph: {
    title: 'TezBake - Premium Tezos Baking Services',
    description: 'Secure, reliable, and profitable Tezos baking services with industry-leading rewards and 24/7 support.',
    url: 'https://tezbake.com',
    siteName: 'TezBake',
    images: [
      {
        url: 'https://tezbake.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TezBake - Premium Tezos Baking Services',
    description: 'Secure, reliable, and profitable Tezos baking services with industry-leading rewards and 24/7 support.',
    images: ['https://tezbake.com/twitter-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}