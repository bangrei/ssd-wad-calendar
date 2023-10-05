import { create } from "zustand";

interface ModalState {
  title: string | null;
  event: Event | null;
  id: string | null;
  name: string;
  year: string | Number;
  month: string | Number;
  date: string | Number;
  day: DayOfWeek | null;
  time: string;
  dateString: string;
  invitees: Array<string>;
  isOpen: boolean;
  openModal: (title: string) => void;
  closeModal: () => void;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setYear: (year: string | Number) => void;
  setMonth: (month: string | Number) => void;
  setDate: (date: string | Number) => void;
  setDay: (day: DayOfWeek) => void;
  setTime: (time: string) => void;
  setDateString: (dateString: string) => void;
  setInvitees: (invitees: Array<string>) => void;
  setEvent: (event: Event | null) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  title: "",
  id: "",
  name: "",
  year: 0,
  month: 0,
  date: 0,
  day: null,
  time: "",
  dateString: "",
  invitees: [],
  event: null,
  isOpen: false,
  openModal: (title) => {
    set({ title: title });
    set({ isOpen: true });
  },
  closeModal: () => set({ isOpen: false }),
  setId: (id) => set({ id: id }),
  setName: (name) => set({ name: name }),
  setYear: (year) => set({ year: year }),
  setMonth: (month) => set({ month: month }),
  setDate: (date) => set({ date: date }),
  setDay: (day) => set({ day: day }),
  setTime: (time) => set({ time: time }),
  setDateString: (dateString) => set({ dateString: dateString }),
  setInvitees: (invitees: Array<string>) => set({ invitees: invitees }),
  setEvent: (event) => set({ event: event }),
}));
