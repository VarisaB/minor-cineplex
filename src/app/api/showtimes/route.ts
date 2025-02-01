import { NextRequest, NextResponse } from "next/server";
import showtimes, { Showtime } from "@/models/showtime";
import cinemas, { Cinema, mappingCinemaStructure } from "@/models/cinema";
import axios from "axios";
import { Movie } from "@/models/movie";
import mongoose from "mongoose";

function setToday(date: Date) {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return { today, tomorrow };
}

export async function GET(req: NextRequest) {
  console.log("showtime model: ", showtimes);
  const { today, tomorrow } = setToday(new Date());
  console.log("date = ", today, tomorrow);

  const cinemaId = req.nextUrl.searchParams.get("cinemaId");
  console.log("cinema_id = ", cinemaId);

  const movieId = req.nextUrl.searchParams.get("movieId");
  console.log("movie_id = ", movieId);

  const queryDB: any = {
    showtime: { $gte: today, $lt: tomorrow },
  };
  if (movieId) {
    queryDB.movie_id = movieId;
  }
  if (cinemaId) {
    queryDB.cinema_id = cinemaId;
  }

  const data = await showtimes.find(queryDB);
  // console.log(data);

  return NextResponse.json(data);
}

/**Create and Update mockup Data*/
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("body: ", body);

  let allMovies: Movie[] = [];

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/now_playing?region=TH`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
        },
      }
    );

    const rawMovies = res.data.results;
    allMovies = rawMovies.length
      ? rawMovies.map((movie: any) => ({
          id: movie.id,
          release_date: new Date(movie.release_date),
        }))
      : [];
    console.log(allMovies);
  } catch (error) {
    console.error("Error to fetch movies list at showtimes route", error);
    throw error;
  }
  const cinemasDb = await cinemas.find();
  const cinemaList: Cinema[] = cinemasDb.map((cinema) =>
    mappingCinemaStructure(cinema)
  );

  // console.log(cinemaList);

  let showtimesList = [];

  for (let d: number = 0; d < 7; d++) {
    let selcetedDate: Date = new Date("2025-01-29");
    selcetedDate.setDate(selcetedDate.getDate() + d);
    /** check existing showtime in database */
    const { today, tomorrow } = setToday(selcetedDate);
    const data = await showtimes.findOne({
      showtime: { $gte: today, $lt: tomorrow },
    });
    if (data) {
      continue;
    }
    /** filter only movies that showing that day */
    const moviesNow = allMovies.filter(
      (movie) => movie.release_date <= selcetedDate
    );
    /** create showtimes */
    for (let cinema of cinemaList) {
      let i = 0;
      for (let h = 0; h < cinema.totalHalls; h++) {
        for (let j = 0; j < 6; j++) {
          let timeShowing: Date = new Date(selcetedDate);
          if (h % 2) {
            timeShowing.setHours(11 + 2 * j, 10, 0);
          } else {
            timeShowing.setHours(10 + 2 * j, 40, 0);
          }
          let movieId: number;
          if (j % 2) {
            movieId = moviesNow[i]?.id ?? moviesNow[0].id;
          } else {
            movieId = moviesNow[i + 1]?.id ?? moviesNow[1].id;
          }

          showtimesList.push({
            showtime: timeShowing,
            cinema_id: cinema.id,
            hall: h + 1,
            movie_id: movieId,
          });
        }
        i++;
      }
    }
  }
  // console.log(showtimesList);

  try {
    await showtimes.insertMany(showtimesList);
    return NextResponse.json(
      { message: "Create Showtime Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create Showtime" },
      { status: 500 }
    );
  }
}
