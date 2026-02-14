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
            .then(data => setMovie(data))
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

            <div className="relative max-w-[1200px] mx-auto pt-32 pb-20 px-6">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Minimalist Poster Area */}
                    <div className="w-64 md:w-80 shrink-0">
                        <img
                            src={movie.poster_url}
                            className="w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl border border-white/5"
                            alt={movie.name}
                        />
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">
                                <span>Chất lượng</span>
                                <span className="text-blue-500">{movie.quality}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">
                                <span>Ngôn ngữ</span>
                                <span className="text-white">{movie.lang}</span>
                            </div>
                        </div>
                    </div>

                    {/* Clean Info Area */}
                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                {movie.name}
                            </h1>
                            <div className="flex items-center gap-4 text-zinc-500 font-medium">
                                <span className="text-lg">{movie.year}</span>
                                <span>•</span>
                                <span className="italic">{movie.origin_name}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to={movie.episodes?.[0]?.server_data?.[0]?.slug ? `/xem-phim/${movie.slug}/${movie.episodes[0].server_data[0].slug}` : '#'}
                                className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors"
                            >
                                Xem ngay
                            </Link>
                            <button className="bg-zinc-900 text-white border border-white/10 px-10 py-4 rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors">
                                Lưu lại
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Giới thiệu</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                {movie.content.replace(/<[^>]+>/g, '')}
                            </p>
                        </div>

                        {/* List episodes */}
                        {movie.episodes?.length > 0 && (
                            <div className="pt-8 space-y-6">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                                        Danh sách tập
                                    </h3>
                                    <span className="text-zinc-600 text-[10px] font-bold uppercase">
                                        {movie.episodes[0]?.server_data.length} Tập phim
                                    </span>
                                </div>
                                <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-3">
                                    {movie.episodes[0]?.server_data.map((ep, idx) => (
                                        <Link
                                            key={ep.slug}
                                            to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                            className="aspect-square flex items-center justify-center bg-zinc-900 border border-white/5 rounded-lg text-sm font-bold text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all active:scale-90"
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