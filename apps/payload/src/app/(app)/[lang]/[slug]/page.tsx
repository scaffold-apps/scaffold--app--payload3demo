import Blocks from '@/components/Blocks'
import { Header } from '@/components/organisms/Header'
import { setI18n } from '@lingui/react/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { notFound } from 'next/navigation'
import { Page as TPage } from '../../../../../payload-types'
import config from '../../../../../payload.config'
import { allI18nInstances } from '../appRouteri18n'

const payload = await getPayloadHMR({ config })

export default async function Page({ params }: { params: { lang: string; slug: string } }) {
  const i18n = allI18nInstances[params.lang] // get a ready-made i18n instance for the given locale
  i18n && setI18n(i18n) // make it available server-side for the current request

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.slug || 'home',
      },
    },
  })

  const page = pages.docs[0]

  if (!page) return notFound()

  return (
    <>
      {page?.header?.showHeader && <Header header={page.header} />}
      <Blocks blocks={page.layout} />
    </>
  )
}

export async function generateStaticParams() {
  const pages = await payload.find({
    collection: 'pages',
    limit: 0,
  })

  return pages.docs.map((value: TPage, index: number, array: TPage[]) => ({ slug: value.slug }))
}
