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
        <div className="min-h-screen bg-[#050505] relative overflow-hidden">
            {/* Netflix-style Cinematic Backdrop */}
            <div className="absolute top-0 left-0 right-0 h-[85vh] md:h-[95vh] pointer-events-none group overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={movie.poster_url}
                        className="w-full h-full object-cover animate-fade-slow opacity-60 md:opacity-50"
                        alt=""
                    />
                </div>
                {/* Layered Netflix Gradients for Ultimate Immersion */}
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
            </div>

            <div className="relative pt-32 md:pt-[25vh] pb-32 px-6">
                <div className="max-w-[1600px] mx-auto">
                    {/* Main Content Area */}
                    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">

                        {/* Title & Metadata */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-red-600 text-[10px] font-black text-white px-2 py-0.5 rounded-sm tracking-tighter uppercase italic">Original</div>
                                <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em]">Phát hành độc quyền</span>
                            </div>
                            <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] uppercase font-premium drop-shadow-2xl">
                                {movie.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm md:text-lg">
                                <span className="text-green-500 font-black tracking-tight">Độ trùng khớp 98%</span>
                                <span className="text-zinc-400 font-bold border border-zinc-700 px-1.5 py-0.5 rounded-sm text-[12px]">{movie.year}</span>
                                <span className="text-zinc-400 font-bold">{movie.time || '1h 45m'}</span>
                                <div className="flex items-center gap-1.5 bg-zinc-800/80 px-2 py-0.5 rounded-sm border border-zinc-700/50">
                                    <Icons.Star size={14} className="fill-blue-500 text-blue-500" />
                                    <span className="text-white font-black text-[12px]">9.8</span>
                                </div>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <p className="text-zinc-300 text-sm md:text-xl font-medium leading-relaxed max-w-3xl line-clamp-4 md:line-clamp-none drop-shadow-lg">
                            {movie.content.replace(/<[^>]+>/g, '')}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
                            <Link
                                to={movie.episodes?.[0]?.server_data?.[0]?.slug ? `/xem-phim/${movie.slug}/${movie.episodes[0].server_data[0].slug}` : '#'}
                                className="flex items-center gap-3 bg-white text-black px-10 md:px-14 py-3.5 md:py-4 rounded-md font-black text-xs md:text-sm hover:bg-white/90 transition-all shadow-xl active:scale-95"
                            >
                                <Icons.Play size={20} className="fill-current" />
                                <span>Phát ngay</span>
                            </Link>
                            <button className="flex items-center gap-3 bg-zinc-500/40 hover:bg-zinc-500/50 text-white px-8 md:px-12 py-3.5 md:py-4 rounded-md font-black text-xs md:text-sm transition-all backdrop-blur-md active:scale-95">
                                <Icons.Plus size={20} />
                                <span>Danh sách</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 pt-4 text-zinc-400">
                            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Quốc gia:</span>
                            <span className="text-xs md:text-sm font-bold text-zinc-300">{movie.country.map(c => c.name).join(', ')}</span>
                        </div>
                    </div>

                    {/* Episodes Section - Clean Netflix List Style */}
                    {movie.episodes?.length > 0 && (
                        <div className="mt-32 space-y-10 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">Danh sách các tập</h2>
                                <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em]">{movie.episodes[0]?.server_data.length} Tập</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {movie.episodes[0]?.server_data.map((ep, idx) => (
                                    <Link
                                        key={ep.slug}
                                        to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                        className="group relative flex flex-col gap-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800/60 transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                                            <img
                                                src={movie.thumb_url}
                                                className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                                                alt={ep.name}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-black/40 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                                    <Icons.Play size={20} className="text-white fill-current ml-1" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-white">24:00</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-blue-500 font-black text-[10px] uppercase tracking-wider mb-1">Tập {idx + 1}</span>
                                                <span className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors line-clamp-1">{ep.name}</span>
                                            </div>
                                            <Icons.Share2 size={16} className="text-zinc-600 hover:text-white" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;