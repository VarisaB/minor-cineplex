import mongoose from "mongoose";
import showtimes, { Showtime } from "./showtime";

export interface Booking {
  id: string;
  showtime: Showtime;
  seats: string[];
  price: number;
  payment?: string;
}

const bookingSchema = new mongoose.Schema({
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: showtimes,
    required: true,
  },
  seats: { type: [String] },
  price: { type: Number },
  payment: { type: String },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
