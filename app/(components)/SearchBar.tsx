"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchTextAndThemeStore } from "../store/searchTextAndThemeStore";
import { Categories } from "../(types)/types";
import { useCategoryStore } from "../store/categoryStore";

const SearchBar = () => {
  const { searchText, setSearchText, isDarkTheme } =
    useSearchTextAndThemeStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();
  const cached: Categories = queryClient.getQueryData(["categories"]);

  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        if (!searchText) {
          setIsExpanded(false);
        }
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchText]);

  return (
    <div ref={searchRef} className="relative md:w-[500px]">
      <div
        className={`flex items-center gap-2 transition-all duration-300 ease-out cursor-pointer  ${
          isExpanded ? "w-full" : "w-[53px]"
        } ${
          isDarkTheme
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-50 border-gray-300"
        } border rounded-full ml-auto`}
      >
        {/* Search Icon Button */}
        <button
          onClick={() => {
            setIsExpanded(true);
          }}
          className={`shrink-0 cursor-pointer p-4 flex items-center justify-center transition-colors duration-200 ${
            isDarkTheme
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Search size={20} />
        </button>

        {/* Expanded Search Content */}
        <div
          className={`flex items-center gap-2 flex-1 transition-all duration-300 ${
            isExpanded ? "opacity-100 pr-4" : "opacity-0 w-0"
          }`}
        >
          {/* Search Input */}
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.trim())}
            placeholder="Search..."
            className={`flex-1 py-2 outline-none text-sm ${
              isDarkTheme
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-50 text-gray-900 placeholder-gray-500"
            }`}
            autoFocus={isExpanded}
          />

          {/* Category Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                isDarkTheme
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              <Image
                alt={selectedCategory.strCategory}
                className="w-8 h-8"
                width={59}
                height={50}
                src={selectedCategory.strCategoryThumb}
              />
              <span className="whitespace-nowrap">
                {selectedCategory.strCategory}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className={`absolute right-0 top-0 mt-2 w-56 h-60! overflow-auto rounded-lg shadow-xl ${
                  isDarkTheme
                    ? "bg-gray-700 border border-gray-600"
                    : "bg-white border border-gray-200"
                }`}
                style={{ zIndex: 9999 }}
              >
                {cached?.map((cat) => (
                  <button
                    key={cat.idCategory}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                      selectedCategory.idCategory === cat.idCategory
                        ? isDarkTheme
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-900"
                        : isDarkTheme
                        ? "text-gray-200 hover:bg-gray-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Image
                      alt={cat.strCategory}
                      className="w-8 h-8"
                      width={59}
                      height={50}
                      src={cat.strCategoryThumb}
                    />
                    <span>{cat.strCategory}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
