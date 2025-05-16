"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-fit">
      <Button
        className="cursor-pointer rounded-lg"
        variant={"secondary"}
        size={"lg"}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        {theme == "light" ? <Moon /> : <Sun />}
      </Button>
      {/* <Switch
        checked={theme === "light"}
        size={"lg"}
        className="pl-1 data-[state=checked]:bg-gray-200"
        onCheckedChange={() => }
        aria-label="Toggle dark mode"
      /> */}
    </div>
  );
};

export default ThemeSwitcher;
