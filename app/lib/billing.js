import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

//price_1NarR3APMZcBliJSoefCKTi5

export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2023-08-16",
});

export async function hasSubscription() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });
    return Boolean(user?.hasSub);
  }

  return false;
}

export async function createCheckoutLink(customer) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/user/dashboard",
    cancel_url: "http://localhost:3000/user/dashboard&success=true",
    customer: customer,
    line_items: [
      {
        price: "price_1JuVIiDrScrwd5y9uWvWqFlx",
        quantity: 1,
      },
      {
        price: "price_1R3bWODrScrwd5y9qnR1VgZv",
        quantity: 1,
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}

export async function createCustomerIfNull() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    if (!user?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: String(user?.email),
      });

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          stripe_customer_id: customer.id,
        },
      });
    }
    const user2 = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });
    return user2?.stripe_customer_id;
  }
}

export async function generateCustomerPortalLink(customerId) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXTAUTH_URL + "/user/dashboard",
    });

    console.log();

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
