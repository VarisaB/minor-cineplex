import { NextResponse } from "next/server";
import cinemas, { Cinema } from "@/models/cinemas";

export async function GET() {
  const data: Cinema[] = await cinemas.find();
  // console.log(data);

  return NextResponse.json(data);
}
