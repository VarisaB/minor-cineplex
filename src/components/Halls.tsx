"use client";
import { Showtime } from "@/models/showtime";
import { useRouter } from "next/navigation";

export default function Halls({ showtimes }: { showtimes: Showtime[] }) {
  // console.log("hall: ", showtimes);
  const router = useRouter();

  const halls: number[] = showtimes.reduce((acc: number[], curr) => {
    if (!acc.includes(curr.hall)) {
      acc.push(curr.hall);
    }
    return acc;
  }, []);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const now = new Date();
  const timeStyle = (time: Date, index: number, allTime: Showtime[]) => {
    if (time < now) {
      return "border border-[#565F7E] text-[#565F7E]";
    } else if (index === 0 || allTime[index - 1]?.showtime < now) {
      return "bg-[#4E7BEE]";
    } else {
      return "bg-[#1E29A8]";
    }
  };

  return (
    <div className="bg-[#070C1B] px-4 py-6 flex flex-col gap-10 xl:gap-16 xl:p-10">
      {halls.map((hall, index) => (
        <div key={index} className="flex flex-col gap-4">
          <h3 className="text-[#C8CEDD] text-2xl font-bold ">{`Hall ${hall}`}</h3>
          <div className="flex flex-wrap gap-4 xl:gap-6">
            {showtimes
              .filter((show) => show.hall === hall)
              .map((show, index, self) => (
                <button
                  key={show.id}
                  className={`rounded w-24 h-12 flex justify-center items-center text-xl font-bold ${timeStyle(
                    show.showtime,
                    index,
                    self
                  )}`}
                  disabled={show.showtime < now}
                  onClick={() => {
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${show.id}`
                    );
                  }}
                >
                  {show.showtime.toLocaleTimeString("en-GB", timeOptions)}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
