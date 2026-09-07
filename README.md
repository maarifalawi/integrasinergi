# Remix of Beranda Builder

Read the attached 00-KNOWLEDGE.md as the permanent design system for this

project, then read the attached 01-PHASE-1.md and build exactly what it

specifies, nothing else.

Scope lock:

- Only / (Beranda) gets real content. Create /tentang-kami, /layanan and

  /kontak as placeholder route components that render the shared shell and

  nothing else. Do not design them.

- Do not build the coverage map. Use the placeholder specified in Phase 1.

- Do not install or import GSAP in this phase.

- Do not add SEO metadata, JSON-LD, Open Graph, sitemap.xml or robots.txt yet.

- Do not add any section, stat row, marquee, eyebrow or component that

  01-PHASE-1.md does not explicitly ask for.

The 8 images are already in /public/img/. Reference them by the exact filenames

in the Phase 1 asset manifest. Do not generate, rename or substitute any image,

and never use a placeholder image service.

Follow the effort order in Phase 1: the hero, the SOC dark tile and the closing

band get the most attention. The map placeholder gets none, it is replaced later.

When done, reply with these four things and nothing else:

1. The surface sequence you actually shipped for Beranda, section by section.

2. Every Phase 1 acceptance check, each marked pass or fail. Report real

   failures. Do not mark something pass because it was intended.

3. Anything you deliberately did NOT do, and why.

4. Anything ambiguous that you had to decide yourself.

Do not start any other phase.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
