"use client";

import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

export const Provider = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <NextTopLoader />
    </>
  );
};
