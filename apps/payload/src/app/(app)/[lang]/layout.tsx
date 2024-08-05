import { setI18n } from '@lingui/react/server'
import { Inter } from 'next/font/google'
import React from 'react'
import '../../../../tailwind.css'
import { allI18nInstances } from './appRouteri18n'
import './globals.scss'
import { LinguiClientProvider } from './LinguiClientProvider'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  params: {
    lang: string
  }
  children: React.ReactNode
}

export default function Layout({ params: { lang }, children }: Props) {
  const i18n = allI18nInstances[lang] // get a ready-made i18n instance for the given locale
  setI18n(i18n) // make it available server-side for the current request

  return (
    <html className={inter.className}>
      <body>
        <LinguiClientProvider initialLocale={lang} initialMessages={i18n.messages}>
          <Providers>{children}</Providers>
        </LinguiClientProvider>
      </body>
    </html>
  )
}
