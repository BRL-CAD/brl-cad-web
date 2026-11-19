import type { StaticImageData } from 'next/image';

import bearing from './bearing.webp';
import chainmail from './chainmail.webp';
import earth from './earth.webp';
import edges from './edges.webp';
import gyroid from './gyroid.webp';
import lattice from './lattice.webp';
import nautilus from './nautilus.webp';
import normals from './normals.webp';
import pen from './pen.webp';
import shaded from './shaded.webp';
import sphereflake from './sphereflake.webp';
import sphereflakeSmall from './sphereflake-700.webp';
import stryker from './stryker.webp';
import uv from './uv.webp';

// Previews keyed by the item and render-mode ids in gallery.json
export const GALLERY_IMAGES: Record<string, StaticImageData> = {
  bearing,
  chainmail,
  earth,
  edges,
  gyroid,
  lattice,
  nautilus,
  normals,
  pen,
  shaded,
  sphereflake,
  stryker,
  uv,
};

// Smaller hero variant for narrow screens
export { sphereflakeSmall };
