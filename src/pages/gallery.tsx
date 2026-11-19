import { classNames, LINKS, withBasePath } from '@constants';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { GALLERY_IMAGES, sphereflakeSmall } from '../assets/gallery';
import {
  GalleryCaption, GalleryImageLink, GalleryItem, GalleryLab, GalleryViewer, RenderMode,
} from '../components/gallery';
import gallery from '../gallery.json';

const CATEGORIES = ['all', 'engineering', 'procedural', 'rendering', 'analysis'];

// The first item leads the page; wide cards come first so they start a row
const [hero, ...rest]: GalleryItem[] = gallery.items;
const heroImage = GALLERY_IMAGES[hero.id];
const cards = [...rest].sort((a, b) => Number(!!b.wide) - Number(!!a.wide));
const { renderModes }: { renderModes: RenderMode[] } = gallery;

const STORIES = [
  { key: 'CODING', link: 'https://medium.com/@Mr_Jaypee/brl-cads-python-procedural-geometry-990e3c286a63' },
  { key: 'INTERFACES', link: 'https://lorenzopegorari.github.io/GSoC25-report/' },
  { key: 'GENERATORS', link: `${LINKS.DOCS_HTML}articles/procedural_geometry.html` },
];

const Gallery: NextPage = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState('all');
  const [viewer, setViewer] = useState<{ items: GalleryItem[]; index: number } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const visibleCards = category === 'all' ? cards : cards.filter((card) => card.category === category);

  // Opening from the hero pages through everything shown; from a card, only the filtered cards
  const openViewer = (item: GalleryItem, link: HTMLElement) => {
    const items = item === hero ? [hero, ...visibleCards] : visibleCards;
    opener.current = link;
    setViewer({ items, index: items.indexOf(item) });
  };

  const changeImage = useCallback((index: number) => {
    setViewer((current) => current && { ...current, index });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer(null);
    if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <Head>
        <title>{`${t('GALLERY_PAGE.TITLE')} | ${t('TITLE')}`}</title>
      </Head>
      <div className="gallery">
        <section className="gallery-hero gallery-wrap" aria-labelledby="gallery-title">
          <div className="gallery-intro">
            <p className="gallery-eyebrow">{t('GALLERY_PAGE.EYEBROW')}</p>
            <h1 id="gallery-title">
              <Trans i18nKey="GALLERY_PAGE.HEADING" components={{ br: <br /> }} />
            </h1>
            <p className="gallery-deck">{t('GALLERY_PAGE.DECK')}</p>
            <p className="gallery-intro-text">{t('GALLERY_PAGE.INTRO')}</p>
            <a className="gallery-action" href="#collection">
              {t('GALLERY_PAGE.EXPLORE')} <span aria-hidden="true">&darr;</span>
            </a>
            <p className="gallery-intro-note">{t('GALLERY_PAGE.INTRO_NOTE')}</p>
          </div>
          <figure className="gallery-feature" id={hero.id}>
            <GalleryImageLink item={hero} onOpen={openViewer}>
              {/* next/image cannot build a srcset from two pre-sized files when unoptimized */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage.src}
                srcSet={`${sphereflakeSmall.src} ${sphereflakeSmall.width}w, ${heroImage.src} ${heroImage.width}w`}
                sizes="(max-width: 768px) 100vw, 60vw"
                alt={hero.alt}
                width={heroImage.width}
                height={heroImage.height}
                fetchPriority="high"
                decoding="async"
              />
            </GalleryImageLink>
            <figcaption>
              <GalleryCaption item={hero} heading="h2" />
            </figcaption>
          </figure>
        </section>

        <section className="gallery-wrap gallery-collection" id="collection" aria-labelledby="gallery-collection-title">
          <div className="gallery-section-heading">
            <div>
              <p className="gallery-eyebrow">{t('GALLERY_PAGE.COLLECTION.EYEBROW')}</p>
              <h2 id="gallery-collection-title">{t('GALLERY_PAGE.COLLECTION.TITLE')}</h2>
            </div>
            <p>{t('GALLERY_PAGE.COLLECTION.DESCRIPTION')}</p>
          </div>
          <div className="gallery-filter-bar">
            <div className="gallery-filters" role="group" aria-label={t('GALLERY_PAGE.COLLECTION.FILTER_LABEL')}>
              {CATEGORIES.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={value === category}
                  onClick={() => setCategory(value)}
                >
                  {t(`GALLERY_PAGE.CATEGORIES.${value.toUpperCase()}`)}
                </button>
              ))}
            </div>
            <p className="gallery-count" aria-live="polite" aria-atomic="true">
              {t('GALLERY_PAGE.COLLECTION.COUNT', { count: visibleCards.length })}
            </p>
          </div>
          <div className="gallery-grid">
            {visibleCards.map((item) => (
              <figure
                key={item.id}
                id={item.id}
                className={classNames('gallery-card', item.wide && category === 'all' && 'gallery-card--wide')}
              >
                <GalleryImageLink item={item} onOpen={openViewer}>
                  <Image
                    src={GALLERY_IMAGES[item.id]}
                    alt={item.alt}
                    sizes="(max-width: 550px) 100vw, (max-width: 1214px) 50vw, 33vw"
                  />
                </GalleryImageLink>
                <figcaption>
                  <GalleryCaption item={item} />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <GalleryLab modes={renderModes} />

        <section className="gallery-wrap gallery-community" aria-labelledby="gallery-community-title">
          <div className="gallery-section-heading">
            <div>
              <p className="gallery-eyebrow">{t('GALLERY_PAGE.COMMUNITY.EYEBROW')}</p>
              <h2 id="gallery-community-title">{t('GALLERY_PAGE.COMMUNITY.TITLE')}</h2>
            </div>
            <p>{t('GALLERY_PAGE.COMMUNITY.DESCRIPTION')}</p>
          </div>
          <div className="gallery-stories">
            {STORIES.map(({ key, link }) => (
              <a key={key} href={link}>
                <span className="gallery-eyebrow">{t(`GALLERY_PAGE.COMMUNITY.STORIES.${key}.EYEBROW`)}</span>
                <h3>{t(`GALLERY_PAGE.COMMUNITY.STORIES.${key}.TITLE`)}</h3>
                <p>{t(`GALLERY_PAGE.COMMUNITY.STORIES.${key}.DESCRIPTION`)}</p>
                <span className="gallery-story-link">
                  {t(`GALLERY_PAGE.COMMUNITY.STORIES.${key}.LINK`)} <span aria-hidden="true">&#8599;</span>
                </span>
              </a>
            ))}
          </div>
          <div className="gallery-submit">
            <div>
              <h3>{t('GALLERY_PAGE.COMMUNITY.SUBMIT.TITLE')}</h3>
              <p>{t('GALLERY_PAGE.COMMUNITY.SUBMIT.DESCRIPTION')}</p>
            </div>
            <Link className="gallery-action" href="/support/">
              {t('GALLERY_PAGE.COMMUNITY.SUBMIT.ACTION')} <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </section>

        <section className="gallery-wrap gallery-provenance" aria-labelledby="gallery-sources-title">
          <h2 id="gallery-sources-title">{t('GALLERY_PAGE.PROVENANCE.TITLE')}</h2>
          <p>{t('GALLERY_PAGE.PROVENANCE.DESCRIPTION')}</p>
          <p>{t('GALLERY_PAGE.PROVENANCE.ARCHIVE')}</p>
          <p>
            <a href={withBasePath('/gallery/SOURCES.md')}>{t('GALLERY_PAGE.PROVENANCE.CREDITS')}</a> &middot;{' '}
            <a href={withBasePath('/gallery/LICENSE.txt')}>{t('GALLERY_PAGE.PROVENANCE.LICENSE')}</a> &middot;{' '}
            <a href={LINKS.FACEBOOK}>{t('GALLERY_PAGE.PROVENANCE.FACEBOOK')}</a>
          </p>
        </section>

        <GalleryViewer
          items={viewer?.items ?? []}
          index={viewer?.index ?? null}
          onChange={changeImage}
          onClose={closeViewer}
        />
      </div>
    </>
  );
};

export default Gallery;
