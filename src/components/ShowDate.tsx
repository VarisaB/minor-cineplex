"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DateList {
  thisDate: Date;
  isSelected: boolean;
}

export function ShowDates() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string>("");

  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const selected = searchParams.get("selected") ?? today.valueOf().toString();
    setSelectedDate(selected);
  }, [searchParams]);

  const date: DateList[] = [];
  for (let i: number = 0; i < 7; i++) {
    const newDate: Date = new Date(today);
    newDate.setDate(newDate.getDate() + i);
    date.push({
      thisDate: newDate,
      isSelected: newDate.valueOf().toString() === selectedDate,
    });
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const dayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
  };
  //   console.log(date, today);

  return (
    <div className="p-4 h-24 w-fit bg-[#070C1B] flex flex-row gap-2">
      {date.map((d, index) => (
        <button
          key={d.thisDate.valueOf()}
          onClick={() => {
            router.replace(`${pathname}?selected=${d.thisDate.valueOf()}`, {
              scroll: false,
            });
          }}
          className={`rounded w-28 xl:w-40 h-16 flex flex-col items-center justify-center ${
            d.isSelected ? "bg-[#21263F]" : ""
          } `}
        >
          <h3
            className={`text-2xl font-bold ${
              d.isSelected ? "text-white" : "text-[#8B93B0]"
            }`}
          >
            {index === 0
              ? "TODAY"
              : d.thisDate.toLocaleDateString("en-GB", dayOptions)}
          </h3>
          <p
            className={`${d.isSelected ? "text-[#C8CEDD]" : "text-[#565F7E]"}`}
          >
            {d.thisDate.toLocaleDateString("en-GB", dateOptions)}
          </p>
        </button>
      ))}
    </div>
  );
}
