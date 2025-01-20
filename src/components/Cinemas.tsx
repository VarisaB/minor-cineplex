"use client";
import React, { useState, useEffect } from "react";
import CinemaCity from "./CinemaCity";
import { fetchCinemas } from "@/lib/cinema-api";
import { Cinema } from "@/models/cinema";

interface City {
  cityName: string;
  cinemas: Cinema[];
}

const Cinemas: React.FC = () => {
  const [cities, setCiities] = useState<City[]>([
    {
      cityName: "Bangkok",
      cinemas: [],
    },
    {
      cityName: "Nonthaburi",
      cinemas: [],
    },
    {
      cityName: "Pathumthani",
      cinemas: [],
    },
  ]);

  useEffect(() => {
    const fetchdata = async () => {
      const cinemasList: Cinema[] = await fetchCinemas();
      // console.log(cinemasList);

      const updatedCities = cities.map((city) => {
        const filteredCinemas: Cinema[] = cinemasList.filter(
          (cinema) => cinema.city === city.cityName
        );
        return { ...city, cinemas: filteredCinemas };
      });

      setCiities(updatedCities);
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
    <div className="container py-10">
      <div className="xl:flex justify-around">
        <h1 className="text-2xl font-bold mb-4">All Cinemas</h1>
        <div className="flex bg-[#21263F] border-[#565F7E] w-52 p-1 pl-2 rounded-lg items-center mb-6">
          <input
            className="bg-[#21263F] text-white placeholder-gray-400 w-full focus:outline-none"
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
