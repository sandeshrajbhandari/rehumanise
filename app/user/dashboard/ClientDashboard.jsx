"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
// import { useSession } from "next-auth/react";

const ClientDashboard = ({ session, manage_link, hasSub, checkoutLink }) => {
  // const { data: session2, status } = useSession();
  // console.log(status, session2);

  return (
    <div className="max-w-4xl m-auto w-full px-4">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">Welcome, {session?.user?.name}</p>
        <button
          onClick={() => signOut()}
          className="mt-2 bg-red-500 text-white rounded-md px-4 py-2"
        >
          Sign Out
        </button>
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
};

export default ClientDashboard;
