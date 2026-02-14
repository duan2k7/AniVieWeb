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
        document.title = 'AniVie - Thế giới Anime trực tuyến';
        const fetchAll = async () => {
            try {
                const res = await ApiService.getMoviesByType('hoat-hinh', 1, 18);
                setMovies(res.items);

                // Pick a random movie for Hero
                if (res.items.length > 0) {
                    const shortNameMovies = res.items.filter(m => m.name.length < 30).slice(0, 10);
                    const pool = shortNameMovies.length > 0 ? shortNameMovies : res.items.slice(0, 10);
                    const randomIndex = Math.floor(Math.random() * pool.length);
                    setHeroMovie(pool[randomIndex]);
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
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] font-premium">Đang mở cổng không gian...</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pb-32 bg-[#050505] pt-16">
            {/* Cinematic Hero Section 2.0 */}
            {heroMovie && (
                <div className="relative w-full h-[85vh] md:h-[95vh] min-h-[700px] bg-black overflow-hidden group">
                    {/* ... (rest of hero remains same) */}
                    <div className="absolute inset-0 transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-125">
                        <img
                            src={heroMovie.poster_url}
                            alt={heroMovie.name}
                            className="w-full h-full object-cover opacity-60 blur-xl contrast-[1.1] brightness-[0.7]"
                        />
                    </div>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_transparent_0%,_#050505_100%)] opacity-80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>

                    <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-20 lg:px-32 max-w-[1900px] mx-auto w-full z-10 pointer-events-none">
                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-12 lg:gap-20 pointer-events-auto">
                            <div className="max-w-4xl">
                                <div className="flex flex-wrap items-center gap-2 mb-8 animate-slide-right">
                                    <div className="flex items-center gap-2 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Anime Đề Cử</span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
                                    <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{heroMovie.quality || 'FULL HD'}</span>
                                    <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{heroMovie.year}</span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95] uppercase italic font-premium animate-slide-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.1s' }}>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 pb-2">
                                        {heroMovie.name}
                                    </span>
                                </h1>

                                <div className="flex items-start gap-6 mb-12 animate-slide-right" style={{ animationDelay: '0.2s' }}>
                                    <div className="w-[3px] h-12 bg-gradient-to-b from-blue-600 via-blue-600/50 to-transparent rounded-full mt-1"></div>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-zinc-400 text-sm md:text-xl font-medium italic tracking-wide opacity-80 leading-snug break-words line-clamp-2">
                                            {heroMovie.origin_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                    <Link
                                        to={`/phim/${heroMovie.slug}`}
                                        className="group relative flex items-center gap-4 bg-white text-black px-10 md:px-14 py-4 md:py-5 rounded-full font-black text-[11px] md:text-xs transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                                    >
                                        <div className="absolute inset-0 bg-blue-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></div>
                                        <Icons.Play size={16} className="relative z-10 fill-current group-hover:text-white transition-colors" />
                                        <span className="relative z-10 uppercase tracking-[0.2em] font-premium italic group-hover:text-white transition-colors">Xem ngay</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden lg:block shrink-0 animate-fade" style={{ animationDelay: '0.4s' }}>
                                <div className="relative group/poster">
                                    <div className="absolute -inset-1 bg-gradient-to-b from-blue-600/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover/poster:opacity-100 transition-opacity"></div>
                                    <img
                                        src={heroMovie.poster_url}
                                        alt={heroMovie.name}
                                        className="relative w-[320px] h-[480px] object-cover rounded-xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] border border-white/10"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
                </div>
            )}

            <div className="max-w-[1600px] mx-auto px-6 animate-fade" style={{ animationDelay: '0.5s' }}>
                <section className="mt-20">
                    <div className="flex items-end justify-between mb-12 border-b border-white/[0.05] pb-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none font-premium italic">Thế giới Anime</h2>
                            <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-3 italic opacity-60">Khám phá những vùng đất kỳ ảo mới nhất</p>
                        </div>
                        <Link to="/danh-sach/hoat-hinh" className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors group">
                            Xem tất cả <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
                        {movies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;