import Image from "next/image";

export default function SeatingPlan() {
  const rowLabel = ["A", "B", "C", "D", "E", "F"];
  const seatNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col gap-7 xl:gap-16">
      <Image src="/booking/Screen.svg" alt="screen" width={800} height={40} />
      {rowLabel.map((label) => (
        <div key={label} className="flex flex-row justify-between items-center">
          <p>{label}</p>
          {seatNo.map((seat) => (
            <Image
              src="/booking/Seat-available.svg"
              alt="available-seat-icon"
              width={40}
              height={40}
              className=""
            />
          ))}
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
