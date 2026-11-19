import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { GALLERY_IMAGES } from '../../assets/gallery';
import { GalleryCaption } from './GalleryCaption';
import { fullImageLink, GalleryItem } from './utils';

interface IProps {
  items: GalleryItem[];
  index: number | null;
  onChange: (_index: number) => void;
  onClose: () => void;
}

export const GalleryViewer: React.FC<IProps> = ({
  items, index, onChange, onClose,
}) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const item = index === null ? undefined : items[index];
  const isOpen = !!item;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('has-gallery-viewer');
      closeRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => () => document.body.classList.remove('has-gallery-viewer'), []);

  useEffect(() => {
    if (layoutRef.current) layoutRef.current.scrollTop = 0;
  }, [index]);

  // Arrow keys step through the selection; a click on the backdrop closes the viewer
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || index === null) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      onChange((index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length);
    };
    const handleClick = (event: MouseEvent) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    };

    dialog.addEventListener('keydown', handleKeyDown);
    dialog.addEventListener('click', handleClick);
    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
      dialog.removeEventListener('click', handleClick);
    };
  }, [index, items.length, onChange]);

  const step = (delta: number) => {
    if (index !== null) onChange((index + delta + items.length) % items.length);
  };

  const handleClose = () => {
    document.body.classList.remove('has-gallery-viewer');
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="gallery-viewer" aria-labelledby="gallery-viewer-title" onClose={handleClose}>
      <button
        ref={closeRef}
        className="gallery-close"
        type="button"
        aria-label={t('GALLERY_PAGE.VIEWER.CLOSE_LABEL')}
        onClick={() => dialogRef.current?.close()}
      >
        {t('GALLERY_PAGE.VIEWER.CLOSE')} <span aria-hidden="true">&times;</span>
      </button>
      {item && index !== null && (
        <>
          <div className="gallery-viewer-layout" ref={layoutRef}>
            <Image
              className="gallery-viewer-image"
              src={GALLERY_IMAGES[item.id]}
              alt={item.alt}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="gallery-viewer-caption">
              <GalleryCaption item={item} heading="h2" headingId="gallery-viewer-title" />
              <a className="gallery-original" href={fullImageLink(item)}>
                {t('GALLERY_PAGE.VIEWER.ORIGINAL')} <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
          <div className="gallery-viewer-nav">
            <button type="button" aria-label={t('GALLERY_PAGE.VIEWER.PREVIOUS_LABEL')} onClick={() => step(-1)}>
              <span aria-hidden="true">&larr;</span> {t('GALLERY_PAGE.VIEWER.PREVIOUS')}
            </button>
            <p className="gallery-viewer-counter" aria-live="polite" aria-atomic="true">
              {index + 1} / {items.length}
              <span className="gallery-viewer-announcement"> &mdash; {item.title}</span>
            </p>
            <button type="button" aria-label={t('GALLERY_PAGE.VIEWER.NEXT_LABEL')} onClick={() => step(1)}>
              {t('GALLERY_PAGE.VIEWER.NEXT')} <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </>
      )}
    </dialog>
  );
};
