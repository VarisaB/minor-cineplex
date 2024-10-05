import SearchMovies from "@/components/SearchMovies";
import MovieCards from "@/components/MovieCards";
import Header from "@/components/Header";

export default function LandingMoviesPage() {
  return (
    <div className="h-full w-full *:box-border flex flex-col items-center">
      <Header />
      <SearchMovies />
      <div className="section-containerw-96 mt-6 px-4 py-10 flex flex-col gap-7">
        <div className="status p-2 flex flex-row gap-6 text-[#8B93B0] text-2xl font-bold ">
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
