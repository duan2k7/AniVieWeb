import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { Icons } from './Icons';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/phim/${movie.slug}`} className="block group">
      <div className="aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-white/[0.05] group-hover:border-blue-500/40 transition-all duration-500 relative shadow-2xl shadow-black">
        <img
          src={movie.thumb_url || movie.poster_url}
          alt={movie.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="bg-blue-600 p-2 rounded-full shadow-xl shadow-blue-500/40">
            <Icons.Play size={12} className="text-white fill-current" />
          </div>
        </div>
      </div>
      <div className="px-1">
        <h3 className="text-zinc-100 text-[12px] md:text-[14px] font-black line-clamp-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight font-premium">
          {movie.name}
        </h3>
        <div className="flex items-center gap-3 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-zinc-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{movie.year}</span>
          <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
          <span className="text-zinc-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{movie.quality}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;