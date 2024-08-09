// import { postgresAdapter } from '@payloadcms/db-postgres'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { en } from 'payload/i18n/en'
//import { slateEditor } from '@payloadcms/richtext-slate'
import { s3Storage } from '@payloadcms/storage-s3'
import { adminCollection } from '@repo/collections/admins'
import { Theme } from '@repo/collections/globals'
import { mediaCollection } from '@repo/collections/media'
import { pagesCollection } from '@repo/collections/pages'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  //editor: slateEditor({}),
  editor: lexicalEditor(),
  collections: [adminCollection, pagesCollection, mediaCollection],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URI || '',
  //   },
  // }),
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.MONGODB_URI || '',
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },

  admin: {
    user: adminCollection.slug,
    ...(process.env.NODE_ENV === 'development'
      ? {
          autoLogin: {
            email: 'dev@payloadcms.com',
            password: process.env.ADMIN_PASSWORD,
            prefillOnly: true,
          },
        }
      : {}),
  },

  globals: [Theme],

  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: adminCollection.slug,
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: adminCollection.slug,
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
        },
      })
    }
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: mediaCollection.slug,
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})
