import axios from "axios";

export async function createPaymentIntent({ amount }: { amount: number }) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`,
      { amount: amount * 100 }
    );

    // console.log("payment-api", res.data);

    return res.data;
  } catch (error) {
    console.error("Error in create payment intent", error);
    throw error;
  }
}
