"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import SearchBar from "../(components)/SearchBar";
import { useSearchTextAndThemeStore } from "../store/searchTextAndThemeStore";
import Image from "next/image";
// import Logo from "../../public/foodland-logo.svg";

export default function Header() {
  const { isDarkTheme, toggleTheme } = useSearchTextAndThemeStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-colors duration-300 ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
          isScrolled ? "h-16" : "h-20"
        } ${
          isDarkTheme
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b shadow-md`}
      >
        <div className="flex items-center justify-between w-full h-full mx-auto">
          {/* Logo */}
          <div className="shrink-0">
            <div
              className={`font-bold transition-all duration-300 w-24 flex items-center justify-center ${
                isScrolled ? "text-xl" : "text-2xl"
              } ${isDarkTheme ? "text-white" : "text-gray-900"}`}
            >
              <Image
                className="w-20 h-20"
                src={"./foodland-logo.svg"}
                alt="Foodland"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end me-4">
            {/* Search Bar */}
            <SearchBar />
            {/* Theme Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log(e.currentTarget);
                toggleTheme();
              }}
              className={`p-4 z-1 rounded-full transition-all duration-300 cursor-pointer  ${
                isDarkTheme
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
