"use client";
import AuthForm from "@/components/AuthForm";
import { createUserProfile } from "@/lib/profile-api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type formValue = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: formValue) => {
    console.log("register form submitted", data);
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
    <AuthForm onSubmit={onSubmit} isRegister={true} emailError={emailError} />
  );
}

export default Register;
