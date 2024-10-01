"use client";
import SearchMovies from "@/components/SearchMovies";
import MovieCards from "@/components/MovieCards";

export default function LandingMoviesPage() {
  return (
    <div className="h-full w-full *:box-border">
      <div className="h-64 bg-white"></div>
      <SearchMovies />
      <div className="section-container bg-white px-4 py-10 flex flex-col gap-10">
        <div className="status bg-black p-2 flex flex-row gap-4 text-[#8B93B0] text-2xl font-bold ">
          <button className="h-10 hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]">
            Now Showing
          </button>
          <button className="h-10 hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]">
            Comming Soon
          </button>
        </div>
        <MovieCards />
      </div>
    </div>
  );
}
