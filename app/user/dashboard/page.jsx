import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Stripe from "stripe";

import NeedSignIn from "@/components/NeedSignIn";

import {
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
  createCheckoutLink,
} from "@app/lib/billing";

import prisma from "../../api/prisma";

const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2023-08-16",
});

import ClientDashboard from "./ClientDashboard";
import CustomPricingTable from "@/components/ui/custom-pricing-table";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <NeedSignIn />;
  }
  const customer = await createCustomerIfNull();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  const manage_link = await generateCustomerPortalLink(
    "" + user?.stripe_customer_id
  );

  // const hasSub = await hasSubscription();
  const hasSub = session.hasSub;
  const checkoutLink = await createCheckoutLink("" + user?.stripe_customer_id);

  return (
    <div>
      {!hasSub && <CustomPricingTable />}
      {/* {hasSub && (
        <div className="rounded-md px-4 py-2 bg-emerald-400 font-medium text-sm text-white">
          You have an active subscription!
        </div>
      )} */}
      <ClientDashboard
        session={session}
        manage_link={manage_link}
        hasSub={hasSub}
        checkoutLink={checkoutLink}
      />
    </div>
  );
}
