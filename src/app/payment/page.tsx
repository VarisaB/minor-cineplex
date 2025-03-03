"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/lib/payment-api";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Missing Stripe Public Key");
}
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState<string>("");

  const amount = 10;
  useEffect(() => {
    const getclientSecret = async () => {
      const { clientSecret } = await createPaymentIntent({ amount });
      //   console.log("payment", clientSecret);
      setClientSecret(clientSecret);
    };
    getclientSecret();
  }, []);

  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {clientSecret && (
        <Elements stripe={stripe} options={options}>
          <PaymentElement />
        </Elements>
      )}
    </div>
  );
}
