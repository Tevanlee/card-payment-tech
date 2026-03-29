"use client";

import { QueryClient } from "@tanstack/react-query";

/** Here we initialize a global queryClient which controls
 * how queries behave app wide. */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});
