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
        <div className="min-h-screen bg-[#050505] pt-16 md:pt-20">
            {/* Cinematic Player Section */}
            <div className="bg-black border-b border-white/5 relative group">
                <div className="max-w-[1600px] mx-auto overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)]">
                    <div className="aspect-video bg-zinc-900 relative">
                        {currentEpisode.link_embed ? (
                            <iframe
                                src={currentEpisode.link_embed}
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                                title={currentEpisode.name}
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em] italic">
                                Tín hiệu đang được đồng bộ...
                            </div>
                        )}
                    </div>
                </div>
                {/* Light reflection effect */}
                <div className="absolute -bottom-1 left-0 right-0 h-[100px] bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-20">
                <div className="flex flex-col xl:flex-row justify-between items-start gap-12 mb-16">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left duration-700">
                            <div className="bg-blue-600 w-1 h-8 rounded-full shadow-lg shadow-blue-500/40"></div>
                            <h1 className="text-2xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase italic font-premium">{movie.name}</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 opacity-70 animate-in fade-in slide-in-from-left duration-700 delay-100">
                            <span className="bg-white/10 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10">Tập {currentEpisode.name}</span>
                            <span className="text-zinc-500 text-xs md:text-lg font-medium italic">{movie.origin_name}</span>
                        </div>
                    </div>

                    {/* Server Selection */}
                    {movie.episodes.length > 1 && (
                        <div className="flex flex-wrap gap-4 w-full xl:w-auto animate-in fade-in slide-in-from-right duration-700 delay-200">
                            {movie.episodes.map((server, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleServerChange(idx)}
                                    className={`flex-1 md:flex-none px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] border transition-all rounded-full active:scale-95 font-premium ${currentServerIndex === idx ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-white/[0.03] text-zinc-500 border-white/[0.05] hover:text-white hover:bg-white/[0.08]'}`}
                                >
                                    {server.server_name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white/[0.02] p-8 md:p-16 border border-white/[0.05] rounded-[40px] animate-in fade-in slide-in-from-bottom duration-1000">
                    <div className="flex items-center justify-between mb-12 border-b border-white/[0.05] pb-6">
                        <h3 className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.6em] italic">Danh sách tập phim</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">{currentServer?.server_data.length} Chương hồi</span>
                            <div className="w-10 h-[1px] bg-zinc-800"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4 md:gap-5">
                        {currentServer?.server_data.map(ep => (
                            <Link
                                key={ep.slug}
                                to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                className={`
                                    aspect-[4/3] flex items-center justify-center text-[12px] font-black transition-all border rounded-xl active:scale-90 font-premium
                                    ${ep.slug === currentEpisode?.slug
                                        ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)]'
                                        : 'bg-white/[0.03] text-zinc-500 border-white/[0.05] hover:text-white hover:border-white/20 hover:bg-white/5'}
                                `}
                            >
                                {ep.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watch;