import Link from "next/link";
import { redirect } from "next/navigation";
import SearchMovies from "@/components/SearchMovies";
import MovieCard from "@/components/MovieCards";
import Header from "@/components/Header";
import { fetchMoviesList } from "@/lib/movie-api";
import Footer from "@/components/Footer";

interface Movie {
  id: number;
  title: string;
  release_date: Date;
  poster_path: string;
  genres: string[];
}

export default async function LandingMoviesPage({
  params,
  searchParams,
}: {
  params: { moviesStatus: string };
  searchParams: { name: string };
}) {
  console.log(params, searchParams);

  /**should have other way to check and redirect to 404 not found page**/
  const validStatus = ["now", "soon"];
  // If the slug is not in the valid set, redirect to homepage
  if (!validStatus.includes(params.moviesStatus)) {
    redirect("/");
  }

  let moviesList: Movie[] = await fetchMoviesList(params.moviesStatus);
  // console.log(moviesList);

  if (searchParams?.name) {
    moviesList = moviesList.filter((movie) =>
      movie.title.toLowerCase().includes(searchParams.name.toLowerCase())
    );
  }

  return (
    <div className="h-full w-full *:box-border flex flex-col items-center">
      <Header />
      <SearchMovies />
      <div className="section-container w-fit px-4 py-16 flex flex-col gap-6 md:w-[768px] xl:w-[1150px] xl:mt-7 xl:gap-10">
        <div className="status p-2 flex flex-row gap-6 text-[#8B93B0] text-2xl font-bold ">
          <Link
            href="/movies/now"
            className={`h-10 
            ${params.moviesStatus === "now" ? "text-white border-b" : ""}
              hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]`}
          >
            Now Showing
          </Link>
          <Link
            href="/movies/soon"
            className={`h-10 
            ${params.moviesStatus === "soon" ? "text-white border-b" : ""}
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
              status={params.moviesStatus}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
