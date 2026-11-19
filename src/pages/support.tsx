import { LINKS } from '@constants';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button, InfoCard, InfoIntro, PageHeader,
} from '../components/common';

const Support: NextPage = () => {
  const { t } = useTranslation();
  const steps = ['CONTEXT', 'REPRODUCE', 'DISCUSS'];

  return (
    <>
      <Head>
        <title>{`${t('SUPPORT_PAGE.TITLE')} | ${t('TITLE')}`}</title>
      </Head>
      <PageHeader title={t('SUPPORT_PAGE.TITLE')} />
      <div className="info-page">
        <InfoIntro
          eyebrow={t('SUPPORT_PAGE.EYEBROW')}
          heading={t('SUPPORT_PAGE.HEADING')}
          lead={t('SUPPORT_PAGE.LEAD')}
        />

        <section className="info-section info-panel">
          <h2>{t('SUPPORT_PAGE.CHAT.TITLE')}</h2>
          <p>
            <Trans i18nKey="SUPPORT_PAGE.CHAT.DESCRIPTION" components={{ strong: <strong /> }} />
          </p>
          <div className="info-actions">
            <Button elementType="a" href={LINKS.ZULIP_BRLCAD} className="brl-button--small brl-button--reverse">
              {t('SUPPORT_PAGE.CHAT.READ')}
            </Button>
            <Button elementType="a" href={LINKS.ZULIP_LOGIN} className="brl-button--small">
              {t('SUPPORT_PAGE.CHAT.LOGIN')}
            </Button>
          </div>
          <p className="info-note">
            <Trans
              i18nKey="SUPPORT_PAGE.CHAT.INVITE"
              components={{ mail: <Link className="info-link" href={LINKS.ZULIP_INVITE} /> }}
            />
          </p>
          <p className="info-note">
            <Trans
              i18nKey="SUPPORT_PAGE.CHAT.CHANNELS"
              components={{
                brlcad: <Link className="info-link" href={LINKS.ZULIP_BRLCAD} />,
                announce: <Link className="info-link" href={LINKS.ZULIP_ANNOUNCE} />,
                gsoc: <Link className="info-link" href={LINKS.ZULIP_GSOC} />,
              }}
            />
          </p>
        </section>

        <section className="info-section">
          <h2>{t('SUPPORT_PAGE.RESOURCES.TITLE')}</h2>
          <p>{t('SUPPORT_PAGE.RESOURCES.DESCRIPTION')}</p>
          <div className="info-grid">
            <InfoCard
              title={t('SUPPORT_PAGE.RESOURCES.DOCS.TITLE')}
              link={LINKS.DOCS}
              linkName={t('SUPPORT_PAGE.RESOURCES.DOCS.LINK')}
            >
              <p>{t('SUPPORT_PAGE.RESOURCES.DOCS.DESCRIPTION')}</p>
            </InfoCard>
            <InfoCard
              title={t('SUPPORT_PAGE.RESOURCES.ARCHIVE.TITLE')}
              link={LINKS.MAILING_LIST}
              linkName={t('SUPPORT_PAGE.RESOURCES.ARCHIVE.LINK')}
            >
              <p>{t('SUPPORT_PAGE.RESOURCES.ARCHIVE.DESCRIPTION')}</p>
            </InfoCard>
          </div>
        </section>

        <section className="info-section">
          <h2>{t('SUPPORT_PAGE.QUESTION.TITLE')}</h2>
          <div className="info-grid info-grid--three">
            {steps.map((step) => (
              <InfoCard
                key={step}
                step={t(`SUPPORT_PAGE.QUESTION.${step}.STEP`)}
                title={t(`SUPPORT_PAGE.QUESTION.${step}.TITLE`)}
              >
                <p>{t(`SUPPORT_PAGE.QUESTION.${step}.DESCRIPTION`)}</p>
              </InfoCard>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Support;
