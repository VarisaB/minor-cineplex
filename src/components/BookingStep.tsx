import Image from "next/image";

export default function BookingStep({ currentStep }: { currentStep: number }) {
  const fullStep = ["Select showtime", "Select seat", "Payment"];

  return fullStep.map((step, index) => (
    <div key={index} className="step flex flex-col items-center gap-2 w-28">
      <div className="relative w-full flex items-center justify-center">
        {index !== 0 && (
          <hr className="absolute left-0 w-[34px] border border-[#21263F]" />
        )}
        {currentStep > index + 1 ? (
          <Image
            src={`/booking/Done.svg`}
            alt="done-sign"
            width={28}
            height={28}
            className="bg-[#1E29A8] w-11 h-11 rounded-full p-2 "
          />
        ) : (
          <h4
            className={`w-11 h-11 rounded-full text-xl font-bold flex items-center justify-center ${
              currentStep === index + 1
                ? "bg-[#4E7BEE]"
                : "border border-[#21263F]"
            }`}
          >
            {index + 1}
          </h4>
        )}
        {index !== fullStep.length - 1 && (
          <hr className="absolute right-0 w-[34px] border border-[#21263F]" />
        )}
      </div>

      <p className="text-sm">{step}</p>
    </div>
  ));
}
