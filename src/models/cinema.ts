import mongoose from "mongoose";

export interface Cinema {
  id: string;
  name: string;
  location: string;
  city: string;
  totalHalls: number;
}

export function mappingCinemaStructure(cinema: any) {
  return {
    id: cinema._id.toString(),
    name: cinema.name,
    location: cinema.location,
    city: cinema.city,
    totalHalls: cinema.hall_count,
  };
}

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  hall_count: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Cinema || mongoose.model("Cinema", cinemaSchema);
