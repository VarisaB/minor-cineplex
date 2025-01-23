"use client";
import { useState, useEffect } from "react";
import cinema, { Cinema } from "@/models/cinema";
import { fetchCinemas } from "@/lib/cinema-api";
import Image from "next/image";
import Halls from "./Halls";

export default function CinemaShowtime() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      const cinemasList: Cinema[] = await fetchCinemas();
      setCinemas(cinemasList);
    };
    fetchdata();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center ">
      {cinemas.map((cinema) => (
        <div className="xl:w-[1200px]">
          <div
            key={cinema._id.toString()}
            className="bg-[#070C1B] border-b border-[#21263F] p-4 xl:px-6 flex flex-row justify-between items-center"
          >
            <div className="flex flex-row items-center gap-5">
              <Image
                src="/cinema/Pin_fill.svg"
                alt="cinema-pin"
                width={44}
                height={44}
              />
              <h3 className="text-white text-2xl font-bold">{cinema.name}</h3>
            </div>
            <button className="w-10 h-10 flex justify-center items-center">
              <Image
                src="/header/vector.svg"
                alt="dropdown icon"
                width={20}
                height={10}
              />
            </button>
          </div>
          <Halls />
        </div>
      ))}
    </div>
  );
}
