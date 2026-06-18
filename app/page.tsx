"use client";

import { useEffect, useState } from "react";
import ShowItems from "./(components)/ShowItems";
import VerticalCategories from "./(components)/VerticalCategories";
import { useSearchTextAndThemeStore } from "./store/searchTextAndThemeStore";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkTheme } = useSearchTextAndThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`relative left-0 flex  transition-all duration-300 min-h-screen ${
        isDarkTheme
          ? "bg-gray-900"
          : "bg-linear-to-br from-orange-50 via-white to-amber-50"
      }`}
    >
      <div
        className={`flex flex-col overflow-auto sticky items-center justify-center ${
          isDarkTheme
            ? "bg-gray-900"
            : "bg-linear-to-br from-orange-50 via-white to-amber-50"
        } ${
          isScrolled
            ? "top-16 h-[calc(100vh-64px)]"
            : "top-20 h-[calc(100vh-80px)]"
        } left-0 w-28 shrink-0 self-start py-4 transition-all duration-300
    ${
      isDarkTheme
        ? "[&::-webkit-scrollbar-track]:bg-gray-800"
        : "[&::-webkit-scrollbar-track]:bg-white"
    }

    /* Scrollbar thumb */
    ${
      isDarkTheme
        ? "[&::-webkit-scrollbar-thumb]:bg-gray-100"
        : "[&::-webkit-scrollbar-thumb]:bg-gray-800"
    }`}
      >
        <VerticalCategories />
      </div>
      <div className={` w-[calc(100%-6rem)] ${isScrolled ? "mt-16" : "mt-20"}`}>
        <ShowItems />
      </div>
    </div>
  );
}
