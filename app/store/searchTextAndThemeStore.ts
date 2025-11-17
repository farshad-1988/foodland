import { create } from "zustand";

export const useSearchTextAndThemeStore = create<{
  searchText: string;
  setSearchText: (text: string) => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}>((set) => {
  return {
    searchText: "",
    setSearchText: (text: string) => set({ searchText: text }),
    isDarkTheme: false,
    toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
  };
});
