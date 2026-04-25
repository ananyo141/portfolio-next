"use client";

import { createContext, useContext, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    // Dispatch storage event so other tabs update
    window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
  }, []);

  const isDark =
    typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <ThemeContext.Provider value={{ theme: isDark ? "dark" : "light", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
