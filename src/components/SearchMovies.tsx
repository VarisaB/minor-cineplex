"use client";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchMovies() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams);
    if (searchText) {
      params.set("name", searchText);
      // console.log(params);
      router.replace(`${pathname}?${params?.toString()}`);
    } else {
      params.delete("name");
      // console.log(params);
      router.replace(`${pathname}`);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className="search-bar absolute top-56 m-4 p-4 bg-[#070C1B] rounded shadow-sm flex flex-row gap-3"
    >
      <input
        className="w-72 h-12 p-3 bg-[#21263F] placeholder:text-[#8B93B0] border border-[#565F7E] rounded"
        placeholder="Movie"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />
      <button type="submit">
        <Image
          src={"/movies/search-button.png"}
          alt="search-button"
          width={72}
          height={48}
        />
      </button>
    </form>
  );
}
