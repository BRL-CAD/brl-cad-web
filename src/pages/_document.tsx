import { THEME_STORAGE_KEY, withBasePath } from '@constants';
import {
  Head, Html, Main, NextScript,
} from 'next/document';
import Script from 'next/script';
import { useTranslation } from 'react-i18next';

// Runs before the first paint, so the page never flashes in the wrong theme.
// A saved choice wins, otherwise the theme follows the system setting.
const themeScript = `(function () {
  var stored = null;
  try { stored = localStorage.getItem('${THEME_STORAGE_KEY}'); } catch (e) {}
  var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
})();`;

export default function Document() {
  const { t } = useTranslation();
  // data-scroll-behavior lets Next.js turn smooth scrolling off while changing pages
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta name="description" content={t('INFORMATION.DESCRIPTION')} />
        <link rel="icon" href={withBasePath('/favicon.ico')} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script>
      </body>
    </Html>
  );
}
