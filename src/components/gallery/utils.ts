import { LINKS, withBasePath } from '@constants';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  credit: string;
  alt: string;
  width: number;
  height: number;
  sourcePath: string;
  sourceDocument?: string;
  origin?: string;
  wide?: boolean;
}

export interface RenderMode {
  id: string;
  title: string;
  description: string;
  sourcePath: string;
  command: string;
  alt: string;
}

// Recovered artwork ships with this site; everything else comes from the docs
export const isArchived = (item: GalleryItem) => item.origin === 'archive';

export const fullImageLink = (item: GalleryItem) => (isArchived(item)
  ? withBasePath(`/gallery/${item.sourcePath}`)
  : item.sourcePath.replace('doc/asciidoc/', LINKS.DOCS_HTML));

export const sourceLink = (item: GalleryItem) => (isArchived(item)
  ? withBasePath('/gallery/SOURCES.md')
  : `${LINKS.DOCS_HTML}${item.sourceDocument}`);
