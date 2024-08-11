import { Button } from '@repo/ui/button'
import Link from 'next/link'
import { Page } from 'payload-types'

export const Footer: React.FC<{ footer: Page['footer'] }> = ({ footer }) => {
  return (
    <>
      <div className="container border-t border-gray-200 dark:border-gray-800"></div>
      <footer className="py-8 flex flex-col mt-7 lg:mt-3 mb-14">
        <div className="container mx-auto flex justify-center items-center">
          {footer?.socialButtons?.map((button, index) => (
            <Button key={index} variant="ghost" asChild>
              <Link href={button.url} target="_blank">
                <img src={button.icon.url} alt={button.icon.alt} className="size-8" />
              </Link>
            </Button>
          ))}
        </div>
        <div className="container flex">
          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center space-x-2 text-foreground text-2xl font-bold mb-3">
              {footer?.logo && (
                <img src={footer.logo.url} alt={footer.logo.alt} className="size-8" />
              )}
              <span className="font-bold text-2xl">{footer?.companyName || ''}</span>
            </div>
            <p className="text-gray-600 font-light dark:text-gray-400 text-md">
              {footer?.copyrightLine || ''}
            </p>
          </div>
          <div className="container mx-auto mt-6 text-sm text-gray-400">
            <div className="flex space-x-8">
              {footer?.footerColumns?.map((column, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  {column.columnLinks?.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link.url || ''}
                      target="_blank"
                      className="hover:underline"
                    >
                      {item.link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
