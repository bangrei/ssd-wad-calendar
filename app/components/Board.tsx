"use client";

import { useBoardStore } from "@/store/Board";
import { useModalStore } from "@/store/ModalStore";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

function Board() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  const dateString = today.toLocaleDateString("en-US", { month: "long" });
  const currentDay = today.toLocaleDateString("en-US", {
    weekday: "long",
  }) as DayOfWeek;
  const days = new Date(currentYear, currentMonth, 0).getDate();
  const colors = ["bg-cyan-200", "bg-blue-200", "bg-yellow-300"];

  const [
    isOpen,
    title,
    day,
    date,
    month,
    year,
    setId,
    setDay,
    setDate,
    setMonth,
    setTime,
    setYear,
    setDateString,
    setName,
    setInvitees,
    setEvent,
    openModal,
    closeModal,
  ] = useModalStore((state) => [
    state.isOpen,
    state.title,
    state.day,
    state.date,
    state.month,
    state.year,
    state.setId,
    state.setDay,
    state.setDate,
    state.setMonth,
    state.setTime,
    state.setYear,
    state.setDateString,
    state.setName,
    state.setInvitees,
    state.setEvent,
    state.openModal,
    state.closeModal,
  ]);

  const [loading, board, headers, rows, getBoard] = useBoardStore((state) => [
    state.loading,
    state.board,
    state.headers,
    state.rows,
    state.getBoard,
  ]);

  const _openModal = (title: string) => {
    openModal(title);
  };

  useEffect(() => {
    setDay(currentDay);
    setDate(currentDate);
    setMonth(currentMonth);
    setYear(currentYear);
    getBoard(currentMonth, currentYear);
  }, [setDate, setMonth, setYear]);

  const tdClick = async (item: any, i: any) => {
    if (item[1].events.length >= 3) return;
    const dt = new Date(item[0]);
    const dd = dt.getDate();
    const mm = dt.getMonth() + 1;
    const yy = dt.getFullYear();
    const tt = today.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const dy = dt.toLocaleDateString("en-US", {
      weekday: "long",
    }) as DayOfWeek;

    const str = `${yy}-${mm > 9 ? mm : "0" + mm}-${dd > 9 ? dd : "0" + dd}`;
    setId("");
    setDay(dy);
    setDateString(str);
    setName("");
    setTime(tt);
    setInvitees([]);
    _openModal("New Schedule");
  };

  const _tdClick = async (col: any, i: any) => {
    let item = null;
    Array.from(col[1].items.entries()).map((it, ix) => {
      if (ix == i) item = it;
    });
    if (!item) return;
    tdClick(item, i);
  };

  const _clickEdit = async (event: any) => {
      if (isOpen) closeModal();
      setTimeout(() => {
        setId(event.$id);
        setDay(event.day);
        setDateString(event.date);
        setName(event.name);
        setTime(event.time);
        setInvitees(event.invitees);
        setEvent(event);
        _openModal("Edit Schedule");
      }, 10);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full flex flex-col items-center justify-center font-bold text-lg">
        <span>{dateString}</span>
        <span>{year?.toString()}</span>
      </div>
      <div className="w-full h-full flex flex-col gap-4 text-slate-600">
        <table className="w-full border border-slate-200 bg-white">
          <thead className="border border-b-4 text-left text-xs md:text-md">
            <tr>
              {Array.from(board.columns.entries()).map((col) => (
                <th className="border font-bold text-lg p-2" key={col[0]}>
                  {col[0].substring(0, 1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(0, 0, 5)
              .map((_, i) => (
                <tr className="w-full h-full" key={i}>
                  {Array.from(board.columns.entries()).map((col) => (
                    <td
                      className={`h-full px-2 py-2 md:py-4 align-top w-[calc(100%/7)] ${
                        col[1].items?.size ? "border" : ""
                      }`}
                      key={`${i}-${col[1].day}`}
                      onClick={() => _tdClick(col, i)}
                    >
                      {
                        <div className="w-full h-full flex flex-col">
                          {Array.from(col[1].items!.entries()).map(
                            (item, ix) =>
                              ix == i && (
                                <div className="h-full w-full" key={item[0]}>
                                  <div
                                    className={`w-full font-bold ${
                                      item[1].events.length < 3
                                        ? "cursor-pointer hover:opacity-50"
                                        : ""
                                    }`}
                                  >
                                    <div className="w-full flex flex-col items-center justify-between">
                                      {new Date(item[0]).getMonth() + 1 ==
                                        currentMonth && (
                                        <div className="w-full flex items-center justify-between">
                                          <span
                                            className={`text-slate-500 mb-2 ${
                                              new Date(item[0]).getDate() ==
                                              currentDate
                                                ? "rounded-full bg-red-100/70 flex flex-col items-center justify-center w-8 h-8"
                                                : ""
                                            }`}
                                          >
                                            {new Date(item[0]).getDate()}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="font-light mt-2 flex flex-col gap-1 w-full">
                                    {item[1].events.length == 0 && (
                                      <span className="p-2 flex flex-col gap-1"></span>
                                    )}
                                    {item[1].events.map((ev, c) => (
                                      <div
                                        className={`p-1 md:p-2 rounded-md flex flex-col gap-0 cursor-pointer ${colors[c]} hover:opacity-60`}
                                        key={ev.$date}
                                        onClick={() => _clickEdit(ev)}
                                      >
                                        <div className="hidden md:flex md:flex-col">
                                          <span className="font-bold text-xs mb-1">
                                            {ev.name}
                                          </span>
                                          {ev.invitees.map((inv: string) => (
                                            <span className="text-xs" key={inv}>
                                              {inv}
                                            </span>
                                          ))}
                                          <span className="text-xs mt-2">
                                            {ev.time}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      }
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Board;
