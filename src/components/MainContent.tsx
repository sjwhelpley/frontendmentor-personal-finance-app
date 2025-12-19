"use client";

import { useNavigation } from "@/contexts/NavigationContext";
import { ReactNode } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  const { isMinimized } = useNavigation();

  return (
    <main
      className={`mb-[75px] lg:mb-0 w-screen font-[family-name:var(--font-public-sans)] grid grid-cols-8 lg:grid-cols-12 gap-x-[16px] px-[40px] py-[32px] bg-background transition-all duration-300 ${
        isMinimized
          ? "lg:w-[calc(100vw-88px)] lg:ml-[88px]"
          : "lg:w-[calc(100vw-250px)] lg:ml-[250px]"
      }`}
    >
      {children}
    </main>
  );
}
