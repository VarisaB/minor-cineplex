"use client";
import React, { useState, useEffect } from "react";
import CinemaCity from "./CinemaCity";
import { fetchCinemas } from "@/functions/getCinemas";

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
  // const [cinemas, setCinemas] = useState<Cinema[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      const cinemasList: Cinema[] = await fetchCinemas();
      console.log(cinemasList);
    };
    fetchdata();
  }, []);

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle the input change and update the search query
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter cities based on the search query
  const filteredCities = cities.filter((city) =>
    city.cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="xl:flex justify-around">
        <h1 className="text-2xl font-bold mb-4">All Cinemas</h1>
        <div className="flex bg-[#21263F] border-[#565F7E] w-52 p-1 pl-2 rounded-lg items-center mb-6">
          <input
            className="bg-[#21263F] text-white placeholder-gray-400 w-full"
            placeholder="Search City"
            type="text"
            value={searchQuery}
            onChange={handleSearch} // Add this to handle the search input
          />
          <img
            src="/cinema/Search_light.svg"
            alt="search"
            className="h-5 ml-2"
          />
        </div>
      </div>

      {/* Map over the filtered cities */}
      {filteredCities.length > 0 ? (
        filteredCities.map((city) => (
          <div key={city.cityName} className="mt-10 ">
            <CinemaCity city={city} />
          </div>
        ))
      ) : (
        <p className="text-white">No cities found</p>
      )}
    </div>
  );
};

export default Cinemas;
