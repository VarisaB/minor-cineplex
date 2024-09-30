"use client";
import SearchMovies from "@/components/SearchMovies";

export default function LandingMoviesPage() {
  return (
    <div className="h-screen *:box-border">
      <div className="h-64 bg-white"></div>
      <SearchMovies />
      <div className="movies-container">
        <div className="status"></div>
        <div className="movies">
          <div className="movie-card"></div>
        </div>
      </div>
    </div>
  );
}
