"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/Board";
import { useAlertStore } from "@/store/AlertStore";
import { UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useInviteeStore } from "@/store/InviteeStore";
import { createEvent, removeEvent, updateEvent } from "@/lib/services";

function Modal() {
  const [
    isOpen,
    title,
    id,
    name,
    dateString,
    time,
    invitees,
    event,
    day,
    setId,
    setName,
    setDateString,
    setTime,
    setInvitees,
    setEvent,
    closeModal,
  ] = useModalStore((state) => [
    state.isOpen,
    state.title,
    state.id,
    state.name,
    state.dateString,
    state.time,
    state.invitees,
    state.event,
    state.day,
    state.setId,
    state.setName,
    state.setDateString,
    state.setTime,
    state.setInvitees,
    state.setEvent,
    state.closeModal,
  ]);

  const [showAlert, setAlertTitle, setAlertMessage, openAlert] = useAlertStore(
    (state) => [
      state.showAlert,
      state.setAlertTitle,
      state.setAlertMessage,
      state.openAlert,
    ]
  );

  const [message, showInvitee, openInvitee, closeInvitee, setMessage] =
    useInviteeStore((state) => [
      state.message,
      state.showInvitee,
      state.openInvitee,
      state.closeInvitee,
      state.setMessage,
    ]);

  const _submit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!name) return _setAlert("Alert", "Name is required!");
      let params = {
        name: name,
        date: `${dateString} ${time}`,
        month: month,
        year: year,
        day: day,
        invitees: invitees,
      };

      if (id) {
        const res = await updateEvent(id!.toString(), params);
        if (res.error) return _setAlert("Error", res.message!.toString());
      } else {
        const res = await createEvent(params);
        if (res.error) return _setAlert("Error", res.message!.toString());
      }
      getBoard(month!, year!);
      _closeModal();
    } catch (error) {
      _setAlert("Error", "Something went wrong!");
    }
  };

  const [month, year, getBoard] = useBoardStore((state) => [
    state.month,
    state.year,
    state.getBoard,
  ]);

  const _delete = async () => {
    try {
      const res = await removeEvent(id!.toString());
      if (res.error) return _setAlert("Error", res.message!.toString());
      getBoard(month!, year!);
      _closeModal();
    } catch (error) {
      _setAlert("Error", "Something went wrong!");
    }
  };

  const _setAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    openAlert();
  };

  const _openInvitee = () => {
    setMessage("");
    openInvitee();
  };

  const _closeModal = () => {
    if (showInvitee) return;
    if (showAlert) return;
    closeModal();
  };

  const _setTime = (time: string) => {
    setTime(time);
  };

  const _removeInvitee = (index: any) => {
    let newInvitees = invitees.filter((a, x) => {
      return x !== index;
    });
    setInvitees(newInvitees);
  };

  useEffect(() => {
    if (!event) return;
    if (event?.$id) setId(event.$id);
    setName(event.name);
    setDateString(event.date);
    setTime(event.time);
    console.log(event.time);
    setInvitees(event.invitees);
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10 w-full"
        onClose={() => _closeModal()}
        onSubmit={(e) => _submit(e)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-slate-200">
                  {title} - {day}
                </Dialog.Title>
                <div className="pt-8 font-light w-full flex flex-col gap-4">
                  <input
                    className="flex items-center px-4 py-2 text-slate-800 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                  {/* <input
                    className="flex items-center px-4 py-2 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                    type="date"
                    value={dateString}
                    onChange={(e) => setDateString(e.target.value)}
                    placeholder="Date"
                  /> */}
                  <input
                    className="flex items-center px-4 py-2 text-slate-800 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                    type="time"
                    value={time}
                    onChange={(e) => _setTime(e.target.value)}
                    placeholder="Time"
                  />
                  <div className="flex flex-col gap-2 w-full text-slate-800">
                    <div className="w-full flex items-center justify-between text-slate-800">
                      <span>Invitees:</span>
                      <div
                        className="flex items-center gap-1 text-xs cursor-pointer hover:opacity-60 text-slate-800"
                        onClick={() => _openInvitee()}
                      >
                        <UserPlusIcon width={16} height={16} />
                        Add
                      </div>
                    </div>
                    {Array.from(invitees).map((iv, ivx) => (
                      <div
                        key={ivx}
                        className="flex items-center relative overflow-hidden w-full text-slate-800"
                      >
                        <input
                          key={iv}
                          className="flex flex-1 items-center px-4 py-2 text-slate-800 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                          type="text"
                          value={iv}
                          disabled
                          placeholder="Invitee"
                          onChange={() => {}}
                        />
                        <XMarkIcon
                          width={16}
                          height={16}
                          className="absolute right-2 text-red-500 cursor-pointer hover:opacity-60"
                          onClick={() => _removeInvitee(ivx)}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-tr from-teal-400 to-blue-500 text-white font-bold hover:from-blue-500 hover:to-teal-400"
                    type="submit"
                  >
                    {id !== "" ? "Update" : "Create"}
                  </button>
                  {id && (
                    <button
                      className="px-6 py-2 rounded-lg bg-gradient-to-tr from-red-600 to-yellow-500 text-white font-bold hover:from-yellow-500 hover:to-red-600"
                      type="button"
                      onClick={() => _delete()}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
