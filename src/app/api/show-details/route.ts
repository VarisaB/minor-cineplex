import showtimes from "@/models/showtime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const showtimeId = req.nextUrl.searchParams.get("showId");
  console.log(showtimeId);

  try {
    const data = await showtimes.findById(showtimeId).populate("cinema_id");
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error at fetching showtime datail route", err);
    throw err;
  }
  return;
}
