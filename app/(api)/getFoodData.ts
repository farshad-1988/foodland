import { Categories, Meals } from "../(types)/types";

export const fetchCategories = async (
  setCategories: (categories: Categories) => void,
): Promise<Categories> => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );
  const data = await res.json();
  setCategories(data.categories);
  return data.categories;
};

export const fetchData = async (
  setMeals: (meals: Meals) => void,
  strCategory: string,
): Promise<Meals> => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`,
  );
  const data = await res.json();
  setMeals(data.meals);
  return data.meals;
};
