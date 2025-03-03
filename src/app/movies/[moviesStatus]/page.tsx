import { redirect } from "next/navigation";
import SearchMovies from "@/components/SearchMovies";
import Header from "@/components/Header";
import { fetchMoviesList } from "@/lib/movie-api";
import Footer from "@/components/Footer";
import Movies from "@/components/Movies";

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
  searchParams?: { name: string };
}) {
  console.log(params, searchParams);

  let moviesList: Movie[] = await fetchMoviesList(params.moviesStatus);
  // console.log(moviesList);

  if (searchParams?.name) {
    moviesList = moviesList.filter((movie) =>
      movie.title.toLowerCase().includes(searchParams.name.toLowerCase())
    );
  }

  return (
    <main className="bg-[#070C1B] h-full w-full *:box-border flex flex-col items-center">
      <Header />
      <SearchMovies />
      <Movies params={params} searchParams={searchParams} />
      <Footer />
    </main>
  );
}
