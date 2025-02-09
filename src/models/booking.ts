import mongoose from "mongoose";
import showtimes, { Showtime } from "./showtime";
import user from "./user";

export interface Booking {
  id: string;
  showtime: Showtime;
  seats: string[];
  price: number;
  payment?: string;
  status?: string;
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
  status: { type: String, default: "Pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: user, required: true },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
