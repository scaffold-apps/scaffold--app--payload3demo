'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { LinguiClientProvider } from './LinguiClientProvider'

const queryClient = new QueryClient()

interface Props {
  lang: string
  messages: Record<string, any>
  children: React.ReactNode
  theme?: string
}

export function Providers({ lang, messages, children, theme = 'dark' }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme}>
      <LinguiClientProvider initialLocale={lang} initialMessages={messages}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </LinguiClientProvider>
    </ThemeProvider>
  )
}
