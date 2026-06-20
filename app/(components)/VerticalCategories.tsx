import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useCategoryStore } from "../store/categoryStore";
import { Categories } from "../(types)/types";
import Image from "next/image";
import { useSearchTextAndThemeStore } from "../store/searchTextAndThemeStore";
import { fetchCategories } from "../(api)/getFoodData";

const VerticalCategories = () => {
  const { selectedCategory, setSelectedCategory, setCategories } =
    useCategoryStore();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { isDarkTheme } = useSearchTextAndThemeStore();

  const {
    data: categoriesInfo,
    isLoading,
    isError,
  } = useQuery<Categories>({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(setCategories),
    enabled: !!selectedCategory,
  });

  if (isLoading) {
    return (
      <div className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${isDarkTheme ? "text-red-400" : "text-red-600"}`}>
        Error loading categories
      </div>
    );
  }
  console.log(categoriesInfo?.length);
  return (
    <div
      className={`flex flex-col overflow-auto sticky items-center w-28  ${
        isDarkTheme
          ? "bg-gray-900"
          : "bg-linear-to-br from-orange-50 via-white to-amber-50"
      } ${
        isScrolled
          ? "top-16 h-[calc(100vh-64px)]"
          : "top-20 h-[calc(100vh-80px)]"
      } left-0  shrink-0 self-start py-4 transition-all duration-300
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
      {categoriesInfo?.map((category) => (
        <div
          key={category.idCategory}
          className={`shrink-0  rounded-lg flex flex-col items-center cursor-pointer transition-all duration-200 w-24 h-24 justify-center
    ${
      selectedCategory.strCategory === category.strCategory
        ? isDarkTheme
          ? "bg-blue-900 border-2 border-blue-500 scale-105 "
          : "bg-blue-100 border-2 border-blue-500 scale-105"
        : isDarkTheme
          ? "border-2 border-transparent hover:bg-gray-700 opacity-60 blur-[0.3px]"
          : "border-2 border-transparent hover:bg-gray-100 opacity-60 blur-[0.3px]"
    }`}
          onClick={() => setSelectedCategory(category)}
        >
          <Image
            src={category.strCategoryThumb}
            alt={category.strCategory}
            width={100}
            height={100}
            className="rounded-md"
          />
          <p
            className={`text-[12px] font-bold mb-2 capitalize ${
              isDarkTheme ? "text-gray-200" : "text-gray-800"
            } ${selectedCategory.strCategory === category.strCategory && "text-[14px]"}`}
          >
            {category.strCategory}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VerticalCategories;
