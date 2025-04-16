import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description:
    "Professional starter template with Next.js, Prisma, SQLite, Clerk and Hono",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html suppressHydrationWarning lang="en" className="h-full">
          <body
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-background text-foreground`}
          >
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
