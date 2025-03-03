"use client";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";

type formValue = {
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: formValue) => {
    console.log("form submitted", data);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      console.log(res);
      if (res?.ok) {
        //   router.replace("/login");
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } catch (err: any) {
      console.error("login: ", err);
    }
  };

  return (
    <div className="">
      <AuthForm onSubmit={onSubmit} isRegister={false} />

      {isOpen && (
        <div className="fixed bottom-0 right-0 bg-[#E5364B99] rounded m-4 p-4 flex flex-row gap-3 items-start">
          <p className="text-white font-bold">
            Your password is incorrect or this email doesn’t exist.
          </p>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className=""
          >
            <img src="/close_icon.svg" width={24} height={24} />
          </button>
        </div>
      )}
    </div>
  );
}
