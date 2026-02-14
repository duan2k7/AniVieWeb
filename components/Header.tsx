import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icons } from './Icons';

const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/tim-kiem?k=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };

    const navLinks = [
        { name: 'Trang Chủ', path: '/' },
        { name: 'Phim Lẻ', path: '/danh-sach/phim-le' },
        { name: 'Phim Bộ', path: '/danh-sach/phim-bo' },
        { name: 'TV Shows', path: '/danh-sach/tv-shows' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/[0.05]">
            <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-6">

                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-16">
                    <Link to="/" className="flex items-center gap-3 group transition-transform active:scale-95 shrink-0">
                        <div className="bg-blue-600 p-1.5 rounded-sm shadow-xl shadow-blue-500/20 group-hover:rotate-12 transition-all duration-300">
                            <Icons.Play size={20} className="text-white fill-current" />
                        </div>
                        <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic font-premium select-none">
                            Movie<span className="text-blue-500">Hub</span>
                        </span>
                    </Link>

                    <nav className="hidden xl:flex items-center gap-10">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-[12px] font-bold uppercase tracking-[0.3em] transition-all relative py-2 ${location.pathname === link.path ? 'text-blue-500' : 'text-zinc-400 hover:text-white'}`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-500 rounded-full"></span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right: Search & Actions */}
                <div className="flex items-center gap-4 flex-1 justify-end max-w-xl">
                    {/* Desktop Search */}
                    <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-full max-w-[320px] group">
                        <input
                            type="text"
                            placeholder="Khám phá kho tàng phim..."
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-full py-2.5 pl-11 pr-5 text-[11px] text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-medium placeholder:zinc-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Icons.Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                    </form>

                    {/* Mobile Search Toggle */}
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="md:hidden p-2.5 bg-white/[0.05] rounded-full text-zinc-400 hover:text-white transition-colors border border-white/[0.05]"
                    >
                        {isSearchOpen ? <Icons.X size={18} /> : <Icons.Search size={18} />}
                    </button>

                </div>
            </div>

            {/* Mobile Search Bar Expansion */}
            {isSearchOpen && (
                <div className="md:hidden px-6 pb-6 bg-black/95 backdrop-blur-xl border-b border-white/5 animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSearchSubmit} className="relative mt-2">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Bận đang muốn xem gì?"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-bold placeholder:zinc-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Icons.Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                    </form>
                </div>
            )}
        </header>
    );
};

export default Header;