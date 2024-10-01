import Image from "next/image";

export default function MovieCards() {
  interface movie {
    name: string;
  }
  const mock: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  const tag: string[] = ["good", "hello", "EN/TH"];
  return (
    <div className="movies-container bg-gray-500 flex flex-wrap gap-5">
      {mock.map((m) => (
        <div className="movie-card border w-40 h-96 flex flex-col gap-4 ">
          <Image
            src={""}
            alt="poster"
            className="w-full h-60 rounded-md border bg-yellow-100"
          />
          <div>
            <h3 className="release-date">23 Sep 2024</h3>
            <h2 className="movie-name ">Harry Potter</h2>
          </div>
          <div className="tags flex flex-row flex-wrap gap-2">
            {tag.map((t) => (
              <h3 className="tag bg-[#21263F] h-8 px-3 py-1.5 rounded-md text-[#8B93B0] text-sm font-normal ">
                {t}
              </h3>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
