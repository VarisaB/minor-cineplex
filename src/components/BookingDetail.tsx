"use client";
import { fetchShowDetails } from "@/lib/showtimes-api";
import { Showtime } from "@/models/showtime";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { dateOptions } from "./ShowDate";
import { timeOptions } from "./Halls";

export default function BookingDetail() {
  const params = useParams();
  const showId = Array.isArray(params.showId)
    ? params.showId[0]
    : params.showId;

  const [showDetails, setShowDatails] = useState<Showtime | null>();

  useEffect(() => {
    const fetchData = async () => {
      const show = await fetchShowDetails({ showId });
      // console.log(show);
      setShowDatails(show);
    };
    fetchData();
  }, []);

  if (showDetails) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row xl:flex-col gap-4 p-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${showDetails?.movie?.poster_path}`}
            alt="poster"
            width={120}
            height={180}
            className="rounded-md bg-[#21263F] xl:w-64 xl:h-96"
          />
          <div className="text-[#C8CEDD] flex flex-col gap-1 justify-center">
            <h4 className="movie-name text-white text-xl font-bold mb-2">
              {showDetails?.movie?.title}
            </h4>

            <div className="cinema-name flex flex-row gap-3">
              <Image
                src="/booking/Pin.svg"
                alt="pin-icon"
                width={16}
                height={16}
                className="h-6"
              />
              <p>{showDetails?.cinema?.name}</p>
            </div>

            <div className="show-date flex flex-row gap-3">
              <Image
                src="/booking/Date.svg"
                alt="calendar-icon"
                width={16}
                height={16}
                className="h-6"
              />
              <p>
                {showDetails?.showtime.toLocaleDateString("en-GB", dateOptions)}
              </p>
            </div>

            <div className="showtime flex flex-row gap-3">
              <Image
                src="/booking/Time.svg"
                alt="clock-icon"
                width={16}
                height={16}
                className="h-6"
              />
              <p>
                {showDetails?.showtime.toLocaleTimeString("en-GB", timeOptions)}
              </p>
            </div>

            <div className="hall-number flex flex-row  gap-3">
              <Image
                src="/booking/Shop.svg"
                alt="hall-icon"
                width={16}
                height={16}
                className="h-6"
              />
              <p>Hall {showDetails?.hall}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-[#21263F] p-4">
          <div className="flex flex-row justify-between">
            <p className="text-[#C8CEDD]">Selected Seat</p>
            <p className="text-white font-bold">THB</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-[#C8CEDD]">Payment method</p>
            <p className="text-white font-bold">THB</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-[#C8CEDD]">Total</p>
            <p className="text-white font-bold">THB</p>
          </div>
          <button className="bg-[#4E7BEE] rounded w-full p-3 my-3 font-bold">
            Next
          </button>
        </div>
      </div>
    );
  }
}
