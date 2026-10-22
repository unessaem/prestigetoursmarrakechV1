import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./context/AppContext";
import App from "./App";
import "./index.css";

const tree = (
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);

const container = document.getElementById("root");

// Les pages sont pré-rendues au build (scripts/prerender.mjs) : on « hydrate »
// le HTML déjà présent au lieu de tout reconstruire, ce qui évite le flash
// blanc et rend le contenu lisible par Google même sans JavaScript.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
