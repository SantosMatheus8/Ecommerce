import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: [],
  addItem: (item: any) =>
  set((state: any) => {
    if (!state.items.some((i: any) => i === item)) {
      return { items: [...state.items, item] };
    }
    return state;
  }),
    removeItem: (item: any) =>
    set((state: any) => ({
      items: state.items.filter((i: any) => i !== item),
    })),
  clearItems: () => set({ items: [] }),
}))
