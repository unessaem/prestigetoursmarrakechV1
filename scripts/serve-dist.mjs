// Petit serveur local qui imite Cloudflare : compression brotli/gzip,
// /fr servi directement depuis /fr/index.html (sans redirection),
// cache long sur /assets, repli SPA sur index.html.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = Number(process.env.PORT || 4176);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".svg", ".xml", ".txt", ".json"]);

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/index.html";
  const candidates = [
    path.join(DIST, clean),
    path.join(DIST, clean, "index.html"),
    path.join(DIST, clean + ".html"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return path.join(DIST, "index.html");
}

http
  .createServer((req, res) => {
    const file = resolve(req.url);
    const ext = path.extname(file);
    const body = fs.readFileSync(file);
    const headers = {
      "Content-Type": TYPES[ext] || "application/octet-stream",
      "Cache-Control": file.includes(`${path.sep}assets${path.sep}`)
        ? "public, max-age=31536000, immutable"
        : ext === ".html"
          ? "public, max-age=0, must-revalidate"
          : "public, max-age=2592000",
    };

    const accept = req.headers["accept-encoding"] || "";
    if (COMPRESSIBLE.has(ext) && /br/.test(accept)) {
      res.writeHead(200, { ...headers, "Content-Encoding": "br" });
      res.end(zlib.brotliCompressSync(body));
    } else if (COMPRESSIBLE.has(ext) && /gzip/.test(accept)) {
      res.writeHead(200, { ...headers, "Content-Encoding": "gzip" });
      res.end(zlib.gzipSync(body));
    } else {
      res.writeHead(200, headers);
      res.end(body);
    }
  })
  .listen(PORT, () => console.log(`dist servi sur http://localhost:${PORT}`));
