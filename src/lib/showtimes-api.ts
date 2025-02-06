//use this function in client-side
import { Showtime } from "@/models/showtime";
import axios from "axios";
import { fetchMovieDetail } from "./movie-api";
import { Movie } from "@/models/movie";

const today: Date = new Date();
today.setHours(0, 0, 0, 0);

export async function fetchShowtimes({
  cinemaId,
  movieId,
  date,
}: {
  cinemaId?: string;
  movieId?: string;
  date: string | undefined;
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

export async function fetchShowDetails({ showId }: { showId: string }) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/show-details`,
      {
        params: { showId },
      }
    );

    const data: Showtime | null = res.data
      ? {
          id: res.data._id.toString(),
          showtime: new Date(res.data.showtime),
          cinema: {
            id: res.data.cinema_id._id.toString(),
            name: res.data.cinema_id.name,
          },
          hall: res.data.hall,
          movie: { id: res.data.movie_id },
        }
      : res.data;

    const movieDetail: Movie | null = await fetchMovieDetail(data?.movie?.id);

    if (data && movieDetail) {
      data.movie = movieDetail;
    }

    // console.log(data);

    return data;
  } catch (error) {
    console.error("Error at fetch showtime detail", error);
    throw error;
  }
}
