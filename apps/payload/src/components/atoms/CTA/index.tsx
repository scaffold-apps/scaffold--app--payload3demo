'use client'
import { fireEvent } from '@/lib/fireEvent'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import styles from './styles.module.css'

interface Props {
  children: React.ReactNode
  asChild?: boolean
  analyticsEvent?: string
  size?: 'sm' | 'lg'
}

export const CTA: React.FC<Props> = ({
  children,
  asChild,
  analyticsEvent,
  size = 'lg',
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  const handleButtonClick = () => {
    analyticsEvent && fireEvent(analyticsEvent)
  }

  return (
    <Comp
      {...props}
      className={cn(
        `inline-flex rounded-xl bg-purple-600 font-bold tracking-tight pointer hover:scale-105 transition duration-300 ease-out w-full lg:w-auto text-foreground`,
        size === 'lg'
          ? 'p-3.5 lg:p-4 px-10 lg:px-[30px] text-md lg:text-lg'
          : 'p-2.5 lg:p-3 px-6 lg:px-[20px] text-sm lg:text-base',
        styles.cta,
      )}
      onClick={handleButtonClick}
    >
      {children}
    </Comp>
  )
}

export default CTA
