import CTA from '@/components/atoms/CTA'
import { cn } from '@/lib/utils'
import { Button } from '@repo/ui/button'
import Link from 'next/link'
import { Page } from 'payload-types'

type CMSLinkType = {
  type: 'custom' | 'reference'
  url?: string
  newTab?: boolean
  reference?: {
    value: string | Page
    relationTo: 'pages'
  }
  label: string
  appearance: 'default' | 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  size,
}) => {
  const href = getHref(type, reference, url)

  if (appearance === 'primary') {
    return (
      <CTA size={size} asChild>
        <Link href={href} target={newTab ? '_blank' : '_self'}>
          {label}
        </Link>
      </CTA>
    )
  }

  const link = (
    <Link
      href={href}
      target={newTab ? '_blank' : '_self'}
      className={cn(
        'hover:underline',
        size === 'small' && 'text-sm',
        size === 'medium' && 'text-base',
        size === 'large' && 'text-lg',
      )}
    >
      {label}
    </Link>
  )

  if (appearance === 'secondary') {
    return (
      <Button variant={'secondary'} asChild>
        {link}
      </Button>
    )
  }

  return link
}

function getHref(
  type: CMSLinkType['type'],
  reference: CMSLinkType['reference'],
  url: CMSLinkType['url'],
) {
  return type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
    ? `/${reference.value.slug}`
    : url || ''
}
