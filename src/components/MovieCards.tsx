import Image from "next/image";
import Link from "next/link";
import CardHeader from "./CardHeader";

interface Movie {
  id: number;
  title: string;
  release_date: Date;
  poster_path: string;
  genres: string[];
}

export default async function MovieCard({
  movie,
  status,
}: {
  movie: Movie;
  status: string;
}) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <div className="movie-card w-40 h-96 flex flex-col xl:w-64 xl:h-[526px]">
      <Link href={`movies/${status}/${movie.id}`}>
        <Image
          src={`${process.env.TMDB_IMG}${movie.poster_path}`}
          alt="poster"
          width={160}
          height={240}
          className="rounded-md bg-[#21263F] xl:w-64 xl:h-96"
        />
      </Link>
      <p className="release-date text-[#8B93B0] text-sm font-normal mt-3">
        {movie.release_date.toLocaleDateString("en-GB", dateOptions)}
      </p>
      <CardHeader name={movie.title} tags={movie.genres.slice(0, 3)} />
    </div>
  );
}
