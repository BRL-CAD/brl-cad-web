import React from 'react';
import { useTranslation } from 'react-i18next';

import { fullImageLink, GalleryItem } from './utils';

interface IProps {
  item: GalleryItem;
  onOpen: (_item: GalleryItem, _opener: HTMLElement) => void;
  children: React.ReactNode;
}

// Links to the full-resolution image, so it still works when opened in a new tab
export const GalleryImageLink: React.FC<IProps> = ({ item, onOpen, children }) => {
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.button !== 0 || isModified) return;
    event.preventDefault();
    onOpen(item, event.currentTarget);
  };

  return (
    <a
      className="gallery-image-link"
      href={fullImageLink(item)}
      aria-label={t('GALLERY_PAGE.CAPTION.ENLARGE', { title: item.title })}
      onClick={handleClick}
    >
      {children}
      <span className="gallery-enlarge" aria-hidden="true">&#8599;</span>
    </a>
  );
};
