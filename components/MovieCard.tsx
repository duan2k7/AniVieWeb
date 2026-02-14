import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/phim/${movie.slug}`} className="block group">
      <div className="aspect-[2/3] rounded-md overflow-hidden bg-zinc-900 mb-3 border border-zinc-900 group-hover:border-blue-500/50 transition-all duration-300 relative">
        <img
          src={movie.thumb_url || movie.poster_url}
          alt={movie.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-zinc-200 text-[11px] md:text-sm font-black line-clamp-1 group-hover:text-white transition-colors uppercase tracking-tight">
        {movie.name}
      </h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-zinc-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{movie.year}</p>
        <span className="text-zinc-800 text-[8px] font-bold px-1.5 py-0.5 rounded-sm border border-zinc-900 group-hover:border-zinc-800 group-hover:text-zinc-600 transition-colors uppercase">{movie.lang}</span>
      </div>
    </Link>
  );
};

export default MovieCard;