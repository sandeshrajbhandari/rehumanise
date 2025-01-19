import Link from "next/link";

import { getServerSession } from "next-auth";
// import { authOptions } from "../../api/auth/[...nextauth]/route";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Stripe from "stripe";

import {
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
  createCheckoutLink,
} from "@app/lib/billing";

import { StripePricingTable } from "@app/lib/stripePricingTable";

import prisma from "../../api/prisma";

const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2023-08-16",
});

export default async function Page() {
  // console.log(authOptions)
  const session = await getServerSession(authOptions);
  console.log(session);
  const customer = await createCustomerIfNull();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  // console.log(user);
  const manage_link = await generateCustomerPortalLink(
    "" + user?.stripe_customer_id
  );

  const hasSub = await hasSubscription();
  // const hasSub = True;
  console.log(hasSub);
  const checkoutLink = await createCheckoutLink("" + user?.stripe_customer_id);

  return (
    <div className="max-w-4xl m-auto w-full px-4">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">Welcome, {session?.user?.name}</p>
      </div>
      <div className="py-4">
        <Link
          href={manage_link}
          className=" bg-black ml-auto text-white rounded-md px-2 py-1"
        >
          Manage billing
        </Link>
      </div>

      {hasSub ? (
        <div className="rounded-md px-4 py-2 bg-emerald-400 font-medium text-sm text-white">
          You have a subscription!
        </div>
      ) : (
        <div>
          <div className="grid place-items-center rounded-lg px-6 py-10 bg-slate-100">
            <Link
              href={String(checkoutLink)}
              className="font-medium text-base bg-blue-500 hover:underline"
            >
              You have no subscription, checkout now!
            </Link>
            {/* <StripePricingTable /> */}
          </div>
        </div>
      )}
    </div>
  );
}
