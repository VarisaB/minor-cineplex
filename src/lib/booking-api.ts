import axios from "axios";

export async function reserveSeat({
  showId,
  seatNumber,
}: {
  showId: string;
  seatNumber: string[];
}) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`,
      { showId, seatNumber }
    );

    // console.log("booking-api", res.data);

    return res.data;
  } catch (error) {
    console.error("Error in reserve seat", error);
    throw error;
  }
}

export async function cancelBooking({
  showId,
  seatNumber,
  bookingId,
}: {
  showId: string;
  seatNumber: string[];
  bookingId: string;
}) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`,
      { showId, seatNumber, bookingId }
    );

    // console.log("booking-api", res.data);

    return res.data;
  } catch (error) {
    console.error("Error in reserve seat", error);
    throw error;
  }
}
