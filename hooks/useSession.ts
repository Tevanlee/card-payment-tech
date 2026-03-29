"use client";

import { useQuery } from "@tanstack/react-query";

import { createSession } from "@/lib/api/session";

/** This session hook exposes a query used to create
 * a session. For the purpose of this test we only
 * create a session from a Next session Api.
 *
 * Imporements here would be to run validation to
 * the current session before creating a new one.  */

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: createSession,
    retry: false,
  });
};
