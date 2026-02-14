import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Icons } from '../components/Icons';

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [phimLe, setPhimLe] = useState<Movie[]>([]);
    const [phimBo, setPhimBo] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [heroMovie, setHeroMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [newRes, leRes, boRes] = await Promise.all([
                    ApiService.getNewMovies(1),
                    ApiService.getMoviesByType('phim-le', 1, 6),
                    ApiService.getMoviesByType('phim-bo', 1, 6)
                ]);
                setMovies(newRes.items);
                setPhimLe(leRes.items.slice(0, 6));
                setPhimBo(boRes.items.slice(0, 6));

                // Pick a random movie for Hero
                if (newRes.items.length > 0) {
                    const randomIndex = Math.floor(Math.random() * Math.min(newRes.items.length, 10));
                    setHeroMovie(newRes.items[randomIndex]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] font-premium">Cân bằng tín hiệu...</span>
            </div>
        </div>
    );

    const displayMovies = movies.slice(0, 12);

    return (
        <div className="min-h-screen pb-32 bg-[#050505] pt-16">
            {/* Cinematic Hero Section 2.0 */}
            {heroMovie && (
                <div className="relative w-full h-[85vh] md:h-[95vh] min-h-[700px] bg-black overflow-hidden group">
                    {/* Dynamic Layered Background */}
                    <div className="absolute inset-0 transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-125">
                        <img
                            src={heroMovie.poster_url}
                            alt={heroMovie.name}
                            className="w-full h-full object-cover opacity-60 blur-xl contrast-[1.1] brightness-[0.7]"
                        />
                    </div>

                    {/* Spotlight Shadow Mask */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_transparent_0%,_#050505_100%)] opacity-80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>

                    {/* Content Container - Optimized for safe-zone and premium feel */}
                    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-[1900px] mx-auto w-full z-10 pointer-events-none">
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mt-12 md:mt-0 pointer-events-auto">

                            {/* Sharp Poster Image - New Addition */}
                            <div className="hidden lg:block shrink-0 animate-slide-right" style={{ animationDelay: '0.1s' }}>
                                <div className="relative group/poster">
                                    <div className="absolute -inset-1 bg-gradient-to-b from-blue-600/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover/poster:opacity-100 transition-opacity"></div>
                                    <img
                                        src={heroMovie.poster_url}
                                        alt={heroMovie.name}
                                        className="relative w-[320px] h-[480px] object-cover rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </div>

                            <div className="max-w-4xl">
                                {/* Premium Status Indicator */}
                                <div className="flex flex-wrap items-center gap-2 mb-8 animate-slide-right">
                                    <div className="flex items-center gap-2 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Featured Selection</span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
                                    <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{heroMovie.quality || '4K ULTRA HD'}</span>
                                    <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{heroMovie.year}</span>
                                </div>

                                {/* Sculpted Title Typography */}
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95] uppercase italic font-premium animate-slide-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.15s' }}>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 pb-2">
                                        {heroMovie.name}
                                    </span>
                                </h1>

                                {/* Refined Metadata & Descriptor */}
                                <div className="flex items-start gap-6 mb-12 animate-slide-right" style={{ animationDelay: '0.2s' }}>
                                    <div className="w-[3px] h-12 bg-gradient-to-b from-blue-600 via-blue-600/50 to-transparent rounded-full mt-1"></div>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-zinc-400 text-sm md:text-xl font-medium italic tracking-wide opacity-80 leading-snug break-words line-clamp-2">
                                            {heroMovie.origin_name}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded">
                                                <Icons.Star size={12} className="fill-blue-500 text-blue-500" />
                                                <span className="text-[10px] font-black text-blue-400 tracking-tighter mt-0.5">9.8</span>
                                            </div>
                                            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Top Rated Selection</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Elevated Call to Action Buttons - Pill Shaped */}
                                <div className="flex flex-wrap items-center gap-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                    <Link
                                        to={`/phim/${heroMovie.slug}`}
                                        className="group relative flex items-center gap-4 bg-white text-black px-10 md:px-14 py-4 md:py-5 rounded-full font-black text-[11px] md:text-xs transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                                    >
                                        <div className="absolute inset-0 bg-blue-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></div>
                                        <Icons.Play size={16} className="relative z-10 fill-current group-hover:text-white transition-colors" />
                                        <span className="relative z-10 uppercase tracking-[0.2em] font-premium italic group-hover:text-white transition-colors">Trải nghiệm ngay</span>
                                    </Link>

                                    <Link
                                        to={`/phim/${heroMovie.slug}`}
                                        className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-black text-[11px] md:text-xs border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 uppercase tracking-[0.2em] font-premium italic shadow-xl"
                                    >
                                        <Icons.Info size={16} className="text-blue-500" />
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Aesthetic Vertical Label - Optimized for safety */}
                        <div className="absolute right-8 bottom-32 hidden 2xl:flex flex-col items-center gap-8 opacity-10 pointer-events-none select-none animate-fade">
                            <div className="w-[1px] h-24 bg-white"></div>
                            <span className="text-6xl font-black uppercase tracking-[0.5em] italic leading-none font-premium rotate-180" style={{ writingMode: 'vertical-rl' }}>
                                PREMIUM
                            </span>
                        </div>
                    </div>

                    {/* Bottom Edge Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
                </div>
            )}

            <div className="max-w-[1600px] mx-auto px-6 space-y-24 md:space-y-32 animate-fade" style={{ animationDelay: '0.5s' }}>
                {/* Phim Mới */}
                <section className="mt-20">
                    <div className="flex items-end justify-between mb-12 border-b border-white/[0.05] pb-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none font-premium italic">Tiếp tục khám phá</h2>
                            <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-3 italic opacity-60">Phim vừa được cập nhật hệ thống</p>
                        </div>
                        <Link to="/danh-sach/phim-moi" className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors group">
                            Xem tất cả <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
                        {displayMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                </section>

                {/* Phim Lẻ */}
                <section>
                    <div className="flex items-end justify-between mb-12 border-b border-white/[0.05] pb-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none font-premium italic">Siêu phẩm điện ảnh</h2>
                            <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-3 italic opacity-60">Phim lẻ đặc sắc tuyển chọn</p>
                        </div>
                        <Link to="/danh-sach/phim-le" className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors group">
                            Xem tất cả <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
                        {phimLe.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                </section>

                {/* Phim Bộ */}
                <section>
                    <div className="flex items-end justify-between mb-12 border-b border-white/[0.05] pb-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none font-premium italic">Dòng phim dài tập</h2>
                            <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-3 italic opacity-60">Hành trình trải nghiệm vô tận</p>
                        </div>
                        <Link to="/danh-sach/phim-bo" className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors group">
                            Xem tất cả <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
                        {phimBo.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;