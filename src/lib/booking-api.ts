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

    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error in reserve seat", error);
    throw error;
  }
}
