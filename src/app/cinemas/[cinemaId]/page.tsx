import Image from "next/image";
import cinemas, { Cinema } from "@/models/cinema";
import { fetchCinemas } from "@/lib/cinema-api";
import { ShowDates } from "@/components/ShowDate";
import Footer from "@/components/Footer";
import MovieShowtime from "@/components/MovieShowtime";

export default async function CinemaDetailPage({
  params,
}: {
  params: { cinemaId: string };
}) {
  // console.log("cinema param: ", params.cinemaId);

  const cinema: Cinema = await fetchCinemas(params.cinemaId);

  // console.log(cinema);

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex flex-row md:items-center xl:items-start mx-auto p-4 mt-16 xl:mt-32 w-full max-w-[1200px] bg-[#070C1BB2] xl:backdrop-blur-xl ">
        <Image
          src="/cinema/poster.png"
          alt="poster"
          width={400}
          height={600}
          className="rounded-md w-32 h-44 xl:w-72 xl:h-[400px] object-cover object-center  bg-[#21263F]"
        />
        <div className="m-4 xl:m-14 flex flex-col gap-4 ">
          <h1 className="text-white text-2xl xl:text-4xl font-bold">
            {cinema.name}
          </h1>
          <p className="location">
            {cinema.location}, {cinema.city}
          </p>
          <p className="overview hidden md:block text-[#C8CEDD] xl:mt-12">
            Minor Cineplex cinemas often offer features like comfortable
            seating, concession stands with snacks and drinks, and advanced
            sound systems. Typically show a mix of Hollywood blockbusters, Thai
            films, and independent or international movies.
          </p>
        </div>
      </div>
      <div className="date bg-[#070C1B] overflow-x-auto flex xl:justify-center ">
        <ShowDates />
      </div>
      <div className="cinemas">
        <MovieShowtime cinemaId={params.cinemaId} />
      </div>
      <Footer />
    </div>
  );
}
