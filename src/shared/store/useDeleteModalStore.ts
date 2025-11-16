import { create } from 'zustand';

interface DeleteModalState {
  isOpen: boolean;
  collectionId: number | null;
}

interface DeleteModalActions {
  open: (id: number) => void;
  close: () => void;
}

export const useDeleteModalStore = create<DeleteModalState & DeleteModalActions>((set) => ({
  isOpen: false,
  collectionId: null,
  open: (id) => set({ isOpen: true, collectionId: id }),
  close: () => set({ isOpen: false, collectionId: null }),
}));
