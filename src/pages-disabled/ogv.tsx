'use client';

// TODO: OGV is not deployed yet, so this page is disabled.
// Move this file back to src/pages/ogv.tsx to restore the /ogv route.

// TODO: restore together with the "Try It Now" button once OGV is deployed
// import { LINKS } from '@constants';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import {
  instant3DFileConversion, instant3DPreview, interactive3DViewer,
} from '../assets/images';
import { HowToUseOGV } from '../components';
import {
  // Button,
  FAQ, HighlightBlock, PageHeader,
} from '../components/common';

const OGV = () => {
  const {t} = useTranslation();

  const highlights = [
    {
      image: instant3DFileConversion,
      title: t('OGV_HIGHLIGHTS.HIGHLIGHT_1.TITLE'),
      description: t('OGV_HIGHLIGHTS.HIGHLIGHT_1.DESCRIPTION'),
    },
    {
      image: interactive3DViewer,
      title: t('OGV_HIGHLIGHTS.HIGHLIGHT_2.TITLE'),
      description: t('OGV_HIGHLIGHTS.HIGHLIGHT_2.DESCRIPTION'),
    },
    {
      image: instant3DPreview,
      title: t('OGV_HIGHLIGHTS.HIGHLIGHT_3.TITLE'),
      description: t('OGV_HIGHLIGHTS.HIGHLIGHT_3.DESCRIPTION'),
    },
  ];
  const faq = [
    {
      question: t('OGV_FAQ.QUESTION_1.QUESTION'),
      answer: t('OGV_FAQ.QUESTION_1.ANSWER'),
    },
    {
      question: t('OGV_FAQ.QUESTION_2.QUESTION'),
      answer: t('OGV_FAQ.QUESTION_2.ANSWER'),
    },
    {
      question: t('OGV_FAQ.QUESTION_3.QUESTION'),
      answer: t('OGV_FAQ.QUESTION_3.ANSWER'),
    },
    {
      question: t('OGV_FAQ.QUESTION_4.QUESTION'),
      answer: t('OGV_FAQ.QUESTION_4.ANSWER'),
    },
    {
      question: t('OGV_FAQ.QUESTION_5.QUESTION'),
      answer: t('OGV_FAQ.QUESTION_5.ANSWER'),
    },
  ];
  return (
    <>
      <Head>
        <title>{t('TITLE')}</title>
      </Head>
      <PageHeader title={t('OGV.TITLE')} />
      {/* TODO: OGV is not deployed yet, restore this link once it is
      <div className="ogv-try-it-now-button-container">
        <Button
          elementType="a"
          href={LINKS.OGV_LINK}
          target="_blank"
          className="ogv-try-it-now-button"
        >
          {t('OGV.TRY_IT_NOW')}
        </Button>
      </div>
      */}
      <h1 className="ogv-heading">{t('OGV_HIGHLIGHTS.TITLE')}</h1>
      {highlights.map(({
        description, title, image,
      }, index) => (
        <HighlightBlock
          key={title}
          image={image}
          title={title}
          description={description}
          isReverse={!!(index % 2)}
        />
      ))}
      <div className="ogv-body">
        <h1 className="ogv-heading">{t('OGV.HOW_TO_USE')}</h1>
        <HowToUseOGV />
        <h1 className="ogv-heading">{t('OGV_FAQ.TITLE')}</h1>
        <div className="ogv-faq-container">
          {faq.map(({
            question, answer,
          }) => (
            <FAQ key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OGV;
