import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma";
import Stripe from "stripe";

// const prisma = new PrismaClient();
export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: session.user.email },
        });
        const plan = dbUser?.plan || "free";
        return {
          ...session,
          hasSub: Boolean(dbUser?.hasSub),
          plan,
          stripe_customer_id: dbUser?.stripe_customer_id, // Optional: if you need this elsewhere
        };
      }

      return {
        ...session,
        plan: "free",
        hasSub: false,
      };
    },
  },
};

const getSubscriptionPlan = (product: Stripe.Product) => {
  switch (product.id) {
    case process.env.STRIPE_HOBBY_PRODUCT_ID:
      return "Hobby";
    case process.env.STRIPE_PRO_PRODUCT_ID:
      return "Pro";
    default:
      return "Free";
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
