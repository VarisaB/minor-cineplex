//use this function in client-side
import { Showtime } from "@/models/showtime";
import axios from "axios";

export async function fetchShowtimes({
  cinemaId,
  movieId,
}: {
  cinemaId?: string;
  movieId?: string;
}) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/showtimes`,
      {
        params: { cinemaId, movieId },
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
