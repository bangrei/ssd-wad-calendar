import { create } from "zustand";

interface InviteeState {
  message: string;
  showInvitee: boolean;
  openInvitee: () => void;
  closeInvitee: () => void;
  setMessage: (message: string) => void;
}

export const useInviteeStore = create<InviteeState>((set) => ({
  message: "",
  showInvitee: false,
  openInvitee: () => set({ showInvitee: true }),
  closeInvitee: () => set({ showInvitee: false }),
  setMessage: (message) => set({ message: message }),
}));
