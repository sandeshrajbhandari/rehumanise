import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Stripe from "stripe";
import { createCustomerIfNull, generateCustomerPortalLink } from "../../helpers/billing";
import prisma from '../../api/prisma'

const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2023-08-16",
});

export default async function Page() {
  const session = await getServerSession(authOptions);
  // await createCustomerIfNull();
  // const manage = await generateCustomerPortalLink(session);

  return (
    <div className="max-w-4xl m-auto w-full px-4">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">Welcome, {session?.user?.name}</p>
      </div>
    </div>
  );
}
