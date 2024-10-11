import Image from "next/image";
import { fetchMovieDetail } from "@/functions/getMovies";
import Tags from "@/components/Tags";

export default async function MovieDetailPage({
  params,
}: {
  params: { movieId: string };
}) {
  // console.log(params.movieId);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const movie = await fetchMovieDetail(params.movieId);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col mx-auto xl:flex-row xl:mt-32 xl:w-[1200px] xl:bg-[#070C1BB2] xl:backdrop-blur-xl ">
        <Image
          src={`${process.env.TMDB_IMG}${movie.poster_path}`}
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
          <button className="booking bg-[#4E7BEE] w-32 h-12 mt-6 py-3 rounded font-bold xl:mt-12">
            Book Ticket
          </button>
          <p className="overview text-[#C8CEDD] mt-10 xl:mt-20">
            {movie.overview}
          </p>
        </div>
      </div>
      <iframe
        src={`${process.env.YOUTUBE_URL}/${movie.trailer}`}
        className="w-full aspect-video mx-auto mb-20 md:w-[720px] xl:mt-20"
        allowFullScreen
      ></iframe>
    </div>
  );
}
