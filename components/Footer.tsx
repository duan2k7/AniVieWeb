import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.05] py-20">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic font-premium block">
              Movie<span className="text-blue-500">Hub</span>
            </span>
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] italic">Trải nghiệm điện ảnh đỉnh cao</p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Khám phá</span>
              <Link to="/" className="text-zinc-500 hover:text-blue-500 text-[11px] font-bold uppercase tracking-widest transition-colors font-premium">Trang chủ</Link>
              <Link to="/danh-sach/phim-le" className="text-zinc-500 hover:text-blue-500 text-[11px] font-bold uppercase tracking-widest transition-colors font-premium">Phim lẻ</Link>
              <Link to="/danh-sach/phim-bo" className="text-zinc-500 hover:text-blue-500 text-[11px] font-bold uppercase tracking-widest transition-colors font-premium">Phim bộ</Link>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Pháp lý</span>
              <Link to="#" className="text-zinc-500 hover:text-blue-500 text-[11px] font-bold uppercase tracking-widest transition-colors font-premium">Điều khoản</Link>
              <Link to="#" className="text-zinc-500 hover:text-blue-500 text-[11px] font-bold uppercase tracking-widest transition-colors font-premium">Bảo mật</Link>
              <Link to="#" className="text-zinc-500 hover:text-blue-500 text-[11px] font-bold uppercase tracking-widest transition-colors font-premium">Khiếu nại</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/[0.03] flex justify-between items-center text-zinc-700">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">© 2026 MovieHub Creative Studio</span>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] font-premium">Dựng bởi Antigravity</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;