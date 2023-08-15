import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  title: string;
};

const Modal: FunctionComponent<ModalProps> = ({
  children,
  isOpen,
  closeModal,
  title,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4 max-h-screen">
            <Dialog.Panel className="w-full max-w-3xl max-h-full rounded bg-gray-900 py-8 px-6 relative overflow-y-auto">
              <Dialog.Title className="font-semibold text-3xl mb-2">
                {title}
              </Dialog.Title>
              <div className="w-full h-[1px] bg-slate-700 mb-6" />
              <div>{children}</div>

              <button
                className="absolute top-4 right-4 p-1 hover:opacity-80 transition text-2xl"
                onClick={closeModal}
              >
                <AiOutlineClose />
              </button>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export { Modal };
