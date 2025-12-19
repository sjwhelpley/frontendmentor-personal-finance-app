"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isMinimized: boolean;
  toggleMinimize: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <NavigationContext.Provider value={{ isMinimized, toggleMinimize }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

