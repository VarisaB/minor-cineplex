import { Movie } from "@/models/movie";
import Image from "next/image";
import Halls from "./Halls";
import Tags from "./Tags";
import Link from "next/link";
import { Showtime } from "@/models/showtime";

export default function MovieShowtime({
  movie,
  showtimes,
}: {
  movie: Movie;
  showtimes: Showtime[];
}) {
  if (showtimes.length) {
    return (
      <div
        key={movie.id}
        className="w-full xl:w-[1200px] xl:flex xl:flex-row bg-[#070C1B]"
      >
        <div className="xl:w-44 box-content p-4 xl:p-6 flex flex-row xl:flex-col gap-6 ">
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${movie.poster_path}`}
            alt="poster"
            width={160}
            height={240}
            className="rounded w-24 h-36 xl:w-44 xl:h-64"
          />
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-3 flex-wrap">
              <h4 className="movie-name text-xl font-bold">{movie.title}</h4>
              <Tags contents={movie.genres.slice(0, 2)} />
            </div>
            <Link
              href={`/movies/now/${movie.id}`}
              className="underline text-[#C8CBDD] w-fit"
            >
              Movie Detail
            </Link>
          </div>
        </div>
        {showtimes && (
          <Halls
            showtimes={showtimes.filter(
              (showtime) => showtime.movieId === movie.id
            )}
          />
        )}
      </div>
    );
  }
}
