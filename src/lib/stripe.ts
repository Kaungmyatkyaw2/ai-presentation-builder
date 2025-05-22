"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const upgradeSubscription = async () => {
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );
  if (!stripe) {
    return;
  }
  try {
    const response = await axios.post("/api/stripe/checkout", {
      priceId: process.env.NEXT_PUBLIC_SUBSCRIPTION_PRICE_ID,
    });
    const data = await response.data;
    if (!data.ok) throw new Error("Something went wrong");

    const result = await stripe.redirectToCheckout({
      sessionId: data.result.id,
    });
    if (result.error) {
      console.error(result.error);
    }
  } catch (error) {
    console.log(error);
  }
};
