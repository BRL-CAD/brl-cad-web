import { LINKS } from '@constants';
import Image from 'next/image';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { GALLERY_IMAGES } from '../../assets/gallery';
import { RenderMode } from './utils';

interface IProps {
  modes: RenderMode[];
}

// The same scene rendered several ways, one view at a time
export const GalleryLab: React.FC<IProps> = ({ modes }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(modes[0].id);

  return (
    <section className="gallery-lab" aria-labelledby="gallery-lab-title">
      <div className="gallery-wrap">
        <div className="gallery-section-heading">
          <div>
            <p className="gallery-eyebrow">{t('GALLERY_PAGE.LAB.EYEBROW')}</p>
            <h2 id="gallery-lab-title">
              <Trans i18nKey="GALLERY_PAGE.LAB.TITLE" components={{ br: <br /> }} />
            </h2>
          </div>
          <p>{t('GALLERY_PAGE.LAB.DESCRIPTION')}</p>
        </div>
        <div className="gallery-mode-controls" role="group" aria-label={t('GALLERY_PAGE.LAB.CONTROLS_LABEL')}>
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              aria-pressed={mode.id === selected}
              onClick={() => setSelected(mode.id)}
            >
              {mode.title}
            </button>
          ))}
        </div>
        <div className="gallery-modes" aria-live="polite" aria-atomic="true">
          {modes.map((mode) => (
            <figure key={mode.id} className="gallery-mode" hidden={mode.id !== selected}>
              <Image src={GALLERY_IMAGES[mode.id]} alt={mode.alt} sizes="(max-width: 768px) 100vw, 512px" />
              <figcaption>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
                <code>{mode.command}</code>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="gallery-lab-source">
          {t('GALLERY_PAGE.LAB.SOURCE')} &middot;{' '}
          <a href={`${LINKS.DOCS_HTML}articles/renderer_showcase.html`}>
            {t('GALLERY_PAGE.LAB.SOURCE_LINK')} <span aria-hidden="true">&#8599;</span>
          </a>
        </p>
      </div>
    </section>
  );
};
