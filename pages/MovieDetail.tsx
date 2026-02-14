import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ApiService } from '../services/api';
import { MovieDetail as MovieDetailType } from '../types';
import { Icons } from '../components/Icons';

const MovieDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [movie, setMovie] = useState<MovieDetailType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        ApiService.getMovieDetail(slug)
            .then(data => {
                setMovie(data);
                document.title = `${data.name} - AniVie`;
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-black"></div>;
    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
            {/* Ambient Blurred Background */}
            <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden opacity-30">
                <img
                    src={movie.poster_url}
                    className="w-full h-full object-cover blur-[100px] scale-150"
                    alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </div>

            <div className="relative max-w-[1200px] mx-auto pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">
                    {/* Minimalist Poster Area */}
                    <div className="w-56 sm:w-64 md:w-80 shrink-0">
                        <img
                            src={movie.poster_url}
                            className="w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl border border-white/5"
                            alt={movie.name}
                        />
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">
                                <span>Chất lượng</span>
                                <span className="text-blue-500">{movie.quality}</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">
                                <span>Ngôn ngữ</span>
                                <span className="text-white">{movie.lang}</span>
                            </div>
                        </div>
                    </div>

                    {/* Clean Info Area */}
                    <div className="flex-1 space-y-8 md:space-y-10 w-full">
                        <div className="space-y-3 md:space-y-4 text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black md:font-bold tracking-tighter md:tracking-tight leading-tight">
                                {movie.name}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 text-zinc-500 font-medium text-sm md:text-base">
                                <span className="text-base md:text-lg">{movie.year}</span>
                                <span>•</span>
                                <span className="italic opacity-80">{movie.origin_name}</span>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start">
                            <Link
                                to={movie.episodes?.[0]?.server_data?.[0]?.slug ? `/xem-phim/${movie.slug}/${movie.episodes[0].server_data[0].slug}` : '#'}
                                className="bg-white text-black w-full md:w-auto text-center px-12 py-4 rounded-full font-black md:font-bold text-sm hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
                            >
                                Xem ngay
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-center md:text-left">Giới thiệu</h3>
                            <p className="text-zinc-400 leading-relaxed text-base md:text-lg text-justify md:text-left opacity-90">
                                {movie.content.replace(/<[^>]+>/g, '')}
                            </p>
                        </div>

                        {/* List episodes */}
                        {movie.episodes?.length > 0 && (
                            <div className="pt-6 md:pt-8 space-y-6">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                                        Danh sách tập
                                    </h3>
                                    <span className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest">
                                        {movie.episodes[0]?.server_data.length} Tập
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                                    {movie.episodes[0]?.server_data.map((ep, idx) => (
                                        <Link
                                            key={ep.slug}
                                            to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                            className="aspect-square flex items-center justify-center bg-zinc-900 border border-white/5 rounded-xl text-xs font-black text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all active:scale-90"
                                        >
                                            {idx + 1}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;