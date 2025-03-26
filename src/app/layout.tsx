import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
        <Navigation />
        <main className="w-screen lg:w-[calc(100vw-300px)] lg:ml-[300px] font-[family-name:var(--font-public-sans)] grid grid-cols-8 lg:grid-cols-12 gap-x-[16px] px-[40px] py-[32px] bg-[#F8F4F0] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
