import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-zinc-500 text-sm">
            © 2026 <span className="text-zinc-300 font-bold">MovieHub</span>
          </div>
          <div className="flex gap-6 text-zinc-500 text-xs">
            <Link to="/" className="hover:text-zinc-300 transition-colors">Trang Chủ</Link>
            <Link to="/danh-sach/phim-le" className="hover:text-zinc-300 transition-colors">Danh Sách</Link>
            <Link to="#" className="hover:text-zinc-300 transition-colors">Điều Khoản</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;