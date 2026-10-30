"use client";
import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GooleAuthProvider from "./google.auth.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GooleAuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </GooleAuthProvider>
  );
}
