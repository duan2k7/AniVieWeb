import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ApiService } from '../services/api';
import { MovieDetail, Episode, EpisodeGroup } from '../types';

const Watch: React.FC = () => {
    const { slug, episodeSlug } = useParams<{ slug: string; episodeSlug: string }>();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [currentServerIndex, setCurrentServerIndex] = useState(0);
    const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        ApiService.getMovieDetail(slug)
            .then(data => {
                setMovie(data);
                if (data.episodes.length > 0) {
                    let foundEp: Episode | null = null;
                    let foundServerIndex = 0;

                    if (episodeSlug) {
                        data.episodes.forEach((group, sIndex) => {
                            const found = group.server_data.find(e => e.slug === episodeSlug);
                            if (found) {
                                foundEp = found;
                                foundServerIndex = sIndex;
                            }
                        });
                    }

                    if (foundEp) {
                        setCurrentEpisode(foundEp);
                        setCurrentServerIndex(foundServerIndex);
                    } else {
                        // Default to first episode of first server
                        const first = data.episodes[0].server_data[0];
                        navigate(`/xem-phim/${slug}/${first.slug}`, { replace: true });
                    }
                }
            })
            .finally(() => setLoading(false));
    }, [slug, episodeSlug, navigate]);

    const handleServerChange = (index: number) => {
        setCurrentServerIndex(index);
        // Try to find the same episode slug in the new server
        const newServer = movie?.episodes[index];
        const sameEp = newServer?.server_data.find(e => e.slug === episodeSlug);
        if (sameEp) {
            setCurrentEpisode(sameEp);
        } else if (newServer && newServer.server_data.length > 0) {
            // Fallback to first episode of new server if slug doesn't match
            const first = newServer.server_data[0];
            navigate(`/xem-phim/${movie!.slug}/${first.slug}`);
        }
    };

    if (loading) return <div className="min-h-screen bg-black"></div>;
    if (!movie || !currentEpisode) return <div className="p-24 text-center text-zinc-500">Lỗi khi tải tập phim.</div>;

    const currentServer = movie.episodes[currentServerIndex];

    return (
        <div className="min-h-screen bg-[#050505] pt-20 px-4 md:px-8 pb-12">
            <div className="max-w-[1700px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left: Episode List Sidebar */}
                    <div className="w-full lg:w-[400px] flex-shrink-0 order-2 lg:order-1">
                        <div className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
                            <div className="p-6 border-b border-white/5 bg-zinc-900/60 flex items-center justify-between">
                                <span className="text-white font-black uppercase text-xs tracking-[0.4em]">Danh sách tập</span>
                                <span className="text-blue-500 font-bold text-[10px] uppercase bg-blue-500/10 px-2 py-1 rounded-sm">
                                    {currentServer?.server_data.length} Tập
                                </span>
                            </div>

                            {/* Server Selection if multiple */}
                            {movie.episodes.length > 1 && (
                                <div className="p-4 border-b border-white/5 bg-zinc-900/20 flex gap-2">
                                    {movie.episodes.map((server, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleServerChange(idx)}
                                            className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest border rounded-lg transition-all ${currentServerIndex === idx ? 'bg-white text-black border-white' : 'bg-white/5 text-zinc-500 border-white/5 hover:bg-white/10'}`}
                                        >
                                            {server.server_name.split(' ')[1] || server.server_name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-3">
                                    {currentServer?.server_data.map((ep, idx) => (
                                        <Link
                                            key={ep.slug}
                                            to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                            className={`
                                                aspect-square flex items-center justify-center text-xs font-black rounded-xl transition-all border
                                                ${ep.slug === currentEpisode?.slug
                                                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                                                    : 'bg-white/5 text-zinc-500 border-white/5 hover:text-white hover:bg-white/10 hover:border-white/20'}
                                            `}
                                        >
                                            {ep.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Player & Content */}
                    <div className="flex-1 order-1 lg:order-2 space-y-8">
                        {/* Player Area */}
                        <div className="relative group">
                            <div className="aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative">
                                {currentEpisode.link_embed ? (
                                    <iframe
                                        src={currentEpisode.link_embed}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={currentEpisode.name}
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em] italic">
                                        Tín hiệu đang được kết nối...
                                    </div>
                                )}
                            </div>
                            {/* Ambient Light effect around player */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>

                        {/* Movie Info below Player */}
                        <div className="space-y-8 p-2">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
                                    <span className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em]">Đang trình chiếu</span>
                                </div>
                                <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight uppercase font-premium">
                                    {movie.name}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <span className="text-zinc-500 font-bold italic text-lg">{movie.origin_name}</span>
                                    <div className="h-4 w-px bg-white/10"></div>
                                    <span className="text-zinc-400 font-black text-sm uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                                        Tập {currentEpisode.name}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                                <div className="space-y-2">
                                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Năm phát hành</span>
                                    <p className="text-white font-bold">{movie.year}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Thời lượng</span>
                                    <p className="text-white font-bold">{movie.time || 'N/A'}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Chất lượng</span>
                                    <p className="text-blue-500 font-bold">{movie.quality}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-8">
                                <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Cốt truyện</h3>
                                <p className="text-zinc-400 leading-relaxed text-lg text-justify max-w-4xl italic opacity-80 border-l-2 border-zinc-800 pl-8">
                                    {movie.content.replace(/<[^>]+>/g, '')}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Watch;