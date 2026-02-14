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
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <Icons.Play size={20} className="text-blue-500 fill-blue-500" />
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            Movie<span className="text-blue-500">Hub</span>
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-blue-500 ${location.pathname === link.path ? 'text-blue-500' : 'text-zinc-500'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right: Search & Mobile Toggle */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                    {/* Desktop Search */}
                    <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-full max-w-[240px]">
                        <input
                            type="text"
                            placeholder="Tìm tên phim..."
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Icons.Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                    </form>

                    {/* Mobile Search Toggle */}
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="md:hidden p-2 text-zinc-400 hover:text-white"
                    >
                        {isSearchOpen ? <Icons.X size={20} /> : <Icons.Search size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar Expandable */}
            {isSearchOpen && (
                <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top duration-200">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Nhập tên phim cần tìm..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Icons.Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    </form>
                </div>
            )}
        </header>
    );
};

export default Header;