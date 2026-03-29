import { Suspense } from "react";
import { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import SessionProvider from "@/lib/providers/SessionProvider";
import SessionHandler from "@/lib/providers/SessionHandler";

import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Card Payment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full grid">
        <Suspense fallback={<>Loading...</>}>
          <SessionProvider>
            <SessionHandler>{children}</SessionHandler>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
