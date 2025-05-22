import { onAuthenticateUser } from '@/actions/user';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
  try {
    const { user: loggedUser } = await onAuthenticateUser();

    const data = await request.json();
    const priceId = data.priceId;
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_BASE_URL}/dashboard`,
        cancel_url: `${process.env.NEXT_BASE_URL}/dashboard`,
        metadata: {
          userId: loggedUser?.id as string,
          priceId,
        },
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
