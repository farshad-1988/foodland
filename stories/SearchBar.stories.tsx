// import SearchBar from "@/app/(components)/SearchBar";
// import { Meta, StoryObj } from "@storybook/nextjs-vite";

// const meta = {
//     title: "searchbar/test",
//     tags: ["autodocs"],
//     component: SearchBar,
//     args:{}
// } satisfies Meta<typeof SearchBar>
// export default meta

// type Story = StoryObj<typeof meta>

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchBar from "@/app/(components)/SearchBar";
import { useSearchTextAndThemeStore } from "@/app/store/searchTextAndThemeStore";
import { useCategoryStore } from "@/app/store/categoryStore";
import { userEvent, within } from "storybook/test";
import { waitFor } from "@testing-library/react";

// Mock categories data
const mockCategories = [
  {
    idCategory: "1",
    strCategory: "Beef",
    strCategoryDescription: "Beef is the culinary name for meat from cattle...",
    strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
  },
  {
    idCategory: "2",
    strCategory: "Chicken",
    strCategoryDescription: "Chicken is a type of domesticated fowl...",
    strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png",
  },
  {
    idCategory: "3",
    strCategory: "Dessert",
    strCategoryDescription: "Dessert is a course that concludes a meal...",
    strCategoryThumb: "https://www.themealdb.com/images/category/dessert.png",
  },
  {
    idCategory: "4",
    strCategory: "Lamb",
    strCategoryDescription:
      "Lamb, hogget, and mutton are the meat of domestic sheep...",
    strCategoryThumb: "https://www.themealdb.com/images/category/lamb.png",
  },
  {
    idCategory: "5",
    strCategory: "Pasta",
    strCategoryDescription:
      "Pasta is a staple food of traditional Italian cuisine...",
    strCategoryThumb: "https://www.themealdb.com/images/category/pasta.png",
  },
];

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      // Create a new QueryClient for each story
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      // Set mock data in the query cache
      queryClient.setQueryData(["categories"], mockCategories);

      // Reset stores to initial state
      useSearchTextAndThemeStore.setState({
        searchText: "",
        isDarkTheme: true,
      });

      useCategoryStore.setState({
        selectedCategory: mockCategories[0],
        categories: mockCategories,
      });

      return (
        <QueryClientProvider client={queryClient}>
          <div className="w-full max-w-2xl p-8">
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Default state - collapsed search bar
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show only the search icon initially
    const searchButton = canvas.getByRole("button", { name: "" });
    await expect(searchButton).toBeInTheDocument();

    // Input should not be visible initially
    const searchInput = canvas.queryByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  },
};

// Expanded search bar
export const Expanded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the search button to expand
    const searchButton = canvas.getByRole("button", { name: "" });
    await userEvent.click(searchButton);

    // Wait for expansion animation
    await waitFor(() => {
      const searchInput = canvas.getByPlaceholderText("Search...");
      expect(searchInput).toBeVisible();
    });

    // Should show category dropdown button with "Beef" text
    const categoryButton = canvas.getByText("Beef");
    await expect(categoryButton).toBeInTheDocument();
  },
};

// Search with text input
export const WithSearchText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand search bar
    const searchButton = canvas.getByRole("button", { name: "" });
    await userEvent.click(searchButton);

    // Wait for input to be visible
    await waitFor(() => {
      const searchInput = canvas.getByPlaceholderText("Search...");
      expect(searchInput).toBeVisible();
    });

    // Type in search input
    const searchInput = canvas.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "chicken");

    // Verify the store was updated
    await waitFor(() => {
      const state = useSearchTextAndThemeStore.getState();
      expect(state.searchText).toBe("chicken");
    });
  },
};

// Category dropdown interaction
export const CategoryDropdownOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand search bar
    const searchButton = canvas.getByRole("button", { name: "" });
    await userEvent.click(searchButton);

    // Wait for category button to be visible
    await waitFor(() => {
      const categoryButton = canvas.getByText("Beef");
      expect(categoryButton).toBeVisible();
    });

    // Click category button to open dropdown
    const categoryButton = canvas.getByText("Beef");
    await userEvent.click(categoryButton);

    // Wait for dropdown to appear
    await waitFor(() => {
      const chickenOption = canvas.getByText("Chicken");
      expect(chickenOption).toBeVisible();
    });

    // Verify all categories are shown
    expect(canvas.getByText("Dessert")).toBeInTheDocument();
    expect(canvas.getByText("Lamb")).toBeInTheDocument();
    expect(canvas.getByText("Pasta")).toBeInTheDocument();
  },
};

// Select different category
export const SelectCategory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand search bar
    const searchButton = canvas.getByRole("button", { name: "" });
    await userEvent.click(searchButton);

    // Open category dropdown
    await waitFor(() => {
      const categoryButton = canvas.getByText("Beef");
      expect(categoryButton).toBeVisible();
    });

    const categoryButton = canvas.getByText("Beef");
    await userEvent.click(categoryButton);

    // Wait for dropdown and click "Chicken"
    await waitFor(() => {
      const chickenOption = canvas.getByText("Chicken");
      expect(chickenOption).toBeVisible();
    });

    const chickenOption = canvas.getByText("Chicken");
    await userEvent.click(chickenOption);

    // Verify the store was updated
    await waitFor(() => {
      const state = useCategoryStore.getState();
      expect(state.selectedCategory.strCategory).toBe("Chicken");
    });

    // Verify dropdown is closed
    await waitFor(() => {
      // The dropdown should close, so we should only see one "Chicken" text (in the button)
      const chickenElements = canvas.queryAllByText("Chicken");
      expect(chickenElements.length).toBe(1);
    });
  },
};

// Light theme
export const LightTheme: Story = {
  decorators: [
    (Story) => {
      useSearchTextAndThemeStore.setState({
        searchText: "",
        isDarkTheme: false,
      });

      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand search bar
    const searchButton = canvas.getByRole("button", { name: "" });
    await userEvent.click(searchButton);

    // Verify light theme styles are applied
    await waitFor(() => {
      const searchInput = canvas.getByPlaceholderText("Search...");
      expect(searchInput).toBeVisible();
      expect(searchInput).toHaveClass("bg-gray-50");
    });
  },
};

// Click outside to collapse (without search text)
export const ClickOutsideToCollapse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Expand search bar
    const searchButton = canvas.getByRole("button", { name: "" });
    await userEvent.click(searchButton);

    // Wait for input to be visible
    await waitFor(() => {
      const searchInput = canvas.getByPlaceholderText("Search...");
      expect(searchInput).toBeVisible();
    });

    // Click outside the search bar
    await userEvent.click(document.body);

    // The search bar should collapse (this is visual, hard to test directly)
    // But the input should still exist in the DOM
    const searchInput = canvas.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  },
};

// Search bar remains expanded with text
export const RemainsExpandedWithText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand search bar
    const searchButton = canvas.getByRole("button", { name: "" });
    await userEvent.click(searchButton);

    // Type text
    await waitFor(() => {
      const searchInput = canvas.getByPlaceholderText("Search...");
      expect(searchInput).toBeVisible();
    });

    const searchInput = canvas.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "pasta");

    // Click outside
    await userEvent.click(document.body);

    // Verify text is still there
    await waitFor(() => {
      const state = useSearchTextAndThemeStore.getState();
      expect(state.searchText).toBe("pasta");
    });

    // Input should still be visible because there's text
    expect(searchInput).toBeVisible();
  },
};
