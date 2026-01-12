import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "", {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["payment_intent.latest_charge"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const charge = paymentIntent?.latest_charge as Stripe.Charge;
    const receiptUrl = charge?.receipt_url || null;

    return NextResponse.json({
      success: true,
      session,
      receiptUrl,
    });
  } catch (err: any) {
    console.error("Error fetching checkout session:", err);
    return NextResponse.json({
      success: false,
      message: err.message || "Failed to fetch session",
    }, { status: 500 });
  }
}
