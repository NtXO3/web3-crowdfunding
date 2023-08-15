import { create } from "zustand";

type UseConnectModalType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useConnectModal = create<UseConnectModalType>((set) => ({
  isOpen: false,
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false })),
}));

export { useConnectModal };
