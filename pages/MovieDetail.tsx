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
            {/* Background Blur Effect */}
            <div className="absolute top-0 left-0 right-0 h-[70vh] opacity-20 pointer-events-none">
                <img src={movie.thumb_url} className="w-full h-full object-cover blur-3xl scale-110" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]"></div>
            </div>

            <div className="relative pt-24 md:pt-40 pb-32 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col xl:flex-row gap-12 xl:gap-24">
                        {/* Poster Section */}
                        <div className="w-56 md:w-80 mx-auto xl:mx-0 shrink-0 animate-in fade-in slide-in-from-bottom duration-700">
                            <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group relative">
                                <img src={movie.thumb_url} alt={movie.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-blue-600 text-white text-[10px] font-black py-2 rounded-sm text-center uppercase tracking-widest shadow-xl shadow-blue-500/20">
                                        {movie.quality} • {movie.lang}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 text-center xl:text-left space-y-12">
                            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700 delay-100">
                                <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic font-premium">{movie.name}</h1>
                                <p className="text-zinc-500 text-sm md:text-xl font-medium tracking-wide opacity-80">{movie.origin_name} • <span className="text-blue-500 font-black">{movie.year}</span></p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-left duration-700 delay-200">
                                <div className="bg-white/[0.03] border border-white/[0.05] p-5 rounded-xl backdrop-blur-sm">
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[8px] block mb-2">Thời lượng</span>
                                    <span className="text-zinc-200 font-bold text-sm">{movie.time || 'N/A'}</span>
                                </div>
                                <div className="bg-white/[0.03] border border-white/[0.05] p-5 rounded-xl backdrop-blur-sm">
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[8px] block mb-2">Đánh giá</span>
                                    <span className="text-blue-500 font-black text-sm">9.8 / 10</span>
                                </div>
                                <div className="bg-white/[0.03] border border-white/[0.05] p-5 rounded-xl backdrop-blur-sm lg:col-span-2">
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[8px] block mb-2">Quốc gia</span>
                                    <span className="text-zinc-200 font-bold text-sm line-clamp-1">{movie.country.map(c => c.name).join(', ')}</span>
                                </div>
                            </div>

                            <div className="space-y-4 animate-in fade-in slide-in-from-left duration-700 delay-300">
                                <h3 className="text-zinc-400 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Câu chuyện</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm md:text-lg font-medium italic opacity-70 text-justify border-l-2 border-blue-600/30 pl-8">
                                    {movie.content.replace(/<[^>]+>/g, '')}
                                </p>
                            </div>

                            {/* Episode List */}
                            {movie.episodes?.length > 0 && (
                                <div className="bg-white/[0.02] p-8 md:p-12 border border-white/[0.05] rounded-3xl animate-in fade-in slide-in-from-bottom duration-700 delay-400">
                                    <h3 className="text-zinc-500 font-black mb-8 uppercase text-[10px] tracking-[0.5em] text-center xl:text-left">Danh sách hành trình</h3>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 md:gap-4">
                                        {movie.episodes[0]?.server_data.map(ep => (
                                            <Link
                                                key={ep.slug}
                                                to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                                className="aspect-[4/3] flex items-center justify-center bg-white/[0.03] border border-white/[0.05] text-zinc-500 hover:text-white hover:bg-blue-600 hover:border-blue-500 text-[11px] font-black transition-all rounded-lg active:scale-90 font-premium shadow-xl hover:shadow-blue-500/20"
                                            >
                                                {ep.name}
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