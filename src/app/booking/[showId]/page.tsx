"use client";
import BookingDetail from "@/components/BookingDetail";
import BookingStep from "@/components/BookingStep";
import SeatingPlan from "@/components/SeatingPlan";
import { useState } from "react";

export default function SelectingSeat() {
  const [currentStep, setCurrentStep] = useState<number>(2);

  return (
    <div className="mt-16">
      <div className="step bg-[#070C1B] p-4 flex flex-row justify-center">
        <BookingStep currentStep={currentStep} />
      </div>
      <div className="p-4">
        <SeatingPlan />
      </div>
      <div className="detail bg-[#070C1B]">
        <BookingDetail />
      </div>
    </div>
  );
}
