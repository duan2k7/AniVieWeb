import React from 'react';

interface PaginationProps {
    currentPage: number;
    hasMore: boolean;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, hasMore, onPageChange }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-24 mt-32 pt-16 border-t border-white/[0.05]">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`group relative px-10 py-4 rounded-full border transition-all duration-500 overflow-hidden active:scale-95 min-w-[200px]
                    ${currentPage === 1
                        ? 'border-white/5 text-zinc-900 cursor-not-allowed opacity-40'
                        : 'border-white/10 text-zinc-500 hover:border-blue-600/50 hover:text-white'}`}
            >
                {/* Background Hover Effect */}
                {currentPage !== 1 && (
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                )}

                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] font-premium italic transition-colors">
                    Trang trước
                </span>
            </button>

            {/* Middle Indicator */}
            <div className="flex items-center gap-8 font-premium animate-fade">
                <div className="flex flex-col items-center">
                    <span className="text-white text-3xl font-black italic tracking-tighter leading-none">
                        {currentPage < 10 ? `0${currentPage}` : currentPage}
                    </span>
                    <div className="w-4 h-[2px] bg-blue-600 mt-2 rounded-full"></div>
                </div>

                <span className="text-zinc-800 text-3xl font-light opacity-30">/</span>

                <div className="flex flex-col items-center opacity-30 mt-1">
                    <span className="text-zinc-600 text-xl font-bold italic tracking-widest leading-none">
                        ...
                    </span>
                </div>
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasMore}
                className={`group relative px-10 py-4 rounded-full border transition-all duration-500 overflow-hidden active:scale-95 min-w-[200px]
                    ${!hasMore
                        ? 'border-white/5 text-zinc-900 cursor-not-allowed opacity-40'
                        : 'border-white/10 text-zinc-500 hover:border-blue-600/50 hover:text-white'}`}
            >
                {/* Background Hover Effect */}
                {hasMore && (
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                )}

                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] font-premium italic transition-colors">
                    Tiếp theo
                </span>
            </button>
        </div>
    );
};

export default Pagination;
