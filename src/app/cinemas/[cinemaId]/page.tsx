import Image from "next/image";
import Tags from "@/components/Tags";
import cinemas, { Cinema } from "@/models/cinemas";
import { fetchCinemas } from "@/functions/getCinemas";
import { ShowDates } from "@/components/ShowDate";

export default async function CinemaDetailPage({
  params,
}: {
  params: { cinemaId: string };
}) {
  console.log(params.cinemaId);

  const cinema: Cinema = await fetchCinemas(params.cinemaId);

  console.log(cinema);

  return (
    <div className="w-full h-full flex flex-col">
      {/* <div className="flex flex-col mx-auto xl:flex-row xl:mt-32 xl:w-[1200px] xl:bg-[#070C1BB2] xl:backdrop-blur-xl ">
        <Image
          src="\cinema\poster.png"
          alt="poster"
          width={120}
          height={180}
          className="rounded-md bg-[#21263F] w-full h-auto xl:w-[375px]"
        />
        <div className="detail w-full px-4 py-10 flex flex-col xl:p-20">
          <h1 className="movie-name text-white text-4xl font-bold">
            {cinema.name}
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
          {params.moviesStatus === "now" && (
            <button className="booking bg-[#4E7BEE] w-32 h-12 mt-6 py-3 rounded font-bold xl:mt-12">
              Book Ticket
            </button>
          )}
          <p className="overview text-[#C8CEDD] mt-10 xl:mt-20">
            {movie.overview}
          </p>
        </div>
      </div> */}
      {/* <iframe
        src={`${process.env.YOUTUBE_URL}/${movie.trailer}`}
        className="w-full aspect-video mx-auto mb-20 md:w-[720px] xl:mt-20"
        allowFullScreen
      ></iframe> */}
      <div className="date">
        <ShowDates />
      </div>
      <div className="cinemas"></div>
    </div>
  );
}
