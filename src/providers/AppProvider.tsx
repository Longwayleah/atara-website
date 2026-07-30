"use client";

import { useEffect } from "react";
import { registerGSAP } from "@/lib/gsap/register";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  useEffect(() => {
    registerGSAP();
  }, []);

  return <>{children}</>;
}
