import { NextRequest, NextResponse } from "next/server";
import user, { UserProfile } from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  /* Check Existing User*/
  const existUser: UserProfile | null = await user.findOne({ email });
  console.log("login route: ", existUser);
  if (!existUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  /*validate password*/
  const isValidePassword = await bcrypt.compare(password, existUser.password);
  if (!isValidePassword) {
    return NextResponse.json(
      { message: "Password not valid" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "Login Successful", data: existUser },
    { status: 200 }
  );
}
