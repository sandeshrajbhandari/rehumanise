import Link from "next/link";
import { getServerSession } from "next-auth";
// import { authOptions } from "../../api/auth/[...nextauth]/route";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Stripe from "stripe";

import NeedSignIn from "@/components/NeedSignIn";

import {
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
  createCheckoutLink,
} from "@app/lib/billing";

// import { StripePricingTable } from "@app/lib/stripePricingTable";

import prisma from "../../api/prisma";

const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2023-08-16",
});

import ClientDashboard from "./ClientDashboard";

export default async function Page() {
  // console.log(authOptions)
  const session = await getServerSession(authOptions);
  // console.log(session);
  // Redirect to sign-in page if user is not logged in
  if (!session) {
    return (
      // <div className="max-w-4xl m-auto w-full px-4">
      //   <p className="text-2xl font-medium">You need to sign in first.</p>
      //   <div className="py-4">
      //     <Link
      //       href="/user/signin"
      //       className=" bg-blue-500 text-white rounded-md px-4 py-2"
      //     >
      //       Go to Sign In
      //     </Link>
      //   </div>
      // </div>
      <NeedSignIn />
    );
  }
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
  // console.log(hasSub);
  const checkoutLink = await createCheckoutLink("" + user?.stripe_customer_id);

  return (
    <ClientDashboard
      session={session}
      manage_link={manage_link}
      hasSub={hasSub}
      checkoutLink={checkoutLink}
    />
  );
}
