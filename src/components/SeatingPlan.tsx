import { Seat } from "@/models/showtime";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  selectedSeat: string[];
  setSelectedSeat: Dispatch<SetStateAction<string[]>>;
  seats: Seat[];
};

export default function SeatingPlan({
  selectedSeat,
  setSelectedSeat,
  seats,
}: Props) {
  console.log(seats);

  const rowLabel = ["A", "B", "C", "D", "E", "F"];
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSelecting = (seat: string) => {
    console.log(seat);
    if (selectedSeat.includes(seat)) {
      setSelectedSeat((prev) => prev.filter((item) => item !== seat));
    } else {
      setSelectedSeat((prev) => [...prev, seat]);
    }
  };

  useEffect(() => {}, [selectedSeat]);

  return (
    <div className="flex flex-col gap-7 xl:gap-16">
      <Image src="/booking/Screen.svg" alt="screen" width={800} height={40} />
      {rowLabel.map((label) => (
        <div key={label} className="flex flex-row justify-between items-center">
          <p>{label}</p>
          {number.map((num) =>
            seats.find(
              (seat) => seat.seatNo === label + num && seat.isBooked
            ) ? (
              <Image
                src="/booking/Seat-booked.svg"
                alt="booked-seat-icon"
                width={40}
                height={40}
                key={label + num}
                className=""
              />
            ) : (
              <button
                key={label + num}
                className="relative"
                onClick={() => handleSelecting(label + num)}
              >
                <Image
                  src="/booking/Seat-available.svg"
                  alt="available-seat-icon"
                  width={40}
                  height={40}
                  className=""
                />
                {selectedSeat.includes(label + num) && (
                  <div className="absolute top-0 w-full h-full flex justify-center items-center">
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 29 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="bg-white rounded-full"
                    >
                      <path
                        d="M6.33333 16.3333L10.2331 19.2582C10.6618 19.5797 11.2677 19.5061 11.607 19.0914L21.5 7"
                        stroke="#4E7BEE"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </button>
            )
          )}
          <p>{label}</p>
        </div>
      ))}
      <div className="seat-detail flex flex-row gap-10 justify-center">
        <div className="available-seat flex flex-row gap-4 items-center">
          <Image
            src="/booking/Seat-available.svg"
            alt="available-seat-icon"
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm">Available Seat</p>
            <p>THB 150</p>
          </div>
        </div>
        <div className="booked-seat flex flex-row gap-4 items-center">
          <Image
            src="/booking/Seat-booked.svg"
            alt="booked-seat-icon"
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm">Booked Seat</p>
          </div>
        </div>
      </div>
    </div>
  );
}
