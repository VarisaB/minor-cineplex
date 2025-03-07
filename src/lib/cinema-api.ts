import axios from "axios";

export const fetchCinemas = async (cinemaId?: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cinemas`,
      {
        params: { cinemaId: cinemaId },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error at fetch cinemas list", error);
    throw error;
  }
};
