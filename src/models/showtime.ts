import mongoose from "mongoose";

export interface Seat {
  seatNumber: string;
  status: string;
}

export interface Showtime {
  id?: string;
  showtime: Date;
  cinemaId: string;
  hall: number;
  movieId: number;
  seats?: Seat[];
}

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const showtimeSchema = new mongoose.Schema({
  showtime: {
    type: Date,
    required: true,
  },
  cinema_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
  movie_id: {
    type: Number,
  },
  seats: [seatSchema],
});

export default mongoose.models.Showtime ||
  mongoose.model("Showtime", showtimeSchema);
