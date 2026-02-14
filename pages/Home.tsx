import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ApiService.getNewMovies(1)
            .then(res => setMovies(res.items))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="min-h-screen bg-black"></div>;

    const heroMovie = movies[0];
    const displayMovies = movies.slice(1);

    return (
        <div className="min-h-screen pb-12">
            {/* Minimalist Hero Section */}
            {heroMovie && (
                <div className="relative w-full h-[40vh] min-h-[300px] md:h-[60vh] md:min-h-[500px] bg-zinc-900 border-b border-zinc-900 overflow-hidden">
                    <img
                        src={heroMovie.poster_url}
                        alt={heroMovie.name}
                        className="w-full h-full object-cover opacity-60 md:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-12 max-w-7xl mx-auto w-full">
                        <div className="max-w-2xl mb-4 md:mb-8">
                            <span className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Nổi bật</span>
                            <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-3 md:mb-4 tracking-tight leading-tight">{heroMovie.name}</h1>
                            <p className="text-zinc-400 text-xs md:text-base mb-5 md:mb-8 line-clamp-2 max-w-lg font-medium">{heroMovie.origin_name} • {heroMovie.year}</p>
                            <Link
                                to={`/phim/${heroMovie.slug}`}
                                className="inline-block bg-white text-black px-6 md:px-10 py-2.5 md:py-4 rounded-sm font-bold text-[10px] md:text-sm hover:bg-zinc-200 transition-all uppercase tracking-widest shadow-xl shadow-black/50"
                            >
                                XEM NGAY
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 mt-12">
                <h2 className="text-xl font-bold text-white mb-8 border-l-2 border-zinc-700 pl-4 uppercase tracking-wider text-xs">Mới Cập Nhật</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {displayMovies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;