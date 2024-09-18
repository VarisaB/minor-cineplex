import React from "react";
import CinemaCity from "./CinemaCity";

// Define the types for the Cinema and City
interface Cinema {
  cinemaName: string;
  location: string;
}

interface City {
  cityName: string;
  cinemas: Cinema[];
}

// Use correct types for the cities array
const cities: City[] = [
  {
    cityName: "Bangkok",
    cinemas: [
      { cinemaName: "Minor Cineplex Bangna", location: "Bangna" },
      { cinemaName: "Minor Cineplex Siam", location: "Siam" },
      { cinemaName: "Minor Cineplex Rama9", location: "Rama9" },
    ],
  },
  {
    cityName: "Pathumthani",
    cinemas: [
      { cinemaName: "D", location: "ddd" },
      { cinemaName: "F", location: "fff" },
      { cinemaName: "E", location: "eee" },
    ],
  },
  {
    cityName: "Nonthaburi",
    cinemas: [
      { cinemaName: "H", location: "hhh" },
      { cinemaName: "I", location: "iii" },
    ],
  },
];

const Cinemas: React.FC = () => {
  return (
    <div className="container">
      <div className="xl:flex justify-around">
        <h1 className="text-2xl font-bold mb-4">All Cinemas</h1>
        <div className="flex bg-[#21263F] border-[#565F7E] w-52 p-1 pl-2 rounded-lg items-center mb-6">
          <input
            className="bg-[#21263F] text-white placeholder-gray-400 w-full"
            placeholder="Search City"
            type="text"
          />
          <img
            src="/cinema/Search_light.svg"
            alt="search"
            className="h-5 ml-2"
          />
        </div>
      </div>
      {cities.map((city) => (
        <div className="mt-10 ">
          <CinemaCity key={city.cityName} city={city} />
        </div>
      ))}
    </div>
  );
};

export default Cinemas;
