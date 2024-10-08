import SearchMovies from "@/components/SearchMovies";
import MovieCard from "@/components/MovieCards";
import Header from "@/components/Header";
import { fetchMoviesList } from "@/functions/getMovies";

export default async function LandingMoviesPage() {
  interface Movie {
    id: number;
    title: string;
    release_date: Date;
    poster_path: string;
    genres: string[];
  }

  const moviesList: Movie[] = await fetchMoviesList();
  // console.log(moviesList);
  return (
    <div className="h-full w-full *:box-border flex flex-col items-center">
      <Header />
      <SearchMovies />
      <div className="section-container w-fit px-4 py-16 flex flex-col gap-6 md:w-[768px] xl:w-[1150px] xl:mt-7 xl:gap-10">
        <div className="status p-2 flex flex-row gap-6 text-[#8B93B0] text-2xl font-bold ">
          <button className="h-10 hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]">
            Now Showing
          </button>
          <button className="h-10 hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]">
            Comming Soon
          </button>
        </div>
        <div className="movies-container grid grid-cols-2 gap-6 md:grid-cols-4">
          {moviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
