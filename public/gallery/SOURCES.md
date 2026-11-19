# Gallery sources and curation

This is a deliberately selected collection, not an automatic import of everything
that can be found under the BRL-CAD name. It combines archival high-resolution
project imagery with procedural geometry and renderer examples present in the
current source documentation. It does not pass historic work off as newly made.

All displayed images were visually reviewed. No AI imagery, unrelated CAD
renders, stock images, authenticated chat uploads, or uncredited social-media
copies are included.

## Image provenance

### Documentation images

The documentation source snapshot is BRL-CAD commit
`bc130e1e7a9f179fe95fb42cde1a7d3becb512df`.
`collection.json` records the exact source file, dimensions, description, and
documentation context for each piece. `source-hashes.json` records SHA-256 hashes
of the unchanged source PNGs. The site's HTML documentation distributes those
originals; the gallery serves smaller WebP previews.

Primary source repository:
[BRL-CAD source at the pinned commit](https://git.brlcad.org/BRL-CAD/brlcad/src/commit/bc130e1e7a9f179fe95fb42cde1a7d3becb512df/doc/asciidoc).

- Sphereflake, acrylic bearing, and Stryker come from
  [HACKING BRL-CAD](../docs/html/books/HACKING_BRL-CAD.html), feature overview.
  The source identifies these images by subject, not a separate individual
  artist. The gallery credits the documentation contributors rather than
  inventing an artist attribution. The Stryker image itself credits the
  2004 U.S. Army Research Laboratory; its complete original credit line is
  retained in the preview and source image.
- Nautilus, geodesic lattice, gyroid, and torus chainmail come from
  [BRL-CAD Procedural Geometry Gallery](../docs/html/articles/procedural_geometry.html).
  These are the source project's committed demonstration snapshots, not renders
  newly produced for this website. Several less successful/noisy examples were
  deliberately omitted.
- Shaded, surface-normal, edge, and surface-coordinate views come from
  [BRL-CAD Renderer Showcase](../docs/html/articles/renderer_showcase.html).
  They use the same model and saved view. The almost-white depth snapshot and
  deliberately low-sample photon-map snapshot were omitted in favor of views
  with a clear visual result.

BRL-CAD's [COPYING](https://git.brlcad.org/BRL-CAD/brlcad/src/commit/bc130e1e7a9f179fe95fb42cde1a7d3becb512df/COPYING)
states that documentation in `doc/` is provided under the BSD Documentation
License or public domain unless otherwise denoted. These selected documentation
images have no more specific license notice in their source documents. The
applicable documentation license is reproduced in [LICENSE.txt](LICENSE.txt).
The project copyright notice is retained there. This does not assert that all
imagery ever posted by the community has the same license.

### Recovered official-gallery artwork

Earth and the transparent pen were recovered from the site's legacy Piwigo
galleries on 18 October 2026, at the website maintainer's explicit request.
The two legacy trees contained the same 1,936 image files, including 105 distinct
originals. Each original was visually reviewed; only these two were selected to
complement the existing collection. The duplicate Sphereflake scene, ordinary
blue hub, old interface screenshots and repeated military views were excluded.
The awkward teapot view and small gears demonstration were also removed from
the surfaced collection; their documentation originals remain available.

- [Earth cutaway: unchanged original PNG](originals/earth.png), 2048 × 2048,
  2,544,793 bytes. Historical locations:
  `/gallery/galleries/renderings/earth.png` and
  `/g/galleries/renderings/earth.png`.
  SHA-256: `7b479332732bb93c9b7022cddda8978775d1fe2f2b485e897d8fe38af890f5f0`.
- [Transparent pen: unchanged original PNG](originals/pen.png), 2048 × 2048,
  673,806 bytes. Historical locations:
  `/gallery/galleries/renderings/pen.png` and
  `/g/galleries/renderings/pen.png`.
  SHA-256: `a33b593cdf483eed089098823b840c273bcb7bd4dbceac1685139c38f746396f`.

The recovered files do not identify their individual creators, original dates
or artwork licenses. Their captions therefore credit the historical official
BRL-CAD gallery, not an invented artist. The website maintainer authorized their
display here; this is not a claim of a general reuse license. Neither the BSD
documentation license below nor Piwigo's GPL software license is applied to
these images. Please contact the BRL-CAD project before reusing this artwork.

[archive.json](archive.json) records exact original hashes, sizes, dimensions
and both historical paths. Those paths are provenance, not working links into
the retired gallery. Full-resolution links point to the preserved public copies
under `gallery/originals/`, never to the private Attic staging directory.

## Research scope and exclusions

Research covered the former official gallery (including its archived GitHub Pages
index), the current source documentation, Wikimedia Commons, the official
U.S. Army feature, public contributor reports, official Facebook destinations,
and BRL-CAD's Zulip realm.

- The historical gallery mirror currently returns HTTP 404 despite remaining
  in search indexes. It is not used as the sole source for displayed images.
- The [official U.S. Army article](https://www.army.mil/article/92288/brl_cad_the_worlds_oldest_open_source_software_system)
  provides independent public context for BRL-CAD imagery and use, but no extra
  government marks or unrelated military photographs were copied.
- The [public developer discussion on non-photorealistic rendering](https://sourceforge.net/p/brlcad/mailman/brlcad-devel/thread/E9835508-DEE4-4343-A1A5-76C003B8A088%40mac.com/)
  cites an [official Facebook photo](https://www.facebook.com/brlcad/photos/10155080800198873/)
  and the Bradley RTWizard example. The Facebook page does not expose a useful
  public image/caption in this environment. No image was scraped around a
  login boundary.
- Private Zulip uploads were not fetched, guessed, or republished. Public channel
  reading and participation are available through the site's [Support](../support/)
  page; a public chat attachment alone is not evidence of permission to reuse it.
- Wikimedia's BRL-CAD category is largely tiny icons and obsolete interface
  screenshots, not material strong enough for the main collection.
- Many web image results are from other CAD products. They were rejected even
  when visually attractive: this gallery shows BRL-CAD work.

Public community stories are linked, not copied or embedded:

- [Jaipal Singh: Python procedural geometry](https://medium.com/@Mr_Jaypee/brl-cads-python-procedural-geometry-990e3c286a63)
  (2018). The linked article's code examples are historical and are not presented
  here as a supported current Python installation guide.
- [Lorenzo Pegorari: Arbalest project report](https://lorenzopegorari.github.io/GSoC25-report/)
  (2025). Its interface screenshots remain at the author's original site.

A future contributor submission should include the original model or rendering
method, creator credit, source URL, and explicit permission or a reusable
license. An attractive image without these facts is not ready to feature.

## Rebuilding

The ordinary site build does not fetch remote assets or require image software:

```sh
node tools/build-gallery.mjs
node tools/build-gallery.mjs --check
node tools/build.mjs
```

To deliberately reimport previews from the exact pinned source checkout, install
the WebP tools and run:

```sh
node tools/build-gallery.mjs --import=/absolute/path/to/brlcad
```

The importer verifies the source commit, validates paths, converts only the
manifest's images, and records source hashes. It never modifies the source tree.
The two recovered originals are kept in this repository rather than fetched
from retired gallery URLs. Their hashes are verified on every gallery build;
the importer also regenerates their WebP previews from those local originals.
