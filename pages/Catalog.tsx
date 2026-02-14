import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ApiService } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Icons } from '../components/Icons';
import Pagination from '../components/Pagination';

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

                    const pagination = res.pagination;
                    if (pagination && pagination.total_page) {
                        setHasMore(page < pagination.total_page);
                    } else {
                        setHasMore(res.items.length >= 20);
                    }
                } else if (type === 'category' && category) {
                    const titles: Record<string, string> = {
                        'hoat-hinh': 'Thế giới Anime Bộ',
                        'anime-le': 'Siêu phẩm Anime Lẻ',
                        'phim-moi': 'Anime Mới Cập Nhật'
                    };
                    setTitle(`${titles[category] || 'Danh Sách Phim'}`);

                    let res;
                    if (category === 'phim-moi') {
                        res = await ApiService.getNewMovies(page);
                        setMovies(res.items);
                        const pagination = res.pagination;
                        if (pagination && pagination.total_page) {
                            setHasMore(page < pagination.total_page);
                        } else {
                            setHasMore(res.items.length >= 20);
                        }
                    } else {
                        res = await ApiService.getMoviesByType(category, page, 24);
                        setMovies(res.items);
                        const pagination = res.params;
                        if (pagination && pagination.total_page) {
                            setHasMore(page < pagination.total_page);
                        } else {
                            setHasMore(res.items.length >= 20);
                        }
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
        if (type === 'search' && keyword) {
            document.title = `Tìm kiếm: ${keyword} - AniVie`;
        }
    }, [type, category, keyword, page]);

    useEffect(() => {
        if (type === 'category' && title) {
            document.title = `${title} - AniVie`;
        }
    }, [title, type]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const titles: Record<string, string> = {
        'hoat-hinh': 'Thế giới Anime Bộ',
        'anime-le': 'Siêu phẩm Anime Lẻ',
        'phim-moi': 'Anime Mới Cập Nhật'
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-24 md:pt-32 pb-32">
            <div className="max-w-[1600px] mx-auto px-6">
                <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-blue-600 pl-8">
                    <div>
                        <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none font-premium italic">
                            {type === 'search' ? `Kết quả: ${keyword}` : (titles[category as string] || 'Danh Sách Phim')}
                        </h1>
                        <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-4 italic opacity-60">
                            Khám phá tinh hoa điện ảnh toàn cầu
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-500 font-black text-[10px] uppercase tracking-widest bg-white/5 px-6 py-3 rounded-full border border-white/5">
                        {movies.length} Tác phẩm
                    </div>
                </header>

                {movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 md:gap-12">
                            {movies.map(movie => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={page}
                            hasMore={hasMore}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center py-32 bg-white/[0.02] rounded-[40px] border border-white/[0.05] animate-in fade-in duration-1000">
                        <div className="inline-block p-10 bg-white/5 rounded-full mb-8">
                            <Icons.Search size={40} className="text-zinc-800" />
                        </div>
                        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">Tín hiệu trống - Không tìm thấy nội dung</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;