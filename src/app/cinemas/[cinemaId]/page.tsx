import Image from "next/image";
import Tags from "@/components/Tags";
import cinemas, { Cinema } from "@/models/cinema";
import { fetchCinemas } from "@/lib/cinema-api";
import { ShowDates } from "@/components/ShowDate";

export default async function CinemaDetailPage({
  params,
}: {
  params: { cinemaId: string };
}) {
  // console.log("cinema param: ", params.cinemaId);

  const cinema: Cinema = await fetchCinemas(params.cinemaId);

  // console.log(cinema);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row mx-auto p-4 mt-16 xl:mt-32 w-full max-w-[1200px] bg-[#070C1BB2] xl:backdrop-blur-xl ">
        <Image
          src="/cinema/poster.png"
          alt="poster"
          width={400}
          height={600}
          className="rounded-md w-32 h-48 xl:w-72 xl:h-[400px] object-cover object-center  bg-[#21263F]"
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
      <div className="date">
        <ShowDates />
      </div>
      <div className="cinemas"></div>
    </div>
  );
}
