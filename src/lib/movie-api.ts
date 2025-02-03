import axios from "axios";

interface Movie {
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

interface Genre {
  [key: number]: string;
}

async function fetchGenre() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_URL}/genre/movie/list`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
        },
      }
    );
    const rawGenres = res.data.genres;
    const genresDict: Genre = {};

    rawGenres.forEach((genre: { id: number; name: string }) => {
      if (genre.name === "Science Fiction") {
        genresDict[genre.id] = "Sci-Fi";
      } else {
        genresDict[genre.id] = genre.name;
      }
    });

    // console.log(genresDict);

    return genresDict;
  } catch (error) {
    console.error("Error at fetch genres list", error);
    throw error;
  }
}

export async function fetchMoviesList(status: string): Promise<Movie[]> {
  try {
    status = status === "now" ? "now_playing" : "upcoming";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${status}?region=TH&page=1`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
        },
      }
    );

    const genresDict: Genre = await fetchGenre();

    const rawData = [...res.data.results];
    const moviesList: Movie[] = rawData.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      release_date: new Date(movie.release_date),
      poster_path: movie.poster_path,
      genres: movie.genre_ids.map((id: number) => genresDict[id]),
    }));

    moviesList.sort((a, b) =>
      status === "now_playing"
        ? b.release_date.valueOf() - a.release_date.valueOf()
        : a.release_date.valueOf() - b.release_date.valueOf()
    );
    // console.log(moviesList);

    return moviesList;
  } catch (error) {
    console.error("Error at fetch movies list", error);
    throw error;
  }
}

async function fetchVDO(movieId: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/videos`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
        },
      }
    );

    const videos = res.data.results;
    const trailers = videos.filter(
      (vdo: any) => vdo.site === "YouTube" && vdo.type === "Trailer"
    );
    // console.log(trailers);

    return trailers;
  } catch (error) {
    console.error("Error at fetch Video", error);
    throw error;
  }
}

export async function fetchMovieDetail(movieId: string): Promise<Movie> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
        },
      }
    );
    const rawMovie = res.data;
    const trailers = await fetchVDO(movieId);

    const movie: Movie = {
      id: rawMovie.id,
      title: rawMovie.title,
      release_date: new Date(rawMovie.release_date),
      poster_path: rawMovie.poster_path,
      genres: rawMovie.genres.map(
        (genre: { id: number; name: string }) => genre.name
      ),
      overview: rawMovie.overview,
      backdrop_path: rawMovie.backdrop_path,
      runtime: rawMovie.runtime,
      trailer: trailers[0]?.key,
    };
    // console.log(movie);

    return movie;
  } catch (error) {
    console.error("Error at fetch movie detail", error);
    throw error;
  }
}
