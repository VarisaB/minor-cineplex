import { NextRequest, NextResponse } from "next/server";
import showtimes, { Seat } from "@/models/showtime";
import mongoose from "mongoose";
import booking from "@/models/booking";

export async function POST(req: NextRequest) {
  const { showId, seatNumber } = await req.json();
  const session = await mongoose.startSession();
  try {
    const transaction = await session.withTransaction(async () => {
      const data = await showtimes.findById(showId).session(session);
      console.log(data);
      if (!data) {
        throw new Error("Showtime not found.");
      }

      /** check booked seat */
      const bookedSeat = data.seats.filter(
        (seat: Seat) => seatNumber.includes(seat.seatNo) && seat.isBooked
      );
      if (bookedSeat.length > 0) {
        throw new Error("Selected seat is not avilable.");
      }

      /** update existing seats */
      await showtimes.updateOne(
        { _id: showId },
        { $set: { "seats.$[elem].isBooked": true } },
        {
          arrayFilters: [
            { "elem.seatNo": { $in: seatNumber }, "elem.isBooked": false },
          ],
          session,
        }
      );

      /** add new seats if it not exist */
      await showtimes.updateOne(
        { _id: showId },
        {
          $addToSet: {
            seats: {
              $each: seatNumber.map((seat: string) => ({
                seatNo: seat,
                isBooked: true,
              })),
            },
          },
        },
        {
          session,
        }
      );

      /** create new booking history */
      const newBooking = new booking({
        showtime: showId,
        seats: seatNumber,
      });
      await newBooking.save({ session });
      return true;
    });
    session.endSession();
    console.log(transaction);
    return NextResponse.json(
      { message: "Reserve Seat Successful" },
      { status: 200 }
    );
  } catch (error: any) {
    session.endSession();
    console.error("Booking failed:", error.message ?? error);
    return NextResponse.json(
      { message: `Booking failed. ${error.message}` },
      { status: error.status || 400 }
    );
  }
}
