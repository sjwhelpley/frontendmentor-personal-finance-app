import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";

import Navigation from "@/components/Navigation";
import { NavigationProvider } from "@/contexts/NavigationContext";
import MainContent from "@/components/MainContent";
import StoreProvider from "@/store/StoreProvider";

import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance",
  description: "Personal finance. Simplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} antialiased`}>
        <StoreProvider>
          <NavigationProvider>
            <div className="w-full min-w-0">
              <Navigation />
              <MainContent>{children}</MainContent>
            </div>
          </NavigationProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
