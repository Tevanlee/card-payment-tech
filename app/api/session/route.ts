import { NextResponse } from "next/server";

/** This is a Nextjs mock API to simulate getting a
 * session token in order to proceed with payments.
 *
 * Random session tokens are generated for purposes of this test.
 */

export async function GET() {
  const token = crypto.randomUUID();
  const amount = Math.floor(Math.random() * 500) + 50;

  return NextResponse.json({
    sessionToken: token,
    amountToPay: amount,
    status: 200,
  });
}
