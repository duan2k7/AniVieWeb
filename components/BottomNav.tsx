import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';

const BottomNav: React.FC = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: Icons.Home },
        { name: 'Phim Lẻ', path: '/danh-sach/phim-le', icon: Icons.Play },
        { name: 'Phim Bộ', path: '/danh-sach/phim-bo', icon: Icons.Play },
        { name: 'Tìm kiếm', path: '/tim-kiem', icon: Icons.Search },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-zinc-900 z-50 px-6 py-3">
            <div className="flex justify-between items-center">
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === link.path ? 'text-blue-500' : 'text-zinc-500'}`}
                    >
                        <link.icon size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
