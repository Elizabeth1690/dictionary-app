"use client";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
import { cn } from "../utils/cn";

type Props = {};

export default function ThemeToggleButton({}: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  function handleThemeToggle() {
    if (resolvedTheme === "light") setTheme("dark");
    else if (resolvedTheme === "dark") setTheme("light");
  }

  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={handleThemeToggle}
        className={cn(
          "flex h-5 w-10 bg-gray-500 hover:bg-purple transition-all cursor-pointer items-center rounded-full p-1",
          { "bg-purple": theme === "dark" }
        )}
      >
        <div
          className={cn(
            "h-4 w-4 rounded-full bg-white transition-all dark:bg-very-dark-blue-b",
            { "translate-x-full": theme === "dark" },
            { "translate-x-0": theme === "light" }
          )}
        />
      </button>
      <IoMoonOutline className="text-2xl text-gray-400 hover:text-purple" />
    </div>
  );
}
