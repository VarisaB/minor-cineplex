export interface Movie {
  id: number;
  title: string;
  release_date: Date;
  poster_path: string;
  genres: string[];
  overview?: string;
  backdrop_path?: string;
  runtime?: number;
  trailer?: string;
}
