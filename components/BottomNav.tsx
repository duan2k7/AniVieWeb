import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';

const BottomNav: React.FC = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Khám phá', path: '/', icon: Icons.Home },
        { name: 'Phim Lẻ', path: '/danh-sach/phim-le', icon: Icons.Play },
        { name: 'Phim Bộ', path: '/danh-sach/phim-bo', icon: Icons.Play },
        { name: 'Tìm kiếm', path: '/tim-kiem', icon: Icons.Search },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-2xl border-t border-white/[0.05] z-50 px-8 py-3 pb-6">
            <div className="flex justify-between items-center max-w-sm mx-auto">
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group active:scale-90 ${location.pathname === link.path ? 'text-blue-500' : 'text-zinc-500 opacity-60'}`}
                    >
                        <link.icon size={20} className={`${location.pathname === link.path ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                        <span className="text-[9px] font-black uppercase tracking-widest font-premium leading-none">{link.name}</span>
                        {location.pathname === link.path && (
                            <span className="absolute -top-1 w-1 h-1 bg-blue-500 rounded-full blur-[2px] animate-pulse"></span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
