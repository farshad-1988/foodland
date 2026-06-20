import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import type { Preview } from "@storybook/nextjs-vite";

// Import your Zustand stores
import { useSearchTextAndThemeStore } from "../app/store/searchTextAndThemeStore";
import { useCategoryStore } from "../app/store/categoryStore";
import { useMealStore } from "../app/store//mealStore.ts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      // Initialize your Zustand stores with default values before each story
      // This runs in the browser context where the stores are used
      const initializeStores = () => {
        // Reset Search & Theme Store
        useSearchTextAndThemeStore.setState({
          searchText: "",
          isDarkTheme: true,
        });

        // Reset Category Store
        useCategoryStore.setState({
          selectedCategory: {
            idCategory: "1",
            strCategory: "Beef",
            strCategoryDescription:
              "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]",
            strCategoryThumb:
              "https://www.themealdb.com/images/category/beef.png",
          },
          categories: [],
        });

        // Reset Meal Store
        useMealStore.setState({
          meals: [],
        });
      };

      // Initialize stores
      initializeStores();

      return (
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
