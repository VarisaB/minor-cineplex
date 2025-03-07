import Link from "next/link";
import { redirect } from "next/navigation";
import MovieCard from "@/components/MovieCards";
import { fetchMoviesList } from "@/lib/movie-api";

interface Movie {
  id: number;
  title: string;
  release_date: Date;
  poster_path: string;
  genres: string[];
}

export default async function Movies({
  params,
  searchParams,
}: {
  params?: { moviesStatus: string };
  searchParams?: { name: string };
}) {
  console.log(params, searchParams);

  let moviesList: Movie[] = await fetchMoviesList(
    params?.moviesStatus || "now"
  );
  // console.log(moviesList);

  if (searchParams?.name) {
    const searchName = searchParams.name || "";
    moviesList = moviesList.filter((movie) =>
      movie.title.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  return (
    <div className="section-container w-fit px-4 py-16 flex flex-col gap-6 md:w-[768px] xl:w-[1150px] xl:mt-7 xl:gap-10">
      <div className="status p-2 flex flex-row gap-6 text-[#8B93B0] text-2xl font-bold ">
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/movies/now`}
          className={`h-10 
            ${params?.moviesStatus !== "soon" ? "text-white border-b" : ""}
              hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]`}
        >
          Now Showing
        </Link>
        <Link
          href={{
            pathname: `${process.env.NEXT_PUBLIC_BASE_URL}/movies/soon`,
            // query: { status: "soon" },
          }}
          className={`h-10 
            ${params?.moviesStatus === "soon" ? "text-white border-b" : ""}
             hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]`}
        >
          Comming Soon
        </Link>
      </div>
      <div className="movies-container grid grid-cols-2 gap-6 md:grid-cols-4">
        {moviesList.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            status={params?.moviesStatus || "now"}
          />
        ))}
      </div>
    </div>
  );
}
