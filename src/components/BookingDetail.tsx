"use client";
import { reserveSeat } from "@/lib/booking-api";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectedSeat: string[];
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export default function BookingDetail({ selectedSeat, step, setStep }: Props) {
  const params = useParams();
  const showId = Array.isArray(params.showId)
    ? params.showId[0]
    : params.showId;

  const price = 150;

  const handleNext = async () => {
    if (step === 2) {
      await reserveSeat({ seatNumber: selectedSeat, showId });
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-2 border-t border-[#21263F] p-4">
      <div className="flex flex-row justify-between">
        <p className="text-[#C8CEDD]">Selected Seat</p>
        <p className="text-white font-bold">{selectedSeat.join(",")}</p>
      </div>
      {step === 3 && (
        <div className="flex flex-row justify-between">
          <p className="text-[#C8CEDD]">Payment method</p>
          <p className="text-white font-bold">{"pay"}</p>
        </div>
      )}
      <div className="flex flex-row justify-between">
        <p className="text-[#C8CEDD]">Total</p>
        <p className="text-white font-bold">{selectedSeat.length * price}</p>
      </div>
      <button
        className="bg-[#4E7BEE] rounded w-full p-3 my-3 font-bold"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
