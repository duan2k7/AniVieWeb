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
    if (!movie) return <div className="pt-24 text-center text-white">Phim không tồn tại.</div>;

    return (
        <div className="min-h-screen bg-black pt-20 md:pt-28 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Poster */}
                    <div className="w-40 md:w-72 mx-auto md:mx-0 shrink-0">
                        <div className="aspect-[2/3] rounded-md overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black">
                            <img src={movie.thumb_url} alt={movie.name} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight leading-tight">{movie.name}</h1>
                        <p className="text-zinc-500 text-sm mb-8 font-medium italic">{movie.origin_name} • {movie.year}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-xs md:text-sm text-zinc-400">
                            <div className="flex items-center justify-center md:justify-start gap-3 bg-zinc-900/40 p-3 rounded-sm border border-zinc-900">
                                <span className="text-zinc-600 uppercase font-black tracking-widest text-[9px]">Thời lượng</span>
                                <span className="text-zinc-200 font-bold">{movie.time || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-3 bg-zinc-900/40 p-3 rounded-sm border border-zinc-900">
                                <span className="text-zinc-600 uppercase font-black tracking-widest text-[9px]">Chất lượng</span>
                                <span className="text-zinc-200 font-bold">{movie.quality}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-3 bg-zinc-900/40 p-3 rounded-sm border border-zinc-900">
                                <span className="text-zinc-600 uppercase font-black tracking-widest text-[9px]">Ngôn ngữ</span>
                                <span className="text-zinc-200 font-bold">{movie.lang}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-3 bg-zinc-900/40 p-3 rounded-sm border border-zinc-900">
                                <span className="text-zinc-600 uppercase font-black tracking-widest text-[9px]">Quốc gia</span>
                                <span className="text-zinc-200 font-bold">{movie.country.map(c => c.name).join(', ')}</span>
                            </div>
                        </div>

                        <div className="mb-10 group">
                            <h3 className="text-zinc-500 font-black mb-4 uppercase text-[10px] tracking-[0.3em] border-b border-zinc-900 pb-2">Nội dung</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-medium text-justify">{movie.content.replace(/<[^>]+>/g, '')}</p>
                        </div>

                        {/* Episode List */}
                        {movie.episodes?.length > 0 && (
                            <div className="bg-zinc-900/20 p-6 border border-zinc-900 rounded-sm">
                                <h3 className="text-zinc-500 font-black mb-5 uppercase text-[10px] tracking-[0.3em]">Danh sách tập</h3>
                                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-2.5">
                                    {movie.episodes[0]?.server_data.map(ep => (
                                        <Link
                                            key={ep.slug}
                                            to={`/xem-phim/${movie.slug}/${ep.slug}`}
                                            className="aspect-[4/3] flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 text-xs font-black transition-all rounded-sm active:scale-95"
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
    );
};

export default MovieDetail;