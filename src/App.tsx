import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import News from './sections/News';
import NewsCenter from './sections/NewsCenter';
import Curriculum from './sections/Curriculum';
import CinematicVision from './sections/CinematicVision';
import Audience from './sections/Audience';
import AlumniArchives from './sections/AlumniArchives';
import Footer from './sections/Footer';
import CapabilityDetail from './sections/CapabilityDetail';
import AboutPage from './sections/AboutPage';
import TeamPage from './sections/TeamPage';
import FounderDetail from './sections/FounderDetail';
import CareersPage from './sections/CareersPage';
import ProductsPage from './sections/ProductsPage';
import ProductDetail from './sections/ProductDetail';
import PracticePage from './sections/PracticePage';
import InvestorsPage from './sections/InvestorsPage';
import PointerTrail from './components/PointerTrail';

function RouteScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <div className="app-shell">
      <Navigation />
      <main>
        <Hero />
        <News />
        <Curriculum />
        <CinematicVision />
        <Audience />
        <AlumniArchives />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <RouteScrollReset />
      <PointerTrail />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsCenter />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<Navigate to="/about/profile" replace />} />
        <Route path="/about/team" element={<TeamPage />} />
        <Route path="/about/team/:slug" element={<FounderDetail />} />
        <Route path="/about/:section" element={<AboutPage />} />
        <Route path="/careers" element={<Navigate to="/careers/positions" replace />} />
        <Route path="/careers/:section" element={<CareersPage />} />
        <Route path="/capability/:slug" element={<CapabilityDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
