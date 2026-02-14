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
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Đang đồng bộ...</span>
            </div>
        </div>
    );

    const heroMovie = movies[0];
    const displayMovies = movies.slice(1, 13);

    return (
        <div className="min-h-screen pb-32 bg-[#050505]">
            {/* Minimalist Hero Section */}
            {heroMovie && (
                <div className="relative w-full h-[55vh] md:h-[85vh] min-h-[500px] bg-zinc-900 border-b border-white/[0.03] overflow-hidden">
                    <img
                        src={heroMovie.poster_url}
                        alt={heroMovie.name}
                        className="w-full h-full object-cover opacity-70 md:opacity-50 scale-105 animate-in fade-in zoom-in duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 max-w-[1600px] mx-auto w-full">
                        <div className="max-w-4xl mb-6 md:mb-16">
                            <div className="flex items-center gap-3 mb-6 animate-in slide-in-from-left duration-500">
                                <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30">Nổi bật hôm nay</span>
                                <span className="text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-60">Thanh lọc tâm hồn</span>
                            </div>
                            <h1 className="text-4xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[0.85] uppercase italic font-premium drop-shadow-2xl animate-in slide-in-from-left duration-700 delay-100">
                                {heroMovie.name}
                            </h1>
                            <p className="text-zinc-400 text-xs md:text-xl mb-10 md:mb-14 line-clamp-2 max-w-2xl font-medium italic opacity-70 border-l border-zinc-800 pl-6 animate-in slide-in-from-left duration-1000 delay-200">
                                {heroMovie.origin_name} • {heroMovie.year}
                            </p>
                            <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom duration-700 delay-300">
                                <Link
                                    to={`/phim/${heroMovie.slug}`}
                                    className="inline-flex items-center gap-4 bg-white text-black px-10 md:px-16 py-4 md:py-6 rounded-full font-black text-[11px] md:text-xs hover:bg-blue-600 hover:text-white transition-all uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/10 active:scale-95 group font-premium"
                                >
                                    <Icons.Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
                                    Xem ngay
                                </Link>
                                <button className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md text-white px-10 md:px-16 py-4 md:py-6 rounded-full font-black text-[11px] md:text-xs border border-white/10 hover:bg-white/10 transition-all uppercase tracking-[0.3em] active:scale-95 font-premium">
                                    <Icons.Info size={18} />
                                    Chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-[1600px] mx-auto px-6 space-y-24 md:space-y-32">
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