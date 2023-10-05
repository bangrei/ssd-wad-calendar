import { getMySchedules } from "@/lib/services";
import { Header } from "next/dist/lib/load-custom-routes";
import { create } from "zustand";

interface BoardState {
  loading: boolean;
  month: Number | null;
  year: Number | null;
  perPage: number;
  pageNums: number;
  totalRows: number;
  board: Board;
  headers: Array<DayOfWeek>;
  rows: Array<Event>;
  getBoard: (month: Number, year: Number) => void;
  setMonth: (month: Number) => void;
  setYear: (year: Number) => void;
  setHeaders: (headers: Array<DayOfWeek>) => void;
  setRows: (rows: Array<Event>) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  loading: true,
  month: null,
  year: null,
  perPage: 5,
  pageNums: 0,
  totalRows: 0,
  board: {
    columns: new Map<DayOfWeek, Column>(),
    total: 0,
  },
  headers: new Array<DayOfWeek>(),
  rows: new Array<Event>(),
  getBoard: async (m, y) => {
    set({ loading: true });

    set({ month: m });
    set({ year: y });

    const board = await getMySchedules(m, y);

    let arr = new Array<DayOfWeek>();
    Array.from(board.columns.entries()).forEach((col) => {
      arr.push(col[0] as DayOfWeek);
    });
    set({ headers: arr });

    set({ board });
    set({ loading: false });
  },
  setMonth: (month: Number) => set({ month: month }),
  setYear: (year: Number) => set({ year: year }),
  setHeaders: (headers: Array<DayOfWeek>) => set({ headers: headers }),
  setRows: (rows: Array<Event>) => set({ rows: rows }),
}));
