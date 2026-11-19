import { LINKS } from '@constants';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button, InfoCard, InfoIntro, PageHeader,
} from '../components/common';

const About: NextPage = () => {
  const { t } = useTranslation();
  const capabilities = [
    { key: 'MODELING', link: `${LINKS.DOCS_HTML}lessons/mged05_learning_boolean_expressions.html` },
    { key: 'ANALYSIS', link: `${LINKS.DOCS_HTML}man1/gqa.html` },
    { key: 'PROGRAMMING', link: `${LINKS.DOCS_HTML}devguides/api_reference.html` },
  ];

  return (
    <>
      <Head>
        <title>{`${t('ABOUT_PAGE.TITLE')} | ${t('TITLE')}`}</title>
      </Head>
      <PageHeader title={t('ABOUT_PAGE.TITLE')} />
      <div className="info-page">
        <InfoIntro
          eyebrow={t('ABOUT_PAGE.EYEBROW')}
          heading={t('ABOUT_PAGE.HEADING')}
          lead={t('ABOUT_PAGE.LEAD')}
        >
          <Button elementType="a" href={LINKS.DOWNLOAD} className="brl-button--small brl-button--reverse">
            {t('ABOUT_PAGE.GET_BRLCAD')}
          </Button>
          <Button elementType="a" href={`${LINKS.DOCS_HTML}articles/about.html`} className="brl-button--small">
            {t('ABOUT_PAGE.OVERVIEW')}
          </Button>
        </InfoIntro>

        <section className="info-section">
          <h2>{t('ABOUT_PAGE.CAPABILITIES.TITLE')}</h2>
          <div className="info-grid info-grid--three">
            {capabilities.map(({ key, link }) => (
              <InfoCard
                key={key}
                title={t(`ABOUT_PAGE.CAPABILITIES.${key}.TITLE`)}
                link={link}
                linkName={t(`ABOUT_PAGE.CAPABILITIES.${key}.LINK`)}
              >
                <p>{t(`ABOUT_PAGE.CAPABILITIES.${key}.DESCRIPTION`)}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        <section className="info-section info-panel">
          <h2>{t('ABOUT_PAGE.EXAMPLES.TITLE')}</h2>
          <p>{t('ABOUT_PAGE.EXAMPLES.DESCRIPTION')}</p>
          <div className="info-actions">
            <Button elementType="a" href={LINKS.GALLERY} className="brl-button--small brl-button--reverse">
              {t('ABOUT_PAGE.EXAMPLES.GALLERY')}
            </Button>
            <Button elementType="a" href={`${LINKS.DOCS_HTML}lessons/mged01_creating_primitive_shapes.html`} className="brl-button--small">
              {t('ABOUT_PAGE.EXAMPLES.LESSON')}
            </Button>
          </div>
        </section>

        <section className="info-section">
          <h2>{t('ABOUT_PAGE.COMMUNITY.TITLE')}</h2>
          <p>
            <Trans
              i18nKey="ABOUT_PAGE.COMMUNITY.DESCRIPTION"
              components={{
                source: <Link className="info-link" href={LINKS.SOURCE} />,
                support: <Link className="info-link" href="/support/" />,
                guide: <Link className="info-link" href={`${LINKS.DOCS_HTML}devguides/getting_started_as_contributor.html`} />,
              }}
            />
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
