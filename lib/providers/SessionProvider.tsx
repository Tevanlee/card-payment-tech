"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./queryClient";

interface SessionProviderProps {
  children: React.ReactNode;
}

/** This provider wraps the app and provides a shared
 * query client to it's child components, we can use these
 * in hooks or composables for consistent caching and querying.
 */

export default function SessionProvider({ children }: SessionProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
