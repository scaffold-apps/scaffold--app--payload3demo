import { Trans } from '@lingui/macro'
import { setI18n } from '@lingui/react/server'
import { Button } from '@repo/ui/button'
import Link from 'next/link'
import React from 'react'
import { allI18nInstances } from './appRouteri18n'

type Props = {
  params: {
    lang: string
  }
}

export default function Page({ params }: Props) {
  const i18n = allI18nInstances[params.lang] // get a ready-made i18n instance for the given locale
  setI18n(i18n) // make it available server-side for the current request

  return (
    <>
      <main className="text-center flex space-y-4 flex-col items-center">
        <article className="lg:max-w-screen-lg">
          <h1>Payload 3.0</h1>
          <p>
            This BETA is rapidly evolving, you can report any bugs against{' '}
            <Link href="https://github.com/payloadcms/payload-3.0-demo/issues" target="_blank">
              the repo
            </Link>{' '}
            or in the{' '}
            <Link
              href="https://discord.com/channels/967097582721572934/1215659716538273832"
              target="_blank"
            >
              dedicated channel in Discord
            </Link>
            . Payload is running at <Link href="/admin">/admin</Link>. An example of a custom route
            running the Local API can be found at <Link href="/my-route">/my-route</Link>.
          </p>
          <p>You can use the Local API in your server components like this:</p>
        </article>
        <div className="flex flex-col items-center justify-center w-full">
          <Button>
            <Trans>Here is a Shadcn button</Trans>
          </Button>
        </div>
      </main>
    </>
  )
}
