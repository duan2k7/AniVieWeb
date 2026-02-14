import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Icons } from '../components/Icons';

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch 2 pages to have more content (approx 20 movies)
        Promise.all([
            ApiService.getNewMovies(1),
            ApiService.getNewMovies(2)
        ]).then(results => {
            const allMovies = [...results[0].items, ...results[1].items];
            // Remove duplicates if any (by slug)
            const uniqueMovies = allMovies.filter((movie, index, self) =>
                index === self.findIndex((m) => m.slug === movie.slug)
            );
            setMovies(uniqueMovies);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="min-h-screen bg-black"></div>;

    const heroMovie = movies[0];
    const displayMovies = movies.slice(1);

    return (
        <div className="min-h-screen pb-20">
            {/* Minimalist Hero Section */}
            {heroMovie && (
                <div className="relative w-full h-[45vh] md:h-[70vh] min-h-[400px] bg-zinc-900 border-b border-zinc-900 overflow-hidden">
                    <img
                        src={heroMovie.poster_url}
                        alt={heroMovie.name}
                        className="w-full h-full object-cover opacity-60 md:opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 max-w-7xl mx-auto w-full">
                        <div className="max-w-3xl mb-4 md:mb-12">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-8 h-[2px] bg-blue-500"></span>
                                <span className="text-blue-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Trending Now</span>
                            </div>
                            <h1 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[0.9] uppercase italic">{heroMovie.name}</h1>
                            <p className="text-zinc-400 text-xs md:text-lg mb-8 md:mb-10 line-clamp-2 max-w-xl font-medium italic opacity-80">{heroMovie.origin_name} • {heroMovie.year}</p>
                            <Link
                                to={`/phim/${heroMovie.slug}`}
                                className="inline-flex items-center gap-3 bg-white text-black px-8 md:px-12 py-3 md:py-5 rounded-sm font-black text-[10px] md:text-xs hover:bg-blue-500 hover:text-white transition-all uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 active:scale-95"
                            >
                                <Icons.Play size={16} className="fill-current" />
                                XEM NGAY
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 md:px-6 mt-16 md:mt-24">
                <div className="flex items-end justify-between mb-10 md:mb-16">
                    <header className="border-l-4 border-blue-600 pl-5">
                        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">Mới Cập Nhật</h2>
                        <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Phim vừa cập nhật hôm nay</p>
                    </header>
                    <Link to="/danh-sach/hoat-hinh" className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors hidden md:block">Xem tất cả</Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-10">
                    {displayMovies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <Link
                        to="/danh-sach/hoat-hinh"
                        className="px-12 py-4 border border-zinc-900 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all rounded-sm"
                    >
                        Khám phá thêm
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;