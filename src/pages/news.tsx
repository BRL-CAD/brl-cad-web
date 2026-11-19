import { formatDate, LINKS, releaseNotesLink } from '@constants';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button, InfoCard, InfoIntro, PageHeader,
} from '../components/common';
import releases from '../releases.json';

const News: NextPage = () => {
  const { t } = useTranslation();
  const updateDate = t('NEWS_PAGE.UPDATE.DATE');

  return (
    <>
      <Head>
        <title>{`${t('NEWS_PAGE.TITLE')} | ${t('TITLE')}`}</title>
      </Head>
      <PageHeader title={t('NEWS_PAGE.TITLE')} />
      <div className="info-page">
        <InfoIntro eyebrow={t('NEWS_PAGE.EYEBROW')} lead={t('NEWS_PAGE.LEAD')}>
          <Button elementType="a" href="#releases" className="brl-button--small brl-button--reverse">
            {t('NEWS_PAGE.RELEASE_NEWS')}
          </Button>
          <Button elementType="a" href={LINKS.DOWNLOAD} className="brl-button--small">
            {t('NEWS_PAGE.DOWNLOAD_PACKAGES')}
          </Button>
          <Button elementType="a" href="#follow" className="brl-button--small">
            {t('NEWS_PAGE.FOLLOW_DEVELOPMENT')}
          </Button>
        </InfoIntro>

        <article className="info-section info-panel">
          <p className="info-eyebrow">
            <time dateTime={updateDate}>{formatDate(updateDate)}</time> &middot; {t('NEWS_PAGE.UPDATE.CATEGORY')}
          </p>
          <h2>{t('NEWS_PAGE.UPDATE.TITLE')}</h2>
          <p>
            <Trans
              i18nKey="NEWS_PAGE.UPDATE.DESCRIPTION"
              components={{
                docs: <Link className="info-link" href={LINKS.DOCS} />,
                gallery: <Link className="info-link" href="/gallery/" />,
                support: <Link className="info-link" href="/support/" />,
              }}
            />
          </p>
        </article>

        <section className="info-section" id="releases">
          <h2>{t('NEWS_PAGE.RELEASES.TITLE')}</h2>
          <p>{t('NEWS_PAGE.RELEASES.DESCRIPTION')}</p>
          <div className="info-grid info-grid--three">
            {releases.map(({ version, date, summary }) => (
              <InfoCard
                key={version}
                title={`BRL-CAD ${version}`}
                note={<time dateTime={date}>{formatDate(date)}</time>}
                link={releaseNotesLink(version)}
                linkName={t('NEWS_PAGE.RELEASES.READ_NOTES', { version })}
              >
                <p>{summary}</p>
              </InfoCard>
            ))}
          </div>
          <p className="info-note">
            <Trans
              i18nKey="NEWS_PAGE.RELEASES.NOTE"
              components={{
                download: <Link className="info-link" href={LINKS.DOWNLOAD} />,
                tags: <Link className="info-link" href={LINKS.RELEASE_TAGS} />,
              }}
            />
          </p>
        </section>

        <section className="info-section" id="follow">
          <h2>{t('NEWS_PAGE.FOLLOW.TITLE')}</h2>
          <div className="info-grid">
            <InfoCard
              title={t('NEWS_PAGE.FOLLOW.DEVELOPMENT.TITLE')}
              link={LINKS.DEVELOPMENT}
              linkName={t('NEWS_PAGE.FOLLOW.DEVELOPMENT.LINK')}
            >
              <p>
                <Trans
                  i18nKey="NEWS_PAGE.FOLLOW.DEVELOPMENT.DESCRIPTION"
                  components={{ source: <Link className="info-link" href={LINKS.SOURCE} /> }}
                />
              </p>
            </InfoCard>
            <InfoCard
              title={t('NEWS_PAGE.FOLLOW.ANNOUNCEMENTS.TITLE')}
              link={LINKS.ZULIP_ANNOUNCE}
              linkName={t('NEWS_PAGE.FOLLOW.ANNOUNCEMENTS.LINK')}
            >
              <p>
                <Trans
                  i18nKey="NEWS_PAGE.FOLLOW.ANNOUNCEMENTS.DESCRIPTION"
                  components={{ support: <Link className="info-link" href="/support/" /> }}
                />
              </p>
            </InfoCard>
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
