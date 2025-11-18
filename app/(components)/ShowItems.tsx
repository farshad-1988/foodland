import { useQuery } from "@tanstack/react-query";
import FoodCard from "./FoodCard";
import { Meals } from "../(types)/types";
import { useCategoryStore } from "../store/categoryStore";
import { useMealStore } from "../store/mealStore";
import { useSearchTextAndThemeStore } from "../store/searchTextAndThemeStore";

export default function ShowItems() {
  const { selectedCategory } = useCategoryStore();
  const { searchText, isDarkTheme } = useSearchTextAndThemeStore();
  const { setMeals, meals } = useMealStore();

  const fetchData = async (): Promise<Meals> => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.strCategory}`
    );
    const data = await res.json();
    setMeals(data.meals);
    return data.meals;
  };

  const {
    data: foodsInfo,
    isLoading,
    isError,
    error,
  } = useQuery<Meals>({
    queryKey: ["foods", selectedCategory],
    queryFn: fetchData,
    enabled: !!selectedCategory,
  });

  if (isLoading)
    return (
      <div
        className={`text-center p-8 ${
          isDarkTheme ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Loading...
      </div>
    );

  if (isError)
    return (
      <div
        className={`text-center p-8 ${
          isDarkTheme ? "text-red-400" : "text-red-600"
        }`}
      >
        Error: {error.message}
      </div>
    );

  if (!foodsInfo) return null;

  return (
    <div
      className={`px-4 sm:p-8 transition-colors duration-300 mt-4 md:mt-0 ${
        isDarkTheme
          ? "bg-gray-900"
          : "bg-linear-to-br from-orange-50 via-white to-amber-50"
      }`}
    >
      <div className=" mx-auto">
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals
            ?.filter((food) =>
              food.strMeal.toLowerCase().includes(searchText.toLowerCase())
            )
            ?.map((meal) => (
              <FoodCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
      </div>
    </div>
  );
}
