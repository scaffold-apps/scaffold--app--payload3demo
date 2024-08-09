import { cn } from '@/lib/utils'
import { Page } from 'payload-types'
import { CMSLink } from '../CMSLink'

export const Header: React.FC<{ header: Page['header'] }> = ({ header }) => {
  return (
    <header className="container mx-auto p-4 py-8 flex lg:justify-between justify-center items-center text-foreground text-center">
      <div className="flex flex-row gap-3 font-bold text-lg items-center">
        {header?.logo && header.logo?.url && header.logo?.alt && (
          <img className="size-8" src={header.logo.url} alt={header.logo.alt} />
        )}
        {header?.companyName && header.companyName}
      </div>
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
      <div className={cn('hidden lg:block', header?.navItems?.spaceBetween || 'space-x-4')}>
        {header?.navItems?.items?.map(({ link }, index) => {
          return <CMSLink key={index} {...link} />
        })}
      </div>
    </header>
  )
}
