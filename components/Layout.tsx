import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 w-full pb-16 md:pb-0">
        {children}
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
};

export default Layout;