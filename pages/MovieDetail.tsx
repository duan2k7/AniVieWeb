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
            {/* Solid Minimalist Background */}
            <div className="absolute inset-0 bg-[#050505] pointer-events-none"></div>

            <div className="relative pt-24 md:pt-40 pb-32 px-6">
                <div className="max-w-[1500px] mx-auto">
                    <div className="flex flex-col xl:flex-row-reverse items-center xl:items-start gap-12 xl:gap-24">
                        {/* Poster Section - Moved to Right */}
                        <div className="w-64 md:w-[400px] shrink-0 animate-in fade-in slide-in-from-right duration-1000">
                            <div className="relative group/poster">
                                <div className="absolute -inset-2 bg-blue-600/20 blur-2xl opacity-0 group-hover/poster:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative aspect-[2/3] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
                                    <img
                                        src={movie.poster_url}
                                        alt={movie.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                                        <div className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black py-2.5 rounded-full text-center uppercase tracking-[0.2em] shadow-2xl">
                                            {movie.quality} • {movie.lang}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 text-center xl:text-left space-y-12">
                            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                                <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase italic font-premium drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
                                        {movie.name}
                                    </span>
                                </h1>
                                <p className="text-zinc-500 text-base md:text-2xl font-medium tracking-wide opacity-80 italic">
                                    {movie.origin_name} • <span className="text-blue-500 font-black tracking-widest">{movie.year}</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-left duration-1000 delay-200">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[10px] block mb-3">Thời lượng</span>
                                    <span className="text-white font-bold text-base">{movie.time || 'Đang cập nhật'}</span>
                                </div>
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[10px] block mb-3">Đánh giá chung</span>
                                    <div className="flex items-center gap-2">
                                        <Icons.Star size={16} className="fill-blue-500 text-blue-500" />
                                        <span className="text-blue-500 font-black text-base">9.8 / 10</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl lg:col-span-2">
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[10px] block mb-3">Quốc gia sản xuất</span>
                                    <span className="text-white font-bold text-base line-clamp-1 break-words">{movie.country.map(c => c.name).join(' • ')}</span>
                                </div>
                            </div>

                            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000 delay-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-[2px] bg-blue-600"></div>
                                    <h3 className="text-zinc-400 font-black uppercase text-[10px] tracking-[0.5em]">Tóm tắt câu chuyện</h3>
                                </div>
                                <p className="text-zinc-400 leading-relaxed text-sm md:text-xl font-medium italic opacity-80 text-justify border-l-4 border-blue-600/30 pl-10 py-2">
                                    {movie.content.replace(/<[^>]+>/g, '')}
                                </p>
                            </div>

                            {/* Episode List */}
                            {movie.episodes?.length > 0 && (
                                <div className="bg-white/[0.03] backdrop-blur-3xl p-8 md:p-14 border border-white/[0.08] rounded-[40px] shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
                                    <div className="flex items-center justify-between mb-10">
                                        <h3 className="text-zinc-500 font-black uppercase text-[11px] tracking-[0.6em]">Nội dung hành trình</h3>
                                        <div className="h-[1px] flex-1 bg-white/5 ml-10"></div>
                                    </div>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                                        {movie.episodes[0]?.server_data.map((ep, idx) => (
                                            <Link
                                                key={ep.slug}
                                                to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                                className="aspect-[4/3] flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 text-xs font-black transition-all rounded-xl active:scale-95 font-premium group relative overflow-hidden"
                                            >
                                                <span className="relative z-10">{idx + 1}</span>
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;