"use client";

import { useNavigation } from "@/contexts/NavigationContext";
import { ReactNode } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  const { isMinimized } = useNavigation();

  return (
    <main
      className={`w-screen font-[family-name:var(--font-public-sans)] grid grid-cols-8 lg:grid-cols-12 gap-x-[16px] px-[40px] py-[32px] bg-background transition-all duration-300 ${
        isMinimized
          ? "lg:w-[calc(100vw-128px)] lg:ml-[88px]"
          : "lg:w-[calc(100vw-300px)] lg:ml-[300px]"
      }`}
    >
      {children}
    </main>
  );
}

