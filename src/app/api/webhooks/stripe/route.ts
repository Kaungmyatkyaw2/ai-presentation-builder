import { client } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

type METADATA = {
  userId: string;
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = (await headers()).get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const data = event.data.object;
    const metadata = data.metadata as METADATA;
    const buyer = await client.user.update({
      where: {
        id: metadata.userId,
      },
      data: {
        subscription: true,
      },
    });

    if (!buyer) {
      return Response.json({
        message: "Cannot update the subscription",
        status: 404,
      });
    }
    return Response.json({
      data: buyer,
      status: 200,
    });
  }

  return new Response("", { status: 200 });
}
