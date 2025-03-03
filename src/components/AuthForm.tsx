"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

type formValue = {
  name: string;
  email: string;
  password: string;
};

// Define the props type for the Form component
interface Props {
  onSubmit: (data: formValue) => void;
  isRegister: boolean;
  emailError?: string | null;
}

const AuthForm: React.FC<Props> = ({ onSubmit, isRegister, emailError }) => {
  const getPageName = (isRegister: boolean): string =>
    isRegister ? "Register" : "Login";

  const form = useForm<formValue>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded shadow-lg">
        <h1 className="text-center mb-10 text-4xl font-bold">
          {getPageName(isRegister)}
        </h1>

        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* name box */}
          {isRegister && (
            <div>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.name?.message}
              </p>
            </div>
          )}

          {/* email box */}
          <div>
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

          {/* password box */}
          <div>
            <label htmlFor="password">Password</label>
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

          <button
            type="submit"
            className="my-8 bg-[#4E7BEE] text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {getPageName(isRegister)}
          </button>

          <div className="flex flex-row gap-2 justify-center">
            <p className="text-[#8B93B0] text-center">
              {isRegister
                ? "Already have an account?"
                : "Don't have any account?"}
            </p>
            <p className="text-white underline">
              <Link href={`/${getPageName(!isRegister).toLowerCase()}`}>
                {getPageName(!isRegister)}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
