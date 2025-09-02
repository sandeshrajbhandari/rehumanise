export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { generateCustomerPortalLink, createCheckoutLink } from "@app/lib/billing";
import prisma from "../../api/prisma";

export default async function Page() {
  // Auth and customer creation are handled in layout
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  const hasSub = session.hasSub;

  return (
    <div>
      {!hasSub && <div>Upgrade to a plan</div>}
    </div>
  );
}
