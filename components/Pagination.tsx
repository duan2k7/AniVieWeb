import React from 'react';

interface PaginationProps {
    currentPage: number;
    hasMore: boolean;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, hasMore, onPageChange }) => {
    return (
        <div className="relative mt-40 pt-20">
            {/* Ambient background glow to make it pop */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>

            <div className="flex flex-col items-center gap-14 relative z-10">
                {/* Decorative Label */}
                <div className="flex items-center gap-6 opacity-40 select-none animate-fade">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white italic font-premium">Hệ thống điều hướng</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-24 w-full px-4 text-center">
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`group relative px-12 py-5 rounded-full border transition-all duration-700 overflow-hidden active:scale-95 min-w-[240px]
                            ${currentPage === 1
                                ? 'border-white/5 text-zinc-900 cursor-not-allowed opacity-20'
                                : 'border-white/10 text-zinc-500 hover:border-blue-500/50 hover:text-white shadow-2xl hover:shadow-blue-600/20'}`}
                    >
                        {currentPage !== 1 && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        )}
                        <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.6em] font-premium italic">
                            Trang trước
                        </span>
                    </button>

                    {/* Middle Indicator with Pulse Effect */}
                    <div className="flex items-center gap-10 font-premium">
                        <div className="flex flex-col items-center relative">
                            {/* Animated Pulse Glow */}
                            <div className="absolute inset-x-[-20px] inset-y-[-10px] bg-blue-500/20 blur-2xl rounded-full scale-110 animate-pulse"></div>

                            <span className="text-white text-6xl font-black italic tracking-tighter leading-none relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                                {currentPage < 10 ? `0${currentPage}` : currentPage}
                            </span>
                            <div className="w-10 h-[3px] bg-blue-600 mt-4 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)] relative z-10"></div>
                        </div>

                        <span className="text-zinc-800 text-4xl font-light opacity-30">/</span>

                        <div className="flex flex-col items-center opacity-30 mt-2">
                            <span className="text-zinc-600 text-2xl font-bold italic tracking-widest leading-none">
                                ...
                            </span>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={!hasMore}
                        className={`group relative px-12 py-5 rounded-full border transition-all duration-700 overflow-hidden active:scale-95 min-w-[240px]
                            ${!hasMore
                                ? 'border-white/5 text-zinc-900 cursor-not-allowed opacity-20'
                                : 'border-white/10 text-zinc-500 hover:border-blue-500/50 hover:text-white shadow-2xl hover:shadow-blue-600/20'}`}
                    >
                        {hasMore && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        )}
                        <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.6em] font-premium italic">
                            Tiếp theo
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
