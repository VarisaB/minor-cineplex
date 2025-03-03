import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  try {
    const { amount } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "thb",
      metadata: {
        collect_billing_details: "true", // Helps Stripe determine if name should be required
      },
    });
    // console.log(paymentIntent);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error at create payment intent: ", error);
    return NextResponse.json(
      { message: `Internal Error: ${error}` },
      { status: 500 }
    );
  }
}
