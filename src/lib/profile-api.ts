import { UserProfile } from "@/models/user";
import axios, { isAxiosError } from "axios";

export const createUserProfile = async (userForm: UserProfile) => {
  try {
    console.log(userForm);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      {
        ...userForm,
      }
    );

    return res.data;
  } catch (err) {
    // console.error("Error to create user at profile-api", err);
    throw err;
  }
};
