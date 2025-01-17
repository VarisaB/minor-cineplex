"use client";
import { createUserProfile } from "@/lib/profile-api";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type formValue = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const form = useForm<formValue>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: formValue) => {
    console.log("form submitted", data);
    try {
      await createUserProfile(data);
      router.replace("/login");
    } catch (err: any) {
      // console.error("register: ", err);

      if (err.response?.data?.error.includes("exist")) {
        setEmailError("Email is already use. Please try another");
      } else {
        setEmailError(null);
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-6 rounded shadow-lg">
        <h1 className="text-center mb-4 text-4xl font-bold">Register</h1>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              className="border rounded p-2 w-full bg-[#21263F]"
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          </div>

          <div className="mb-2">
            <label htmlFor="email">E-mail</label>
            <input
              className="border rounded p-2 w-full bg-[#21263F]"
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password">Passowrd</label>
            <input
              className="border rounded p-2 w-full bg-[#21263F]"
              type="password"
              id="passowrd"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button className="bg-[#4E7BEE] text-white py-2 px-4 rounded hover:bg-blue-600">
            Submit
          </button>

          <p className="text-[#8B93B0] text-center">
            Already have an account?{" "}
            <span className="text-white underline">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
