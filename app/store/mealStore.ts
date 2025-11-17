import { create } from "zustand";
import { Meals } from "../(types)/types";

export const useMealStore = create<{
  meals: Meals;
  setMeals: (meals: Meals) => void;
}>((set) => ({
  meals: [],
  setMeals: (meals: Meals) => set({ meals }),
}));
