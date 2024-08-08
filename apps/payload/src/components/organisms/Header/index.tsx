import CTA from '@/components/atoms/CTA'
import { Button } from '@repo/ui/button'
import Link from 'next/link'
import { Page } from '../../../../payload-types'

export const Header: React.FC<{ header: Page['header'] }> = ({ header }) => {
  return (
    <header className="container mx-auto p-4 py-8 flex lg:justify-between justify-center items-center text-foreground text-center">
      {/* <nav className="hidden lg:block">
        <ul className="flex gap-1">
          <li>
            <Button variant={'ghost'} className="text-lg font-light" asChild>
              <a href="#how-it-works">How it works</a>
            </Button>
          </li>
          <li>
            <Button variant={'ghost'} className="text-lg font-light" asChild>
              <a href="#pricing">Pricing</a>
            </Button>
          </li>
          <li>
            <Button variant={'ghost'} className="text-lg font-light" asChild>
              <a href="#about">About</a>
            </Button>
          </li>
          <li>
            <Button variant={'ghost'} className="text-lg font-light" asChild>
              <a href="#faq">FAQ</a>
            </Button>
          </li>
        </ul>
      </nav> */}
      <div className="flex flex-row gap-3 lg:translate-x-[-50px] font-bold text-lg items-center">
        {header?.logo && header.logo?.url && header.logo?.alt && (
          <img className="size-10" src={header.logo.url} alt={header.logo.alt} />
        )}
        {header?.companyName && header.companyName}
      </div>
      <div className="hidden lg:block space-x-4">
        <Button variant={'link'} asChild>
          <Link href="/login">Login</Link>
        </Button>
        <CTA size="sm" asChild={true}>
          <Link href="#download">Try for free</Link>
        </CTA>
      </div>
    </header>
  )
}
