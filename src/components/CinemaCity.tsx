import React from "react";
import { Cinema } from "@/models/cinema";
import Link from "next/link";
import Image from "next/image";

interface City {
  cityName: string;
  cinemas: Cinema[]; // Ensure this matches the property name in your data
}

// Define the props type for the CinemaCity component
interface CinemaCityProps {
  city: City;
}

const CinemaCity: React.FC<CinemaCityProps> = ({ city }) => {
  return (
    <>
      <h2 className="mb-4">{city.cityName}</h2>
      {/* Grid Container */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {city.cinemas.map((cinema, index) => (
          <Link href={`/cinemas/${cinema._id}`} key={index}>
            <div className="flex items-center gap-2 mb-2 border-[0.1px] border-white/[.20] p-4 rounded-lg">
              <Image
                src="/cinema/Pin_fill.svg"
                alt="cinema-pin"
                width={44}
                height={44}
              />
              <div>
                <h1 className="font-bold">{cinema.name}</h1>
                <p className="text-[#8B93B0]">{cinema.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CinemaCity;
