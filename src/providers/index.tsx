"use client";

import { ScrollProvider } from "./ScrollProvider";
import { MotionProvider } from "./MotionProvider";
import { AppProvider } from "./AppProvider";
import { SplashScreen } from "@/components/splash";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppProvider>
      <MotionProvider>
        <ScrollProvider>
          {children}
          <SplashScreen />
        </ScrollProvider>
      </MotionProvider>
    </AppProvider>
  );
}

export { ScrollProvider } from "./ScrollProvider";
