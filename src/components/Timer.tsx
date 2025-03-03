"use client";
import { cancelBooking } from "@/lib/booking-api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Timer({
  selectedSeat,
  bookingId,
}: {
  selectedSeat: string[];
  bookingId: string;
}) {
  const params = useParams();
  const showId = Array.isArray(params.showId)
    ? params.showId[0]
    : params.showId;
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timeoutId = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timeoutId);
    } else {
      const cancel = async () => {
        await cancelBooking({ seatNumber: selectedSeat, showId, bookingId });
      };
      cancel();
      //TODO 1: when time out should pop up the message before reload
      //TODO 2: add event listener if refresh or changing before time out it should cancel booking
      location.reload();
    }
  }, [timeLeft]);

  const minLeft = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const secLeft = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="pt-4 px-4 flex flex-row gap-2">
      <p className="text-[#8B93B0]">Time Remaining:</p>
      <p className="text-[#4E7BEE]">
        {minLeft}:{secLeft}
      </p>
    </div>
  );
}
