import Image from "next/image";
import { fetchMoviesList } from "@/functions/getMovies";

export default async function MovieCards() {
  interface Movie {
    id: number;
    title: string;
    release_date: Date;
    poster_path: string;
    genres: string[];
  }

  const moviesList: Movie[] = await fetchMoviesList();
  // console.log(moviesList);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <div className="movies-container grid grid-cols-2 gap-6 md:grid-cols-4">
      {moviesList.map((movie) => (
        <div
          key={movie.id}
          className="movie-card w-40 h-96 flex flex-col gap-3 xl:w-64 xl:h-[526px]"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="poster"
            width={160}
            height={240}
            className="rounded-md bg-[#21263F] xl:w-64 xl:h-96"
          />
          <div>
            <h3 className="release-date text-[#8B93B0] text-sm font-normal">
              {movie.release_date.toLocaleDateString("en-GB", dateOptions)}
            </h3>
            <h2 className="movie-name text-xl font-bold">
              {movie.title.length > 20
                ? `${movie.title.slice(0, 17)}...`
                : movie.title}
            </h2>
          </div>
          <div className="tags flex flex-row flex-wrap gap-1.5">
            {movie.genres.slice(0, 4).map((genre, index) => (
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
