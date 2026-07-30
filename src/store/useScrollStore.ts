import { create } from "zustand";

interface ScrollState {
  scrollY: number;
  velocity: number;
  direction: "up" | "down" | null;
  progress: number;
  setScroll: (data: Partial<Omit<ScrollState, "setScroll">>) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollY: 0,
  velocity: 0,
  direction: null,
  progress: 0,
  setScroll: (data) => set(data),
}));
