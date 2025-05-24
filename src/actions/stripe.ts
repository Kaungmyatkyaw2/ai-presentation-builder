"use server";

import { Project } from "@/generated/prisma";
import { client } from "@/lib/prisma";
import Stripe from "stripe";
import { onAuthenticateUser } from "./user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

export const buyTemplate = async (project: Project) => {
  const { user } = await onAuthenticateUser();

  if (!user) {
    return { status: 400, error: "You don't have access to do this!" };
  }

  const seller = await client.user.findFirst({
    where: {
      id: project.userId,
    },
  });

  console.log(seller, project.userId);

  if (!seller?.stripe_user_id) {
    return {
      status: 400,
      error: "Seller must have connected their stripe account",
    };
  }

  const application_fee_amount = (project.salePrice || 0) * 0.1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: (project.salePrice || 0) * 100,
          product_data: {
            name: project.id || "",
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount,
      on_behalf_of: seller.stripe_user_id, // ✅ This is the key fix

      transfer_data: {
        destination: seller?.stripe_user_id,
      },
    },
    metadata: {
      projectId: project.id,
      sellerId: project.userId,
      buyerId: user.id,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_BASE_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_BASE_URL}/dashboard`,
  });

  return { status: 200, url: session.url };
};
