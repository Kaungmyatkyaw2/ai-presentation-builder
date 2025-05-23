import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  let stripe_user_id;

  const searchParams = req.nextUrl.searchParams;

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(
      new URL("/settings?error=missing_code", req.url)
    );
  }

  if (!state) {
    return NextResponse.redirect(
      new URL("/settings?error=missing_state", req.url)
    );
  }

  const userId = Buffer.from(state, "base64").toString("utf-8");
  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: code!,
    });

    stripe_user_id = response.stripe_user_id;
  } catch (e) {
    return NextResponse.redirect(
      new URL("/settings?error=stripe_error", req.url)
    );
  }

  if (!stripe_user_id) {
    return NextResponse.redirect(
      new URL("/settings?error=missing_stripe_user_id", req.url)
    );
  }

  console.log({ userId });

  const updatedUser = await client.user.update({
    where: {
      id: userId,
    },
    data: {
      stripe_user_id,
    },
  });

  try {
    await stripe.accounts.update(stripe_user_id, {
      metadata: {
        user_id: updatedUser.id,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log("Error: ", error);
  }

  return NextResponse.redirect(new URL("/settings", req.url));
}
