"use server";

import { onAuthenticateUser } from "./user";

export const getStripeConnectionUrl = async () => {
  const user = await onAuthenticateUser();

  const state = Buffer.from(user.user?.id!).toString("base64");

  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID!,
    scope: "read_write",
    redirect_uri: `${process.env.NEXT_BASE_URL}/api/oauth/stripe`,
    "stripe_user[email]": user.user?.email!,
    state,
  });

  return `https://connect.stripe.com/oauth/authorize?${queryParams.toString()}`;
};
