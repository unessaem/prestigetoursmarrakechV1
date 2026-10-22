import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import AppProvider from "./context/AppContext";
import App from "./App";
import metaFor, { allRoutes, headTags, ORIGIN } from "./lib/seo";

export { allRoutes, ORIGIN };

/** Rend une page complète (HTML + balises <head>) pour une URL donnée. */
export function render(url) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppProvider>
          <App />
        </AppProvider>
      </StaticRouter>
    </StrictMode>
  );

  const meta = metaFor(url);
  return { html, head: headTags(meta), lang: meta.lang, meta };
}
