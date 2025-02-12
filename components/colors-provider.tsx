"use client";

import { createContext } from "react";

export const ColorsContext = createContext("");

export default function ColorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ColorsContext.Provider value="bg-[#223954] hover:bg-[#223954]/80 text-[#FFF]">
      {children}
    </ColorsContext.Provider>
  );
}
