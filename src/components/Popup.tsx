"use client";
import { reserveSeat } from "@/lib/booking-api";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectedSeat: string[];
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export default function Popup() {
  return <div className="bg-[#21263F]"></div>;
}
