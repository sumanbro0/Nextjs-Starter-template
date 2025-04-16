import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="w-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <SidebarTrigger className="rounded-md hover:bg-muted p-2" />
                      <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-5"
                      />
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink
                              href="/"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              Dashboard
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium">
                              Projects
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-4">
                      <SignedOut>
                        <div className="flex gap-2">
                          <SignInButton mode="modal">
                            <button className="text-sm font-medium hover:underline">
                              Sign In
                            </button>
                          </SignInButton>
                          <SignUpButton mode="modal">
                            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md text-sm font-medium">
                              Sign Up
                            </button>
                          </SignUpButton>
                        </div>
                      </SignedOut>
                      <SignedIn>
                        <UserButton />
                      </SignedIn>
                    </div>
                  </div>
                </header>
                <main className="flex-1 overflow-auto p-6">
                  <div className="mx-auto max-w-7xl">{children}</div>
                </main>
                <footer className="border-t py-4 px-6">
                  <div className="mx-auto flex items-center justify-between text-sm text-muted-foreground">
                    <p>
                      © {new Date().getFullYear()} Your Company. All rights
                      reserved.
                    </p>
                    <div className="flex space-x-4">
                      <a href="#" className="hover:text-foreground">
                        Terms
                      </a>
                      <a href="#" className="hover:text-foreground">
                        Privacy
                      </a>
                    </div>
                  </div>
                </footer>
              </SidebarInset>
            </SidebarProvider>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
