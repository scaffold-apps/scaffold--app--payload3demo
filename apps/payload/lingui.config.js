/** @type {import('@lingui/conf').LinguiConfig} */
export default {
  locales: ['en', 'fr'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: 'po',
  compileNamespace: 'es',
}
