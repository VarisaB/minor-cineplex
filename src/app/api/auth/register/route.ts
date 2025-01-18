import { NextRequest, NextResponse } from "next/server";
import user, { UserProfile } from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  /* Check Existing User*/
  const existUser: UserProfile | null = await user.findOne({ email });
  // console.log(existUser);
  if (existUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  /*hash password*/
  const salt = await bcrypt.genSalt(10);
  console.log("salt: ", salt);
  const encodedPassword = await bcrypt.hash(password, salt);

  const newUser = new user({
    name,
    email,
    password: encodedPassword,
  });

  /*create user to database*/
  try {
    await newUser.save();
    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
