"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ActiveContextType {
  soundsActive: boolean;
  toggleActive: () => void;
}

const ActiveContext = createContext<ActiveContextType | undefined>(undefined);

export function ActiveProvider({ children }: { children: ReactNode }) {
  const [soundsActive, setSoundsActive] = useState(false);

  const toggleActive = () => setSoundsActive((prev) => !prev);

  return (
    <ActiveContext.Provider value={{ soundsActive, toggleActive }}>
      {children}
    </ActiveContext.Provider>
  );
}

// 3️⃣ Hook para acessar o Contexto
export function useActiveContext() {
  const context = useContext(ActiveContext);
  if (!context) {
    throw new Error("useActiveContext must be used within an ActiveProvider");
  }
  return context;
}
