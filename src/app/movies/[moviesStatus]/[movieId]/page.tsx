import Image from "next/image";
import { fetchMovieDetail } from "@/lib/movie-api";
import { fetchCinemas } from "@/lib/cinema-api";
import { fetchShowtimes } from "@/lib/showtimes-api";
import Tags from "@/components/Tags";
import { ShowDates } from "@/components/ShowDate";
import Footer from "@/components/Footer";
import CinemaShowtime from "@/components/CinemaShowtime";
import { Cinema } from "@/models/cinema";

export default async function MovieDetailPage({
  params,
  searchParams,
}: {
  params: { moviesStatus: string; movieId: string };
  searchParams?: { selected: string };
}) {
  // console.log(params.movieId);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  console.log(params);

  const movie = await fetchMovieDetail(params.movieId);
  const cinemaList = await fetchCinemas();
  const showtimesList = await fetchShowtimes({
    movieId: params.movieId,
    date: searchParams?.selected,
  });

  if (movie) {
    return (
      <div className="w-full h-full flex flex-col gap-10">
        <div className="flex flex-col mx-auto xl:flex-row xl:mt-32 xl:w-[1200px] xl:bg-[#070C1BB2] xl:backdrop-blur-xl ">
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${movie.poster_path}`}
            alt="poster"
            width={375}
            height={547}
            className="rounded-md bg-[#21263F] w-full h-auto xl:w-[375px]"
          />
          <div className="detail w-full px-4 py-10 flex flex-col xl:p-20">
            <h1 className="movie-name text-white text-4xl font-bold">
              {movie.title}
            </h1>
            <div className="genres-date-container mt-4 flex flex-row flex-wrap items-center gap-x-5 gap-y-2 ">
              <Tags contents={movie.genres} />
              <span className="border-r border-[#565F7E] h-6 "></span>
              <p className="release-date text-[#C8CEDD] w-[90%] xl:w-fit">
                {`Release date: ${movie.release_date.toLocaleDateString(
                  "en-GB",
                  dateOptions
                )}`}
              </p>
            </div>
            {/* {params.moviesStatus === "now" && (
            <button className="booking bg-[#4E7BEE] w-32 h-12 mt-6 py-3 rounded font-bold xl:mt-12">
              Book Ticket
            </button>
          )} */}
            <p className="overview text-[#C8CEDD] mt-10 xl:mt-20">
              {movie.overview}
            </p>
          </div>
        </div>
        {/* <iframe
        src={`${process.env.YOUTUBE_URL}/${movie.trailer}`}
        className="w-full aspect-video mx-auto mb-20 md:w-[720px] xl:mt-20"
        allowFullScreen
      ></iframe> */}

        {params.moviesStatus === "now" && (
          <div className="date bg-[#070C1B] overflow-x-auto flex xl:justify-center ">
            <ShowDates />
          </div>
        )}
        {params.moviesStatus === "now" && (
          <div className="cinemas-hall flex flex-col gap-6 items-center xl:mx-28">
            {cinemaList.map((cinema: Cinema) => (
              <CinemaShowtime
                key={cinema.id}
                cinema={cinema}
                showtimes={showtimesList.filter(
                  (show) => show.cinemaId === cinema.id
                )}
              />
            ))}
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
