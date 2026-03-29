import { SessionResponse } from "@/types";

/** Client Api used to interact with Next server Api's.
 * No external requests will be made here.
 */

export const createSession = async (): Promise<SessionResponse> => {
  const res = await fetch("/api/session");
  return res.json();
};
