import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShowItems from "../ShowItems";
import { Providers } from "../../Providers";
import { useMealStore } from "../../store/mealStore";
import { useCategoryStore } from "../../store/categoryStore";
import { useSearchTextAndThemeStore } from "../../store/searchTextAndThemeStore";
import { TestProviders } from "./TestProviders";

jest.mock("../../store/mealStore");
jest.mock("../../store/categoryStore");
jest.mock("../../store/searchTextAndThemeStore");

global.fetch = jest.fn();

describe("fetch and implements items", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useCategoryStore as unknown as jest.Mock).mockReturnValue({
      selectedCategory: { strCategory: "Beef" },
    });

    (useMealStore as unknown as jest.Mock).mockReturnValue({
      meals: [],
      setMeals: jest.fn(),
    });

    (useSearchTextAndThemeStore as unknown as jest.Mock).mockReturnValue({
      searchText: "",
      isDarkTheme: false,
    });
  });

  test("shows loading state initially", () => {
    render(
      <Providers>
        <ShowItems />
      </Providers>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("fetch meals and update state", async () => {
    const mockMeals = [
      {
        idMeal: "1",
        strMeal: "Spaghetti",
        strMealThumb: "/assets/appetizer.webp",
      },
      {
        idMeal: "2",
        strMeal: "Pizza",
        strMealThumb: "/assets/beverage.webp",
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mockMeals }),
    });

    // Mock all required stores with proper values
    (useCategoryStore as unknown as jest.Mock).mockReturnValue({
      selectedCategory: { strCategory: "Seafood" }, // Required for query to be enabled
    });

    (useSearchTextAndThemeStore as unknown as jest.Mock).mockReturnValue({
      searchText: "",
      isDarkTheme: false,
    });

    render(
      <Providers>
        <ShowItems />
      </Providers>
    );

    try {
      await waitFor(() => {
        expect(screen.getByText("Spaghetti")).toBeInTheDocument();
      });
    } catch (error) {
      throw new Error("error");
    }
    // Verify setMeals was called
    // expect(mockSetMeals).toHaveBeenCalledWith(mockMeals);
  });

  test("displays error message when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    //test provider to prevent react query retries to get error
    render(
      <TestProviders>
        <ShowItems />
      </TestProviders>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });

  test("test filter search", async () => {
    const mockMeals = [
      {
        idMeal: "1",
        strMeal: "Spaghetti",
        strMealThumb: "/assets/appetizer.webp",
      },
      {
        idMeal: "2",
        strMeal: "Pizza",
        strMealThumb: "/assets/beverage.webp",
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: mockMeals }),
    });

    (useMealStore as unknown as jest.Mock).mockReturnValue({
      meals: mockMeals,
      setMeals: jest.fn(),
    });

    (useSearchTextAndThemeStore as unknown as jest.Mock).mockReturnValue({
      searchText: "Pizza",
      isDarkTheme: false,
    });

    render(
      <TestProviders>
        <ShowItems />
      </TestProviders>
    );

    await waitFor(() => {
      expect(screen.getByText("Pizza")).toBeInTheDocument();
      expect(screen.queryByText("Spaghetti")).not.toBeInTheDocument();
    });
  });
});
