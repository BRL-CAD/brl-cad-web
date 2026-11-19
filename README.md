# BRL-CAD Web 2022

[![IRC](https://img.shields.io/badge/chat-on%20irc%20channel-green.svg)](http://webchat.freenode.net/?channels=#brlcad)
[![IRC](https://img.shields.io/badge/join-mailing%20list-green.svg)](https://lists.sourceforge.net/lists/listinfo/brlcad-devel)
[![IRC](https://img.shields.io/badge/chat-zulip-green.svg)](https://brlcad.zulipchat.com/)

This is the official website of BRL-CAD community, where users can access some details about this community. User can view the history and details bout the BRL-CAD project and images using gallery.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup and Run](#setup-and-run)
- [Lint](#lint)
- [Build and Deploy](#build-and-deploy)
<!-- - [Contribution](#contribution) -->
- [Learn More](#learn-more)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js 26 (LTS) or newer - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. With [nvm](https://github.com/nvm-sh/nvm), run `nvm install` in the project folder to get the version from `.nvmrc`. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

## Installation

Clone this repo

```sh
git clone https://github.com/divyanshugarg36/brl-cad-web.git
```

###### Install Nodejs :
```
sudo apt-get install nodejs
```
###### Clone the BRL-CAD Web Repository
```
sudo apt-get install git
git clone https://github.com/divyanshugarg36/brl-cad-web
```

## Setup and Run
Run this command
```
npm run dev
```

Then open Browser and type in URL
```
http://localhost:5000
```

## Lint
To run ESlint check run 
```
npm run lint 
```

## Build and deploy
To build BRL-CAD Web run build script 
```
npm run build
```
This generates a static export in the `out` folder. To preview it locally run
```
npm start
```
and open `http://localhost:5000`.

The site is deployed as static files served by nginx in a FreeBSD jail managed with Bastille. See [bastille/README.md](bastille/README.md).

To serve the export from a subdirectory, set `BASE_PATH` when building, e.g. `BASE_PATH=/~user npm run build`.

## Gallery
The gallery page reads its pieces and render modes from `src/gallery.json`. Previews live in `src/assets/gallery/` (registered in its `index.ts`), and the recovered full-resolution originals and provenance notes live in `public/gallery/`.

To add a piece, add its entry to `src/gallery.json`, add a WebP preview named after its `id`, and register it in `src/assets/gallery/index.ts`. Keep the credit and source details: the captions link to them. Previews are generated from the BRL-CAD documentation sources with `tools/build-gallery.mjs` in [BRL-CAD/web](https://github.com/BRL-CAD/web), which also verifies the archived originals.

<!-- ## Contribution
Please see [CONTRIBUTION.md](CONTRIBUTING.md) -->

## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
