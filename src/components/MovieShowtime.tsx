"use client";
import { useState, useEffect } from "react";
import { fetchMoviesList } from "@/lib/movie-api";
import { Movie } from "@/models/movie";
import Image from "next/image";
import Halls from "./Halls";
import Tags from "./Tags";
import Link from "next/link";
import { fetchShowtimes } from "@/lib/showtimes-api";

export default function MovieShowtime({ cinemaId }: { cinemaId: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<any[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      const moviesList: Movie[] = await fetchMoviesList("now");
      setMovies(moviesList);

      const showtimesList = await fetchShowtimes({ cinemaId });
      setShowtimes(showtimesList);
    };
    fetchdata();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="w-full xl:w-[1200px] xl:flex xl:flex-row bg-[#070C1B]"
        >
          <div className=" border-[#21263F] p-4 xl:p-6 flex flex-row xl:flex-col gap-6">
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${movie.poster_path}`}
              alt="poster"
              width={160}
              height={240}
              className="rounded w-24 h-36 xl:w-44 xl:h-64"
            />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h4 className="movie-name text-xl font-bold">{movie.title}</h4>
                <Tags contents={movie.genres.slice(0, 3)} />
              </div>
              <Link
                href={`/movies/now/${movie.id}`}
                className="underline text-[#C8CBDD]"
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
      ))}
    </div>
  );
}
