export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  type?: string;
  time?: string;
  episode_current?: string;
  quality?: string;
  lang?: string;
}

export interface MovieDetail extends Movie {
  content: string;
  actor: string[];
  director: string[];
  country: { name: string; slug: string }[];
  category: { name: string; slug: string }[];
  episodes: EpisodeGroup[];
  time: string;
}

export interface EpisodeGroup {
  server_name: string;
  server_data: Episode[];
}

export interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export enum LayoutType {
  GRID = 'GRID',
  LIST = 'LIST'
}