import { setI18n } from '@lingui/react/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Inter } from 'next/font/google'
import React from 'react'
import config from '../../../../payload.config'
import '../../../../tailwind.css'
import { allI18nInstances } from './appRouteri18n'
import './globals.scss'
import { Providers } from './providers'

const payload = await getPayloadHMR({ config })

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

export default async function Layout({ params: { lang }, children }: Props) {
  const i18n = allI18nInstances[lang] // get a ready-made i18n instance for the given locale
  i18n && setI18n(i18n) // make it available server-side for the current request
  const { theme } = await payload.findGlobal({ slug: 'theme' })

  return (
    <html className={inter.className} suppressHydrationWarning>
      <body>
        <Providers lang={lang} messages={i18n?.messages || {}} theme={theme || undefined}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
