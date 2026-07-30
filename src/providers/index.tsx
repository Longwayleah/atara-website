"use client";

import { ScrollProvider } from "./ScrollProvider";
import { MotionProvider } from "./MotionProvider";
import { AppProvider } from "./AppProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppProvider>
      <MotionProvider>
        <ScrollProvider>{children}</ScrollProvider>
      </MotionProvider>
    </AppProvider>
  );
}

export { ScrollProvider } from "./ScrollProvider";
