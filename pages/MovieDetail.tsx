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

            {/* Dashboard-style Layout Structure */}
            <div className="relative pt-24 md:pt-40 pb-32 px-6">
                <div className="max-w-[1700px] mx-auto">
                    <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">

                        {/* Right Column: Hero Poster Card */}
                        <div className="w-full lg:w-[450px] shrink-0 animate-in fade-in slide-in-from-right duration-1000">
                            <div className="relative group/poster perspective-1000">
                                <div className="absolute -inset-4 bg-blue-600/10 blur-3xl rounded-full opacity-50"></div>
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] bg-zinc-900 aspect-[2/3]">
                                    <img
                                        src={movie.poster_url}
                                        alt={movie.name}
                                        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover/poster:scale-105"
                                    />
                                    {/* Glass Overlay with Play Button */}
                                    <Link
                                        to={movie.episodes?.[0]?.server_data?.[0]?.slug ? `/xem-phim/${movie.slug}/${movie.episodes[0].server_data[0].slug}` : '#'}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm"
                                    >
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover/poster:scale-100 transition-transform duration-500">
                                            <Icons.Play size={32} className="text-black fill-current ml-1" />
                                        </div>
                                    </Link>
                                    <div className="absolute top-6 right-6">
                                        <div className="bg-blue-600 px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-md shadow-2xl">
                                            {movie.quality}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Left Column: Extensive Info Dashboard */}
                        <div className="flex-1 space-y-16">

                            {/* Primary Header Section */}
                            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-[2px] bg-blue-600"></div>
                                        <span className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em]">Official Details</span>
                                    </div>
                                    <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase italic font-premium">
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 pb-4">
                                            {movie.name}
                                        </span>
                                    </h1>
                                </div>

                                <div className="flex flex-wrap items-center gap-6">
                                    <p className="text-zinc-500 text-lg md:text-2xl font-medium italic opacity-60">
                                        {movie.origin_name}
                                    </p>
                                    <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
                                    <span className="text-blue-500 font-black text-lg md:text-2xl tracking-[0.2em]">{movie.year}</span>
                                </div>

                                {/* Dynamic Action Bar */}
                                <div className="flex flex-wrap items-center gap-5 pt-4">
                                    <Link
                                        to={movie.episodes?.[0]?.server_data?.[0]?.slug ? `/xem-phim/${movie.slug}/${movie.episodes[0].server_data[0].slug}` : '#'}
                                        className="group relative flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-xs transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-blue-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></div>
                                        <Icons.Play size={18} className="relative z-10 fill-current group-hover:text-white transition-colors" />
                                        <span className="relative z-10 uppercase tracking-[0.2em] font-premium italic group-hover:text-white transition-colors">Bắt đầu xem ngay</span>
                                    </Link>
                                    <button className="flex items-center gap-4 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black text-xs hover:bg-white/10 transition-all uppercase tracking-[0.2em] font-premium italic backdrop-blur-xl">
                                        <Icons.Plus size={18} />
                                        Bộ sưu tập
                                    </button>
                                </div>
                            </div>

                            {/* Metadata Grid Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-left duration-1000 delay-200">
                                <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-8 rounded-[2rem] group hover:border-blue-500/30 transition-colors">
                                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                                        <Icons.Clock size={18} className="text-blue-500" />
                                    </div>
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[9px] block mb-2">Thời lượng</span>
                                    <span className="text-white font-bold text-lg">{movie.time || 'Đang cập nhật'}</span>
                                </div>
                                <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-8 rounded-[2rem] group hover:border-blue-500/30 transition-colors">
                                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                                        <Icons.Star size={18} className="text-blue-500 fill-blue-500" />
                                    </div>
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[9px] block mb-2">Đánh giá</span>
                                    <span className="text-white font-bold text-lg">9.8 <span className="text-zinc-700 font-black text-xs">/ 10</span></span>
                                </div>
                                <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-8 rounded-[2rem] lg:col-span-2 group hover:border-blue-500/30 transition-colors">
                                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                                        <Icons.Search size={18} className="text-blue-500" />
                                    </div>
                                    <span className="text-zinc-600 uppercase font-black tracking-[0.3em] text-[9px] block mb-2">Quốc gia sản xuất</span>
                                    <span className="text-white font-bold text-lg line-clamp-1">{movie.country.map(c => c.name).join(' • ')}</span>
                                </div>
                            </div>

                            {/* Synopsis & Story Section */}
                            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000 delay-300">
                                <div className="flex items-center gap-6">
                                    <h3 className="text-white font-black uppercase text-xs tracking-[0.6em] shrink-0">Cốt truyện</h3>
                                    <div className="h-[1px] flex-1 bg-white/5"></div>
                                </div>
                                <p className="text-zinc-400 leading-relaxed text-lg md:text-2xl font-medium italic opacity-80 text-justify border-l-4 border-blue-600 pl-12 py-4">
                                    {movie.content.replace(/<[^>]+>/g, '')}
                                </p>
                            </div>

                            {/* Modern Episode Dashboard */}
                            {movie.episodes?.length > 0 && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-white font-black uppercase text-xs tracking-[0.6em]">Tập phim</h3>
                                            <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">Chọn hành trình của bạn</span>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{movie.episodes[0]?.server_data.length} EPISODES</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                                        {movie.episodes[0]?.server_data.map((ep, idx) => (
                                            <Link
                                                key={ep.slug}
                                                to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                                className="aspect-square flex items-center justify-center bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 hover:border-blue-500 hover:text-blue-500 text-sm font-black transition-all rounded-[1.5rem] active:scale-95 group relative overflow-hidden"
                                            >
                                                <span className="relative z-10">{idx + 1}</span>
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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