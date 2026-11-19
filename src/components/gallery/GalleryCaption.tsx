import React from 'react';
import { useTranslation } from 'react-i18next';

import { GalleryItem, isArchived, sourceLink } from './utils';

interface IProps {
  item: GalleryItem;
  heading?: 'h2' | 'h3';
  headingId?: string;
}

export const GalleryCaption: React.FC<IProps> = ({ item, heading: Heading = 'h3', headingId }) => {
  const { t } = useTranslation();

  return (
    <>
      <p className="gallery-kicker">{item.subtitle}</p>
      <Heading id={headingId}>{item.title}</Heading>
      <p className="gallery-description">{item.description}</p>
      <ul className="gallery-tags" aria-label={t('GALLERY_PAGE.CAPTION.TECHNIQUES')}>
        {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <p className="gallery-credit">
        {item.credit} &middot;{' '}
        <a href={sourceLink(item)}>
          {t(isArchived(item) ? 'GALLERY_PAGE.CAPTION.ARCHIVE_SOURCE' : 'GALLERY_PAGE.CAPTION.SOURCE')}
        </a>
      </p>
    </>
  );
};
