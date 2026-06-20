"use client";

import ShowItems from "./(components)/ShowItems";
import VerticalCategories from "./(components)/VerticalCategories";
import { useSearchTextAndThemeStore } from "./store/searchTextAndThemeStore";

export default function Home() {
  const { isDarkTheme } = useSearchTextAndThemeStore();

  return (
    <div
      className={`relative left-0 flex  transition-all duration-300 min-h-screen ${
        isDarkTheme
          ? "bg-gray-900"
          : "bg-linear-to-br from-orange-50 via-white to-amber-50"
      }`}
    >
      <VerticalCategories />

      <div className={` w-[calc(100%-6rem)] mt-20`}>
        <ShowItems />
      </div>
    </div>
  );
}
