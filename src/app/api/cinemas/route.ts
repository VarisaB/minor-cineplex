import { NextRequest, NextResponse } from "next/server";
import cinemas, { Cinema } from "@/models/cinemas";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl.searchParams);
  let cinemaId = req.nextUrl.searchParams.get("cinemaId");
  // console.log("cinema_id = ", cinemaId);

  /* TODO: check type of ID before fetch data */
  // cinemaId = mongoose.Types.ObjectId.isValid(cinemaId)? cinemaId: null

  const data: Cinema | Cinema[] | null = cinemaId
    ? await cinemas.findById(cinemaId)
    : await cinemas.find();
  // console.log(data);

  return NextResponse.json(data);
}
