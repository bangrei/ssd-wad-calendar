import { Query, databases } from "@/appwrite";
import { get } from "http";

export const getMySchedules = async (month: any, year: any) => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
    [
      Query.equal("month", month),
      Query.equal("year", year),
      Query.orderAsc("date"),
    ]
  );
  const docs = data.documents;
  let columns = new Map<DayOfWeek, Column>();
  for (var i in docs) {
    const doc = docs[i];
    const dt = new Date(doc.date);
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    const day = dt.toLocaleDateString("en-US", {
      weekday: "long",
    }) as DayOfWeek;
    const dtString = `${dt.getFullYear()}-${m > 9 ? m : "0" + m.toString()}-${
      d > 9 ? d : "0" + d.toString()
    }`;
    if (!columns.get(day))
      columns.set(day, { day: day, items: new Map<string, Item>() });
    const event = {
      $id: doc.$id,
      $date: doc.date,
      day: day,
      date: dtString,
      month: doc.month,
      year: doc.year,
      name: doc.name,
      time: dt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      invitees: doc.invitees,
      active: true as Boolean,
    } as Event;

    if (!columns.get(day)?.items?.get(dtString)) {
      columns.get(day)?.items?.set(dtString, { date: dtString, events: [] });
    }
    columns.get(day)?.items?.get(dtString)?.events.push(event);
  }
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var days = new Date(year, month, 0).getDate();
  var newColumns = new Map<DayOfWeek, Column>();
  for (var i in daysOfWeek) {
    const day = daysOfWeek[i] as DayOfWeek;
    if (!newColumns.get(day)) {
      newColumns.set(day, { day: day, items: new Map<string, Item>() });
    }
    if (columns.get(day)) {
      newColumns.set(day, { day: day, items: columns.get(day)?.items! });
    }
  }

  let prevIndex = 0;
  let startN = 0;

  Array(days + 1)
    .fill(0, 0, days + 1)
    .forEach((_, i) => {
      let n = i - days;
      let d = new Date(year, month, n);
      if (d.getMonth() + 1 !== month) return;
      let currentDay: DayOfWeek = d.toLocaleDateString("en-US", {
        weekday: "long",
      }) as DayOfWeek;
      let dd = d.getDate();
      let idx = daysOfWeek.indexOf(currentDay);
      if (dd == 1 && idx > 0) {
        prevIndex = idx;
        startN = n;
      }
    });

  Array(days + 1)
    .fill(0, 0, days + 1)
    .forEach((_, i) => {
      let n = i - days;
      let d = new Date(year, month, n);
      if (d.getMonth() + 1 !== month) return;
      let currentDay: DayOfWeek = d.toLocaleDateString("en-US", {
        weekday: "long",
      }) as DayOfWeek;
      let dd = d.getDate();
      let date = `${year}-${month > 9 ? month : "0" + month}-${
        dd > 9 ? dd : "0" + dd
      }`;
      let events = newColumns.get(currentDay)?.items?.get(date)?.events || [];
      newColumns
        .get(currentDay)
        ?.items?.set(date, { date: date, events: events });
      let keys = Array.from(newColumns.get(currentDay)?.items?.entries()!)
        .map((key) => {
          return key[0];
        })
        .sort((a, b) => {
          return a.localeCompare(b);
        });
      let sortedItems = Array.from(
        newColumns.get(currentDay)?.items?.entries()!
      ).sort((a, b) => keys.indexOf(a[0]) - keys.indexOf(b[0]));

      let sorted = new Map<string, Item>();
      Array.from(sortedItems.entries()).map((key) => {
        sorted.set(key[1][0], key[1][1]);
      });

      newColumns.set(currentDay, {
        day: currentDay,
        items: sorted,
      });
    });

  Array(prevIndex)
    .fill(0, 0, prevIndex)
    .map((_, ix) => {
      let n = startN - (ix + 1);
      let d = new Date(year, month, n);
      let currentDay: DayOfWeek = d.toLocaleDateString("en-US", {
        weekday: "long",
      }) as DayOfWeek;
      let dd = d.getDate();
      let mm = d.getMonth() + 1;
      let date = `${year}-${mm > 9 ? mm : "0" + mm}-${dd > 9 ? dd : "0" + dd}`;
      let items = newColumns.get(currentDay)?.items;
      if (!items) items = new Map<string, Item>();

      newColumns.set(currentDay, {
        day: currentDay,
        items: new Map<string, Item>(),
      });
      newColumns.get(currentDay)?.items?.set(date, { date: date, events: [] });
      Array.from(items.entries()).map((it) => {
        newColumns.get(currentDay)?.items?.set(it[0], it[1]);
      });
    });
  const board = {
    total: docs.length,
    columns: newColumns,
  };
  console.log(board);
  return board;
};

export const createEvent = async (params: any) => {
  try {
    const res = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      "",
      params
    );
    return {
      error: false,
      data: res,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
    };
  }
};

export const updateEvent = async (id: string, params: any) => {
  try {
    const res = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id,
      params
    );
    return {
      error: false,
      data: res,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
      $id: null,
    };
  }
};

export const removeEvent = async (id: string) => {
  try {
    const res = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id
    );
    return {
      error: false,
      data: res,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};
