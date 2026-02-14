import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Watch = lazy(() => import('./pages/Watch'));
const Catalog = lazy(() => import('./pages/Catalog'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phim/:slug" element={<MovieDetail />} />
            <Route path="/xem-phim/:slug/:episodeSlug" element={<Watch />} />

            <Route path="/danh-sach/:category" element={<Catalog type="category" />} />
            <Route path="/tim-kiem" element={<Catalog type="search" />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};

export default App;