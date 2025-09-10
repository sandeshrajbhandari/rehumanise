"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NeedSignIn() {
  return (
    <div className="max-w-4xl m-auto w-full px-4">
      <p className="text-2xl font-medium">You need to sign in first.</p>
      <div className="py-4">
        <Link
          href="/signin"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}
