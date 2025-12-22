import { create } from "zustand";

export const useHoverStore = create((set) => ({
  activeCluster: null,
  setActiveCluster: (cluster) => set({ activeCluster: cluster }),
}));
