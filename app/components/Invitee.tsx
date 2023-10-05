"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAlertStore } from "@/store/AlertStore";
import { useInviteeStore } from "@/store/InviteeStore";
import { useModalStore } from "@/store/ModalStore";

function Invitee() {
  const [message, showInvitee, closeInvitee, setMessage] = useInviteeStore(
    (state) => [
      state.message,
      state.showInvitee,
      state.closeInvitee,
      state.setMessage,
    ]
  );
  const [invitees, setInvitees] = useModalStore((state) => [
    state.invitees,
    state.setInvitees,
  ]);

  const addInvitee = () => {
    if (!message) {
      closeInvitee();
      return;
    }
    let newInvitees = [...invitees, message];
    setInvitees(newInvitees);
    closeInvitee();
  };

  return (
    <Transition show={showInvitee} as={Fragment}>
      <Dialog className="relative z-50 w-full" onClose={() => closeInvitee()}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 pb-2 border-b border-slate-200">
                  Add Invitee
                </Dialog.Title>
                <div className="pt-8 font-light w-full flex flex-col gap-4 text-sm">
                  <input
                    className="flex flex-1 items-center px-4 py-2 outline-none border border-slate-200 rounded-md focus:border-slate-400 font-light"
                    type="text"
                    value={message}
                    placeholder="Invitee"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-tr from-teal-400 to-blue-500 text-white font-bold hover:from-blue-500 hover:to-teal-400"
                    type="button"
                    onClick={() => addInvitee()}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Invitee;
