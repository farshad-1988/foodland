"use client";

import Image from "next/image";
import { useState } from "react";
import { Meal } from "../(types)/types";
import { useSearchTextAndThemeStore } from "../store/searchTextAndThemeStore";

function FoodCard({ meal }: { meal: Meal }) {
  const [imageError, setImageError] = useState(false);
  const { isDarkTheme } = useSearchTextAndThemeStore();

  return (
    <div
      className={`group relative rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 ${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Image Container */}
      <div
        className={`relative w-full aspect-square overflow-hidden ${
          isDarkTheme ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        {!imageError ? (
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${
              isDarkTheme
                ? "bg-linear-to-br from-gray-700 to-gray-800"
                : "bg-linear-to-br from-gray-100 to-gray-200"
            }`}
          >
            {/* Placeholder Icon */}
            <svg
              className={`w-20 h-20 mb-2 ${
                isDarkTheme ? "text-gray-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p
              className={`text-sm font-medium ${
                isDarkTheme ? "text-gray-500" : "text-gray-400"
              }`}
            >
              No Image
            </p>
          </div>
        )}
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Name Container */}
      <div className={`p-4 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
        <h3
          className={`font-semibold text-base sm:text-lg line-clamp-2 leading-tight text-center ${
            isDarkTheme ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {meal.strMeal}
        </h3>
      </div>
    </div>
  );
}

export default FoodCard;
