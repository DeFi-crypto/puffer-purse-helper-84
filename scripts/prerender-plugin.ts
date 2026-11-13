import { build, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

interface PageMeta {
  path: string;
  title: string;
  description: string;
  index: boolean;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Replace the content/href of one tag in the HTML template. Throws if the tag is missing. */
const setTag = (html: string, pattern: RegExp, replacement: string) => {
  if (!pattern.test(html)) throw new Error(`prerender: tag not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement);
};

/**
 * After the normal client build, renders every page in src/lib/site.ts to static HTML with its
 * own title, description, canonical and JSON-LD, and writes sitemap.xml and a real 404.html.
 * Runs as part of plain `vite build`, so it works on any host.
 */
export const prerender = (): Plugin => {
  let root = process.cwd();
  let outDir = 'dist';
  let skip = false;

  return {
    name: 'minny-prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
      skip = !!config.build.ssr || config.mode === 'development';
    },
    async closeBundle() {
      if (skip) return;
      const serverDir = path.resolve(root, 'node_modules/.minny-prerender');

      await build({
        root,
        configFile: false,
        logLevel: 'warn',
        plugins: [react()],
        resolve: { alias: { '@': path.resolve(root, 'src') } },
        build: { ssr: 'src/entry-server.tsx', outDir: serverDir, emptyOutDir: true },
      });

      const server = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);
      const pages: PageMeta[] = server.PAGES;
      const priceCents: number = await server.getPriceCents();
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');

      const renderPage = (meta: PageMeta, routePath: string, canonical: string | null) => {
        let html = template;
        const title = esc(meta.title);
        const desc = esc(meta.description);
        html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
        html = setTag(html, /(<meta name="description" content=")[^"]*"/, `$1${desc}"`);
        html = setTag(html, /(<meta name="robots" content=")[^"]*"/, `$1${meta.index ? 'index, follow, max-image-preview:large' : 'noindex, follow'}"`);
        html = setTag(html, /(<meta property="og:title" content=")[^"]*"/, `$1${title}"`);
        html = setTag(html, /(<meta property="og:description" content=")[^"]*"/, `$1${desc}"`);
        html = setTag(html, /(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`);
        html = setTag(html, /(<meta name="twitter:description" content=")[^"]*"/, `$1${desc}"`);
        if (canonical) {
          html = setTag(html, /(<link rel="canonical" href=")[^"]*"/, `$1${canonical}"`);
          html = setTag(html, /(<meta property="og:url" content=")[^"]*"/, `$1${canonical}"`);
        } else {
          html = setTag(html, /\s*<link rel="canonical"[^>]*>/, '');
          html = setTag(html, /\s*<meta property="og:url"[^>]*>/, '');
        }
        const data = canonical ? server.buildStructuredData(meta.path, priceCents) : null;
        if (data) {
          const json = JSON.stringify(data).replace(/</g, '\\u003c');
          html = html.replace('</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`);
        }
        return setTag(html, /<div id="root"><\/div>/, `<div id="root">${server.render(routePath)}</div>`);
      };

      for (const meta of pages) {
        const file = meta.path === '/' ? 'index.html' : path.join(meta.path.slice(1), 'index.html');
        const dest = path.join(outDir, file);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, renderPage(meta, meta.path, server.absoluteUrl(meta.path)));
      }

      fs.writeFileSync(
        path.join(outDir, '404.html'),
        renderPage(server.NOT_FOUND_META, '/__not-found__', null)
      );

      const urls = pages
        .filter((p) => p.index)
        .map((p) => `  <url>\n    <loc>${server.absoluteUrl(p.path)}</loc>\n  </url>`)
        .join('\n');
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );

      fs.rmSync(serverDir, { recursive: true, force: true });
      console.log(`prerendered ${pages.length} pages + 404.html + sitemap.xml (price ${priceCents}¢)`);
    },
  };
};
