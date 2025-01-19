"use client";

import { SessionProvider } from "next-auth/react";

export const SessionProviderClient = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
