//use this function in client-side
import { Showtime } from "@/models/showtime";
import axios from "axios";

const today: Date = new Date();
today.setHours(0, 0, 0, 0);

export async function fetchShowtimes({
  cinemaId,
  movieId,
  date,
}: {
  cinemaId?: string;
  movieId?: string;
  date: string | null;
}) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/showtimes`,
      {
        params: { cinemaId, movieId, selectedDate: date ?? today.valueOf() },
      }
    );
    const data: Showtime[] = res.data?.map((show: any) => {
      return {
        id: show._id.toString(),
        showtime: new Date(show.showtime),
        cinemaId: show.cinema_id,
        hall: show.hall,
        movieId: show.movie_id,
      };
    });

    return data;
  } catch (error) {
    console.error("Error at fetch showtimes list", error);
    throw error;
  }
}
