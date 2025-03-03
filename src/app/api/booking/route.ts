import { NextRequest, NextResponse } from "next/server";
import showtimes, { Seat } from "@/models/showtime";
import mongoose from "mongoose";
import booking from "@/models/booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  //TODO: move check authen to middleware
  /** check authentication */
  const authSession = await getServerSession(authOptions);
  console.log(authSession);
  if (!authSession) {
    return NextResponse.json({ status: 401 });
  }

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
      const notExistSeat = seatNumber.filter(
        (num: string) => !data.seats.find((seat: Seat) => seat.seatNo === num)
      );
      await showtimes.updateOne(
        { _id: showId },
        {
          $addToSet: {
            seats: {
              $each: notExistSeat.map((seat: string) => ({
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
        user: authSession?.user?.id,
        showtime: showId,
        seats: seatNumber,
      });
      await newBooking.save({ session });
      return newBooking;
    });
    session.endSession();
    // console.log(transaction);
    return NextResponse.json(
      { message: "Reserve Seat Successful", bookingId: transaction._id },
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

export async function PATCH(req: NextRequest) {
  //TODO: move check authen to middleware
  /** check authentication */
  const authSession = await getServerSession(authOptions);
  console.log(authSession);
  if (!authSession) {
    return NextResponse.json({ status: 401 });
  }

  const { showId, seatNumber, bookingId } = await req.json();
  const session = await mongoose.startSession();
  try {
    const transaction = await session.withTransaction(async () => {
      const data = await showtimes.findById(showId).session(session);
      console.log(data);
      if (!data) {
        throw new Error("Showtime not found.");
      }

      /** update existing seats */
      const showDetail = await showtimes.findByIdAndUpdate(
        showId,
        { $set: { "seats.$[elem].isBooked": false } },
        {
          arrayFilters: [
            { "elem.seatNo": { $in: seatNumber }, "elem.isBooked": true },
          ],
          new: true,
          session,
        }
      );

      /** update booking history */
      const history = await booking.findByIdAndUpdate(
        bookingId,
        { $set: { status: "Cancel" } },
        { new: true, session }
      );

      console.log("Booking history: ", history, "Showtime: ", showDetail);

      return history;
    });
    session.endSession();
    console.log(transaction);
    return NextResponse.json(
      { message: "Cancel Booking Successful", bookingId: transaction._id },
      { status: 200 }
    );
  } catch (error: any) {
    session.endSession();
    console.error("Cancel Booking failed:", error.message ?? error);
    return NextResponse.json(
      { message: `Cancel Booking failed. ${error.message}` },
      { status: error.status || 400 }
    );
  }
}
