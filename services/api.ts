import { Movie, MovieDetail } from '../types';

const BASE_URL = 'https://phim.nguonc.com/api';

const fetchJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const ApiService = {
  // Get newly updated movies
  getNewMovies: async (page: number = 1): Promise<{ items: Movie[], pagination: any }> => {
    const data = await fetchJson(`${BASE_URL}/films/phim-moi-cap-nhat?page=${page}`);
    return {
      items: data.items.map((item: any) => ({
        _id: item.id || item.slug,
        name: item.name,
        slug: item.slug,
        origin_name: item.original_name,
        thumb_url: item.thumb_url,
        poster_url: item.poster_url,
        year: item.year ? parseInt(item.year) : (item.created ? new Date(item.created).getFullYear() : 0),
        quality: item.quality,
        lang: item.language
      })),
      pagination: data.paginate
    };
  },

  // Get movies by category/list
  getMoviesByType: async (type: string, page: number = 1, limit: number = 24): Promise<{ items: Movie[], params: any }> => {
    // Note: NguonC list API might not use 'limit' directly in URL or uses a different slug
    // We map 'hoat-hinh' to the correct slug if needed, but usually it matches
    const data = await fetchJson(`${BASE_URL}/films/danh-sach/${type}?page=${page}`);
    return {
      items: data.items.map((item: any) => ({
        _id: item.id || item.slug,
        name: item.name,
        slug: item.slug,
        origin_name: item.original_name,
        thumb_url: item.thumb_url,
        poster_url: item.poster_url,
        year: item.year ? parseInt(item.year) : (item.created ? new Date(item.created).getFullYear() : 0),
        quality: item.quality,
        lang: item.language,
        type: type
      })),
      params: { ...data.paginate, type }
    };
  },

  // Get Movie Details
  getMovieDetail: async (slug: string): Promise<MovieDetail> => {
    const data = await fetchJson(`${BASE_URL}/film/${slug}`);
    const item = data.movie;

    // Extract year from category groups if missing
    let year = item.year ? parseInt(item.year) : 0;
    if (!year && item.category) {
      const yearGroup = Object.values(item.category).find((g: any) => g.group && g.group.name === 'Năm');
      if (yearGroup && Array.isArray((yearGroup as any).list) && (yearGroup as any).list.length > 0) {
        year = parseInt((yearGroup as any).list[0].name);
      }
    }
    if (!year && item.created) year = new Date(item.created).getFullYear();

    return {
      _id: item.id || item.slug,
      name: item.name,
      slug: item.slug,
      origin_name: item.original_name || '',
      thumb_url: item.thumb_url,
      poster_url: item.poster_url,
      year: isNaN(year) ? 0 : year,
      quality: item.quality,
      lang: item.language,
      content: item.description || item.content || '',
      actor: typeof item.actors === 'string' ? item.actors.split(',') : (item.actors || []),
      director: typeof item.director === 'string' ? item.director.split(',') : (item.director || []),
      category: item.category
        ? Object.values(item.category).flatMap((group: any) =>
          (group.list || []).map((c: any) => ({
            name: c.name,
            slug: c.slug || ''
          }))
        )
        : [],
      country: item.country
        ? Object.values(item.country).flatMap((group: any) =>
          (group.list || []).map((c: any) => ({
            name: c.name,
            slug: c.slug || ''
          }))
        )
        : [],
      time: item.time || '',
      episodes: (item.episodes || []).map((server: any) => ({
        server_name: server.server_name,
        server_data: (server.items || []).map((ep: any) => ({
          name: ep.name,
          slug: ep.slug,
          filename: ep.name,
          link_embed: ep.embed,
          link_m3u8: ep.m3u8
        }))
      }))
    };
  },

  // Search Movies
  searchMovies: async (keyword: string, page: number = 1): Promise<{ items: Movie[], pagination?: any }> => {
    try {
      const data = await fetchJson(`${BASE_URL}/films/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);
      const rawItems = data.items || [];

      return {
        items: rawItems.map((item: any) => ({
          _id: item.id || item.slug,
          name: item.name,
          slug: item.slug,
          origin_name: item.original_name || '',
          thumb_url: item.thumb_url,
          poster_url: item.poster_url,
          year: item.year ? parseInt(item.year) : (item.created ? new Date(item.created).getFullYear() : 0),
          quality: item.quality,
          lang: item.language
        })),
        pagination: data.paginate
      };
    } catch (error) {
      console.error('Search failed:', error);
      return { items: [], pagination: { total_page: 1 } };
    }
  }
};