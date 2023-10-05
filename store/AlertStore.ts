import { create } from "zustand";

interface AlertState {
  alertTitle: string;
  alertMessage: string;
  showAlert: boolean;
  openAlert: () => void;
  closeAlert: () => void;
  setAlertTitle: (title: string) => void;
  setAlertMessage: (message: string) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alertTitle: "",
  alertMessage: "",
  showAlert: false,
  openAlert: () => set({ showAlert: true }),
  closeAlert: () => set({ showAlert: false }),
  setAlertTitle: (title) => set({ alertTitle: title }),
  setAlertMessage: (message) => set({ alertMessage: message }),
}));
