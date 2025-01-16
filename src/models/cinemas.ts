import mongoose from "mongoose";

export interface Cinema {
  _id: mongoose.Types.ObjectId;
  name: string;
  location: string;
  city: string;
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
    require: true,
  },
});

export default mongoose.models.Cinema || mongoose.model("Cinema", cinemaSchema);
