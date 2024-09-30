"use client";
import SearchMovies from "@/components/SearchMovies";
import MovieCards from "@/components/MovieCards";

export default function LandingMoviesPage() {
  return (
    <div className="h-full w-full">
      <div className="h-64 bg-white"></div>
      <SearchMovies />
      <div className="section-container bg-white px-4 py-10">
        <div className="status bg-black p-2 flex flex-row gap-4 text-[#8B93B0] text-2xl font-bold ">
          <button>Now Showing</button>
          <button>Comming Soon</button>
        </div>
        <MovieCards />
      </div>
    </div>
  );
}
