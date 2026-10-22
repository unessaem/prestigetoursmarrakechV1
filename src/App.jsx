import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Seo from "./components/Seo";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { LANGS, path } from "./lib/routes";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const localizedRoutes = LANGS.flatMap((l) => [
  <Route key={`${l}-home`} path={path(l, "home")} element={<Home />} />,
  <Route key={`${l}-tours`} path={path(l, "tours")} element={<Tours />} />,
  <Route key={`${l}-tour`} path={`${path(l, "tours")}/:slug`} element={<TourDetail />} />,
  <Route key={`${l}-about`} path={path(l, "about")} element={<About />} />,
  <Route key={`${l}-contact`} path={path(l, "contact")} element={<Contact />} />,
]);

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Seo />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {localizedRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <QuoteModal />
    </div>
  );
}
