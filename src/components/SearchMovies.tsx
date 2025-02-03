"use client";
import Image from "next/image";
import {
  useParams,
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchMovies() {
  const { moviesStatus } = useParams();
  const status = moviesStatus ?? "now";
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const nameParam = searchParams.get("name");
    if (nameParam) {
      setSearchText(nameParam);
    } else {
      setSearchText("");
    }
  }, [searchParams, pathname, router]);

  const handleSubmit = () => {
    if (searchText) {
      params.set("name", searchText);
    } else {
      params.delete("name");
    }
    router.replace(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/movies/${status}?${params?.toString()}`
    );
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
        placeholder="Movie Name"
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
