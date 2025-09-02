export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { generateCustomerPortalLink, createCheckoutLink } from "@app/lib/billing";
import prisma from "../../api/prisma";
import ClientDashboard from "./ClientDashboard";

export default async function Page() {
  // Auth and customer creation are handled in layout
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  const manage_link = await generateCustomerPortalLink(String(user?.stripe_customer_id));
  const hasSub = session.hasSub;
  const checkoutLink = await createCheckoutLink(String(user?.stripe_customer_id));

  return (
    <div>
      {!hasSub && <div>Upgrade to a plan</div>}
      <ClientDashboard
        session={session}
        manage_link={manage_link}
        hasSub={hasSub}
        checkoutLink={checkoutLink}
      />
    </div>
  );
}
