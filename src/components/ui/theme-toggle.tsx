"use client";

import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Moon className="hidden dark:block" /> <Sun className="dark:hidden" />
    </Button>
  );
}
