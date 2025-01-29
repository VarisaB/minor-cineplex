import { NextRequest, NextResponse } from "next/server";
import cinemas, { Cinema, mappingCinemaStructure } from "@/models/cinema";

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl.searchParams);
  let cinemaId = req.nextUrl.searchParams.get("cinemaId");
  // console.log("cinema_id = ", cinemaId);

  /* TODO: check type of ID before fetch data */
  // cinemaId = mongoose.Types.ObjectId.isValid(cinemaId)? cinemaId: null

  let data: Cinema | Cinema[] | null;
  if (cinemaId) {
    const res = await cinemas.findById(cinemaId);
    data = mappingCinemaStructure(res);
  } else {
    const res = await cinemas.find();
    data = res.map((cinema) => mappingCinemaStructure(cinema));
  }

  console.log("route cinema", data);

  return NextResponse.json(data);
}
