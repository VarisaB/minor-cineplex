"use client";
import BookingDetail from "@/components/BookingDetail";
import BookingStep from "@/components/BookingStep";
import SeatingPlan from "@/components/SeatingPlan";
import { ShowDetail } from "@/components/ShowDetail";
import { Showtime } from "@/models/showtime";
import { useState, useEffect } from "react";
import { fetchShowDetails } from "@/lib/showtimes-api";
import Timer from "@/components/Timer";
import Payment from "@/components/Payment";

export default function SelectingSeat({
  params,
}: {
  params: { showId: string };
}) {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [showDetails, setShowDatails] = useState<Showtime>();

  useEffect(() => {
    const fetchData = async () => {
      const show = await fetchShowDetails({ showId: params.showId });
      console.log(show);
      if (show) {
        setShowDatails(show);
      }
    };
    fetchData();
  }, []);

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
            seats={showDetails?.seats || []}
          />
        )}
        {currentStep === 3 && <Payment />}
      </div>
      <div className="bg-[#070C1B]">
        {currentStep === 3 && <Timer selectedSeat={selectedSeat} />}
        <ShowDetail showDetails={showDetails} />
        {selectedSeat.length > 0 && (
          <BookingDetail
            selectedSeat={selectedSeat}
            step={currentStep}
            setStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
}
