"use client";
import BookingDetail from "@/components/BookingDetail";
import BookingStep from "@/components/BookingStep";
import SeatingPlan from "@/components/SeatingPlan";
import { ShowDetail } from "@/components/ShowDetail";
import { useState } from "react";

export default function SelectingSeat() {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);

  return (
    <div className="mt-16">
      <div className="step bg-[#070C1B] p-4 flex flex-row justify-center">
        <BookingStep currentStep={currentStep} />
      </div>
      <div className="p-4">
        {currentStep === 2 && (
          <SeatingPlan
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
          />
        )}
      </div>
      <div className="bg-[#070C1B]">
        <ShowDetail />
        {selectedSeat.length ? (
          <BookingDetail
            selectedSeat={selectedSeat}
            step={currentStep}
            setStep={setCurrentStep}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
