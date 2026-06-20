import FoodCard from "@/app/(components)/FoodCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof FoodCard> = {
  title: "Components/FoodCard",
  component: FoodCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    meal: {
      idMeal: "52940",
      strMeal: "Brown Stew",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
    },
  },
};

export const LongName: Story = {
  args: {
    meal: {
      idMeal: "52941",
      strMeal:
        "Traditional Persian Chicken Kebab with Saffron Rice and Grilled Vegetables",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
    },
  },
};

export const ImageError: Story = {
  args: {
    meal: {
      idMeal: "52942",
      strMeal: "Pasta Carbonara",
      strMealThumb: "https://invalid-url.com/image.jpg",
    },
  },
};
