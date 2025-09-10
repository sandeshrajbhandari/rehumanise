import { NextResponse } from "next/server";
import prisma from "../../prisma";
import { stripe } from "@app/lib/billing";

// App Router: keep the raw body by reading request.text()
export async function POST(request) {
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const customerId = session.customer;
        const email = session.customer_details?.email || session.customer_email;
        if (customerId && email) {
          await prisma.user.update({
            where: { email },
            data: { stripe_customer_id: String(customerId) },
          });
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const items = subscription.items?.data || [];
        const firstItem = items[0];
        const priceId = firstItem?.price?.id || null;
        const productId = firstItem?.price?.product || null;
        const status = subscription.status;
        const currentPeriodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : null;

        let plan = "free";
        if (productId === process.env.STRIPE_HOBBY_PRODUCT_ID) plan = "Hobby";
        else if (productId === process.env.STRIPE_PRO_PRODUCT_ID) plan = "Pro";
        const hasSub = event.type !== "customer.subscription.deleted" &&
          ["active", "trialing", "past_due", "incomplete", "incomplete_expired"].includes(String(status));

        await prisma.user.updateMany({
          where: { stripe_customer_id: String(customerId) },
          data: {
            subscription_status: status,
            subscription_product_id: productId ? String(productId) : null,
            subscription_price_id: priceId ? String(priceId) : null,
            subscription_current_period_end: currentPeriodEnd,
            plan,
            hasSub,
          },
        });
        break;
      }
      default: {
        // no-op for other events
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook processing error:", err);
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }
}

