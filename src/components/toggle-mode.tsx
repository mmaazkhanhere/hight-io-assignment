/**A react component to toggle between light and dark mode */
"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { MoonStar, Sun } from "lucide-react";

export function ToggleMode() {
	const [currentTheme, setCurrentTheme] = React.useState<string>("light");
	const { setTheme } = useTheme();

	const toggleTheme = () => {
		if (currentTheme === "light") {
			setCurrentTheme("dark");
			setTheme("dark");
		} else {
			setCurrentTheme("light");
			setTheme("light");
		}
	};

	return (
		<Button
			aria-label="dark and light mode toggle button"
			variant="outline"
			size="icon"
			className="dark:bg-muted"
			onClick={toggleTheme}
		>
			{currentTheme === "light" ? (
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			) : (
				<MoonStar className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			)}
		</Button>
	);
}
