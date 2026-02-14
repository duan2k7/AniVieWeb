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

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-32 max-w-[1800px] mx-auto w-full z-10">
                        <div className="max-w-4xl pb-12">
                            {/* Metadata Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-8 animate-slide-right">
                                <span className="bg-blue-600 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                    Featured
                                </span>
                                <span className="bg-white/10 backdrop-blur-md text-zinc-300 text-[10px] md:text-xs font-bold px-4 py-1.5 border border-white/10 uppercase tracking-[0.2em]">
                                    {heroMovie.quality || 'FULL HD'}
                                </span>
                                <span className="bg-white/10 backdrop-blur-md text-blue-400 text-[10px] md:text-xs font-bold px-4 py-1.5 border border-white/10 uppercase tracking-[0.2em]">
                                    {heroMovie.year}
                                </span>
                                {heroMovie.lang && (
                                    <span className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ml-2 opacity-80">
                                        Sub: {heroMovie.lang}
                                    </span>
                                )}
                            </div>

                            {/* Main Title with Special Text Effects */}
                            <h1 className="text-5xl md:text-[10rem] font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase italic font-premium drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-slide-right" style={{ animationDelay: '0.1s' }}>
                                {heroMovie.name}
                            </h1>

                            {/* Original Name & Tagline */}
                            <div className="mb-12 animate-slide-right flex items-center gap-6" style={{ animationDelay: '0.2s' }}>
                                <div className="h-20 w-[2px] bg-gradient-to-b from-blue-600 to-transparent"></div>
                                <div>
                                    <p className="text-zinc-400 text-sm md:text-xl font-medium italic opacity-90 leading-tight tracking-wide mb-2">
                                        {heroMovie.origin_name}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Icons.Star key={s} size={12} className="fill-blue-500 text-blue-500" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">9.8 RATING</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                <Link
                                    to={`/phim/${heroMovie.slug}`}
                                    className="relative flex items-center gap-4 bg-white text-black px-12 md:px-16 py-5 md:py-6 rounded-sm font-black text-[11px] md:text-sm hover:scale-105 transition-all uppercase tracking-[0.3em] font-premium italic overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] group"
                                >
                                    <div className="absolute inset-0 bg-blue-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></div>
                                    <Icons.Play size={18} className="relative z-10 fill-current" />
                                    <span className="relative z-10 group-hover:text-white transition-colors">Bắt đầu xem</span>
                                </Link>

                                <Link
                                    to={`/phim/${heroMovie.slug}`}
                                    className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl text-white px-12 md:px-16 py-5 md:py-6 rounded-sm font-black text-[11px] md:text-sm border border-white/10 hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-premium italic"
                                >
                                    <Icons.Info size={18} />
                                    Xem thông tin
                                </Link>
                            </div>
                        </div>

                        {/* Floating elements for depth */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-10 pointer-events-none select-none">
                            <span className="text-[250px] font-black uppercase tracking-tighter italic leading-none vertical-text font-premium" style={{ writingMode: 'vertical-rl' }}>
                                CINEMATIC
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