import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { ApolloWrapper } from '@/lib/apollo-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zdravotnický Systém',
  description: 'Systém pro správu pacientů a jejich vyšetření',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <ApolloWrapper>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  )
}
