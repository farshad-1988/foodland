"use client";

/**
 * @return JSX Element
 *
 */

import { useSearchTextAndThemeStore } from "../store/searchTextAndThemeStore";

const Footer = () => {
  const { isDarkTheme } = useSearchTextAndThemeStore();

  return (
    <footer
      className={`w-full py-6 mt-12 border-t flex items-center justify-center ${
        isDarkTheme
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <p>&copy; {new Date().getFullYear()} FoodLand</p>
    </footer>
  );
};

export default Footer;
