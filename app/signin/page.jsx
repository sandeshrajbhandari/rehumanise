"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-xs w-full border rounded-md border-zinc-200 shadow shadow-md flex flex-col gap-4 p-6">
        <p className="text-2xl font-medium">Sign in</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/user/dashboard" })}
          className="px-4 py-2 border-2 shadow shadow-md hover:bg-slate-200 transition  rounded-md"
        >
          Sign in with Google here.
        </button>
      </div>
    </div>
  );
}
