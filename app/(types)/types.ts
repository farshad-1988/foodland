type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type Categories = Category[] | undefined;

export type { Category, Categories };

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type Meals = Meal[] | undefined;

export type { Meal, Meals };
