"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistMono.className}>
      <body className={`vsc-initialized`}>
        <SessionProvider>
          {" "}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <main>
                {children}
              </main>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>{" "}
      </body>
    </html>
  );
}
