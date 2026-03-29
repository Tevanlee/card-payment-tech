"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useSessionStore } from "@/store/session.store";

import { SESSION_TOKEN_KEY } from "@/constants";

interface SessionHandlerProps {
  children: React.ReactNode;
}

/** This is a session handler that is used update the
 * session state and for setting a unique route session query param.
 */

export default function SessionHandler({ children }: SessionHandlerProps) {
  const { setSession } = useSessionStore();

  const router = useRouter();

  const initializedRef = useRef(false);

  const setQueryToken = (key: string, token: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, token);

    router.replace(url.pathname + url.search);
  };

  const { data } = useSession();

  useEffect(() => {
    if (!data || initializedRef.current) return;

    setSession(data.sessionToken, data.amountToPay);

    setQueryToken(SESSION_TOKEN_KEY, data.sessionToken);

    initializedRef.current = true;
  }, [data]);

  return <>{children}</>;
}
