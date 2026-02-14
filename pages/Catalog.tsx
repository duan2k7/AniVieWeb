import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ApiService } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';

interface CatalogProps {
    type?: 'search' | 'category';
}

const Catalog: React.FC<CatalogProps> = ({ type = 'category' }) => {
    const { category } = useParams<{ category: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const keyword = searchParams.get('k');
    const page = parseInt(searchParams.get('page') || '1');

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                if (type === 'search' && keyword) {
                    setTitle(`Tìm kiếm: ${keyword}`);
                    const res = await ApiService.searchMovies(keyword, page);
                    setMovies(res.items);
                    // Search might not return pagination info, so assume more if we hit a limit
                    setHasMore(res.items.length >= 20);
                } else if (type === 'category' && category) {
                    const titles: Record<string, string> = {
                        'hoat-hinh': 'Phim Hoạt Hình',
                        'phim-le': 'Phim Lẻ Mới',
                        'phim-bo': 'Phim Bộ Mới',
                        'tv-shows': 'TV Shows & Gameshow',
                        'phim-dang-chieu': 'Phim Đang Chiếu'
                    };
                    setTitle(`${titles[category] || 'Danh Sách Phim'}`);
                    const res = await ApiService.getMoviesByType(category, page, 24);
                    setMovies(res.items);

                    const pagination = res.params;
                    if (pagination && pagination.total_page) {
                        setHasMore(page < pagination.total_page);
                    } else {
                        setHasMore(res.items.length >= 20);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [type, category, keyword, page]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    return (
        <div className="min-h-screen bg-black pt-20 md:pt-28 pb-12 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 border-l-4 border-blue-600 pl-5">
                    <h1 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{title}</h1>
                    <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2">Tổng cộng {movies.length} nội dung</p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-8">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] bg-zinc-900 animate-pulse rounded-md"></div>
                        ))}
                    </div>
                ) : movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-8">
                            {movies.map(movie => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>

                        {/* Minimalist Pagination */}
                        <div className="flex justify-center items-center gap-6 mt-16 pt-10 border-t border-zinc-900/50">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] border transition-all rounded-sm active:scale-95 ${page === 1 ? 'text-zinc-800 border-zinc-900 cursor-not-allowed' : 'text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-500'}`}
                            >
                                Trước
                            </button>
                            <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">Trang {page}</span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={movies.length < 10 && page > 1}
                                className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] border transition-all rounded-sm active:scale-95 ${movies.length < 10 && page > 1 ? 'text-zinc-800 border-zinc-900 cursor-not-allowed' : 'text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-500'}`}
                            >
                                Sau
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em] bg-zinc-900/10 rounded-md border border-zinc-900/50">
                        Không tìm thấy kết quả nào.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;