import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          {/* Brand Segment */}
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="inline-block group">
              <span className="text-3xl font-black tracking-tighter text-white uppercase italic font-premium flex items-center gap-1 transition-transform group-hover:scale-105">
                Ani<span className="text-blue-600">Vie</span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
              Nền tảng xem Anime trực tuyến chất lượng cao, mang đến trải nghiệm điện ảnh đích thực với kho nội dung Anime và hoạt hình đa dạng nhất.
            </p>
          </div>

          {/* Navigation Segments */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-6">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-40 block">Khám phá</span>
              <ul className="space-y-4">
                <li><Link to="/" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 inline-block">Trang chủ</Link></li>
                <li><Link to="/danh-sach/hoat-hinh" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 inline-block">Anime bộ</Link></li>
                <li><Link to="/danh-sach/phim-moi" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 inline-block">Mới cập nhật</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-40 block">Liên kết</span>
              <ul className="space-y-4">
                <li><Link to="/danh-sach/hoat-hinh" className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-1 inline-block">Hoạt hình</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;