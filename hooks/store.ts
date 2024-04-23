import { create } from "zustand";

interface MobileSidebarState {
  open: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
}

export const useMobileSidebarStore = create<MobileSidebarState>()((set) => ({
  open: false,
  onSidebarOpen: () => set({ open: true }),
  onSidebarClose: () => set({ open: false }),
}));
