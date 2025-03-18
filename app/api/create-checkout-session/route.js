import { stripe, createCustomerIfNull } from "../../lib/billing";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { priceId } = await req.json();

    // Get or create customer ID from the authenticated user
    const customerId = await createCustomerIfNull();

    if (!customerId) {
      return NextResponse.json(
        { error: "User must be logged in" },
        { status: 401 }
      );
    }

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/user/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/user/dashboard?success=false`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
