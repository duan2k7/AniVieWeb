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
        <div className="min-h-screen bg-black pt-16">
            <div className="bg-zinc-950 border-b border-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="aspect-video bg-black relative shadow-2xl shadow-black">
                        {currentEpisode.link_embed ? (
                            <iframe
                                src={currentEpisode.link_embed}
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                                title={currentEpisode.name}
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
                                Link embed không khả dụng.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-10">
                    <div className="flex-1">
                        <h1 className="text-xl md:text-3xl font-black text-white mb-2 tracking-tight leading-tight uppercase">{movie.name}</h1>
                        <div className="flex items-center gap-3">
                            <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">Tập {currentEpisode.name}</span>
                            <p className="text-zinc-500 text-xs md:text-sm font-medium italic">{movie.origin_name}</p>
                        </div>
                    </div>

                    {/* Server Selection */}
                    {movie.episodes.length > 1 && (
                        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                            {movie.episodes.map((server, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleServerChange(idx)}
                                    className={`flex-1 lg:flex-none px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] border transition-all rounded-sm active:scale-95 ${currentServerIndex === idx ? 'bg-white text-black border-white shadow-lg shadow-white/10' : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700'}`}
                                >
                                    {server.server_name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-zinc-900/40 p-5 md:p-8 border border-zinc-900 rounded-md">
                    <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
                        <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Danh sách tập phim</h3>
                        <span className="text-zinc-700 text-[9px] font-bold uppercase">{currentServer?.server_data.length} tập</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2.5">
                        {currentServer?.server_data.map(ep => (
                            <Link
                                key={ep.slug}
                                to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                className={`
                                    aspect-[4/3] flex items-center justify-center text-[11px] font-black transition-all border rounded-sm active:scale-90
                                    ${ep.slug === currentEpisode?.slug
                                        ? 'bg-zinc-100 text-black border-zinc-100 shadow-lg shadow-white/5'
                                        : 'bg-zinc-900/80 text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-600'}
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