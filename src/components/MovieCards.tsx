import Image from "next/image";
import axios from "axios";

export default async function MovieCards() {
  interface movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    genre_ids: number[];
  }

  async function fetchMoviesList() {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          params: {
            api_key: process.env.TMDB_KEY,
          },
        }
      );
      return res.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  const moviesList: movie[] = await fetchMoviesList();
  // console.log(moviesList);

  return (
    <div className="movies-container flex flex-wrap gap-5">
      {moviesList.map((movie) => (
        <div
          key={movie.id}
          className="movie-card w-40 h-96 flex flex-col gap-4 "
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="poster"
            width={160}
            height={240}
            className="rounded-md bg-[#21263F]"
          />
          <div>
            <h3 className="release-date text-[#8B93B0] text-sm font-normal">
              {movie.release_date}
            </h3>
            <h2 className="movie-name text-xl font-bold">{movie.title}</h2>
          </div>
          <div className="tags flex flex-row flex-wrap gap-2">
            {movie.genre_ids.map((genre, index) => (
              <h3
                key={index}
                className="tag bg-[#21263F] h-8 px-3 py-1.5 rounded-md text-[#8B93B0] text-sm font-normal "
              >
                {genre}
              </h3>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
