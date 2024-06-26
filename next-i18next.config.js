/** @type {import('next-i18next').UserConfig} */
const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    localeDetection: false,
  },
  ns: ['common'],
  defaultNS: 'common',
  backend: {
    loadPath: './public/locales/{{lng}}/{{ns}}.json',
  },
  react: {
    useSuspense: false,
  },
};

module.exports = i18nConfig;
