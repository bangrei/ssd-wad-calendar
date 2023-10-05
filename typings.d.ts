interface Event {
  $id: string | null;
  $date: string;
  day: DayOfWeek;
  date: string;
  month: Number;
  year: Number;
  name: string;
  time: string;
  invitees: Array | [];
  active: Boolean;
}

interface Column {
  day: DayOfWeek;
  items: Map<string, Item> | null;
}

interface Item {
  date: string;
  events: Event[];
}

interface Board {
  total: Number;
  columns: Map<DayOfWeek, Column>;
}

type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
