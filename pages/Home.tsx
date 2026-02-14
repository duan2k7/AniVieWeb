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
            {/* Cinematic Hero Section */}
            {heroMovie && (
                <div className="relative w-full h-[70vh] md:h-[90vh] min-h-[600px] bg-black border-b border-white/[0.03] overflow-hidden group">
                    {/* Background Image with Ken Burns effect */}
                    <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-[10000ms] ease-out">
                        <img
                            src={heroMovie.poster_url}
                            alt={heroMovie.name}
                            className="w-full h-full object-cover opacity-60 md:opacity-40 animate-fade"
                        />
                    </div>

                    {/* Multi-layered Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent"></div>

                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-24 max-w-[1700px] mx-auto w-full">
                        <div className="max-w-5xl mb-16 md:mb-20">
                            <div className="flex items-center gap-4 mb-8 animate-slide-right">
                                <div className="h-[1px] w-12 bg-blue-600"></div>
                                <span className="bg-blue-600/10 text-blue-500 text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] border border-blue-500/20 backdrop-blur-md">Hot Update</span>
                                <span className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] italic opacity-60">Trải nghiệm đỉnh cao</span>
                            </div>

                            <h1 className="text-4xl md:text-9xl font-black text-white mb-8 md:mb-10 tracking-tighter leading-[0.8] uppercase italic font-premium drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-slide-right" style={{ animationDelay: '0.1s' }}>
                                {heroMovie.name}
                            </h1>

                            <div className="flex items-center gap-6 mb-12 md:mb-16 animate-slide-right" style={{ animationDelay: '0.2s' }}>
                                <p className="text-zinc-300 text-sm md:text-2xl font-medium italic opacity-80 border-l-2 border-blue-600 pl-8 leading-relaxed max-w-3xl">
                                    {heroMovie.origin_name} • <span className="text-blue-500 font-black">{heroMovie.year}</span>
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                <Link
                                    to={`/phim/${heroMovie.slug}`}
                                    className="flex items-center gap-5 bg-blue-600 text-white px-12 md:px-20 py-5 md:py-7 rounded-sm font-black text-[11px] md:text-sm hover:bg-white hover:text-black transition-all uppercase tracking-[0.4em] shadow-[0_0_50px_rgba(37,99,235,0.3)] active:scale-95 group font-premium italic"
                                >
                                    <Icons.Play size={20} className="fill-current group-hover:scale-125 transition-transform" />
                                    Xem ngay
                                </Link>
                                <Link
                                    to={`/phim/${heroMovie.slug}`}
                                    className="flex items-center gap-5 bg-white/[0.03] backdrop-blur-xl text-white px-12 md:px-20 py-5 md:py-7 rounded-sm font-black text-[11px] md:text-sm border border-white/10 hover:bg-white/10 transition-all uppercase tracking-[0.4em] active:scale-95 font-premium italic"
                                >
                                    <Icons.Info size={20} />
                                    Chi tiết
                                </Link>
                            </div>
                        </div>

                        {/* Decorative background text */}
                        <div className="absolute right-0 bottom-24 hidden xl:block opacity-[0.02] pointer-events-none">
                            <span className="text-[200px] font-black uppercase tracking-tighter italic leading-none whitespace-nowrap font-premium">PREMIUM CONTENT</span>
                        </div>
                    </div>
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