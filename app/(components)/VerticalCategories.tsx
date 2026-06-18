import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCategoryStore } from "../store/categoryStore";
import { Categories } from "../(types)/types";
import Image from "next/image";
import { useSearchTextAndThemeStore } from "../store/searchTextAndThemeStore";

const VerticalCategories = () => {
  const { selectedCategory, setSelectedCategory, setCategories } =
    useCategoryStore();
  const { isDarkTheme } = useSearchTextAndThemeStore();

  const fetchCategories = async (): Promise<Categories> => {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
    );
    const data = await res.json();
    setCategories(data.categories);
    return data.categories;
  };

  const {
    data: categoriesInfo,
    isLoading,
    isError,
  } = useQuery<Categories>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
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

  return (
    <>
      {categoriesInfo?.map((category) => (
        <div
          key={category.idCategory}
          className={`shrink-0 rounded-lg flex flex-col items-center cursor-pointer transition-all duration-200 w-24 h-24 justify-center
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
    </>
  );
};

export default VerticalCategories;
