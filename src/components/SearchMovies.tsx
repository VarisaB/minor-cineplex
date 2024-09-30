"use client";
import Image from "next/image";

export default function SearchMovies() {
  return (
    <div className="search-bar box-border m-4 p-4 bg-[#070C1B] shadow-sm flex flex-row justify-center gap-3 ">
      <input
        className="w-72 h-12 p-3 bg-[#21263F] placeholder:text-[#8B93B0] border border-[#565F7E] rounded"
        placeholder="Movie"
      />
      <Image
        src={"/movies/search-button.png"}
        alt="search-button"
        width={72}
        height={48}
      />
    </div>
  );
}
