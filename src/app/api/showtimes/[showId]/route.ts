import showtimes from "@/models/showtime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ showId: string }> }
) {
  const showtimeId = (await params).showId;
  // console.log(showtimeId);

  try {
    const data = await showtimes.findById(showtimeId).populate("cinema_id");
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error at fetching showtime datail route", err);
    return NextResponse.json(
      { error: "Error at fetching showtime datail route" },
      { status: 500 }
    );
  }
  return;
}
