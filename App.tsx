import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import Catalog from './pages/Catalog';

const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phim/:slug" element={<MovieDetail />} />
          <Route path="/xem-phim/:slug/:episodeSlug" element={<Watch />} />

          <Route path="/danh-sach/:category" element={<Catalog type="category" />} />
          <Route path="/tim-kiem" element={<Catalog type="search" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;