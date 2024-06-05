"use client";

import { RotateCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DrinkDetails } from "../../../../../interfaces-d";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ToggleMode } from "@/components/toggle-mode";

type Props = {
	drinkId: string;
};

const DetailsHomepage = ({ drinkId }: Props) => {
	const [drinkData, setDrinkData] = useState<DrinkDetails | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const request = await fetch(
					`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
				);
				const response = await request.json();
				setDrinkData(response.drinks[0]);
			} catch (error) {
				console.error("Error fetching the drink data", error);
			}
		};
		fetchData();
	}, [drinkId]);

	if (drinkData === null) {
		return (
			<div className="flex items-center justify-center w-full h-full">
				<Image
					src="/loading.avif"
					alt="Loading"
					width={500}
					height={500}
					className=" animate-pulse"
				/>
			</div>
		);
	}

	const ingredientMeasure: string[] = Object.keys(drinkData)
		.filter(
			(key: string) =>
				key.startsWith("strMeasure") && drinkData[key] !== null
		)
		.map((quant: string) => drinkData[quant]);

	const ingredient: string[] = Object.keys(drinkData)
		.filter(
			(key: string) =>
				key.startsWith("strIngredient") && drinkData[key] !== null
		)
		.map((ing: string) => drinkData[ing]);

	return (
		<section className="flex flex-col items-col w-full">
			<div className="flex items-center gap-x-5 self-center">
				<h1 className="text-3xl font-bold  underline decoration-blue-400">
					{drinkData.strDrink}
				</h1>
				<ToggleMode />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl mx-auto my-14 ">
				<div className="flex flex-col items-start w-full">
					<Image
						src={drinkData.strDrinkThumb}
						alt={drinkData.strDrink}
						width={400}
						height={400}
					/>
					<div className="flex flex-col gap-y-1 mt-5 lg:mt-2">
						<h2 className="text-lg font-bold">Categories</h2>
						<Badge
							className="bg-gradient-to-bl from-blue-200 via-blue-300 to-blue-400
						dark:bg-gradient-to-tl dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
						dark:text-white
						"
						>
							{drinkData.strCategory}
						</Badge>
					</div>
					<div className="flex flex-col gap-y-1">
						<h2 className="text-lg font-bold">Glass</h2>
						<Badge
							className="bg-gradient-to-bl from-blue-200 via-blue-300 to-blue-400
						dark:bg-gradient-to-tl dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
						dark:text-white"
						>
							{drinkData.strGlass}
						</Badge>
					</div>
				</div>
				<div className="flex flex-col items-start w-full mt-10 lg:mt-0">
					<h2 className="text-lg font-semibold uppercase">
						Ingredients
					</h2>
					<ul className="w-full mt-2">
						{ingredient.map((ing, index) => (
							<li
								key={index}
								className=" bg-gradient-to-bl from-blue-200 via-blue-300 to-blue-400 
								dark:bg-gradient-to-tl dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
								p-1 rounded-lg border mt-1 w-full text-white"
							>
								{ingredientMeasure[index] &&
									ingredientMeasure[index] + " "}
								{ing}
							</li>
						))}
					</ul>
					<div className="flex flex-col gap-y-1 mt-5">
						<h2 className="text-lg font-semibold uppercase">
							Instructions
						</h2>
						<p
							className="bg-gradient-to-bl from-blue-200 via-blue-300 to-blue-400 
						dark:bg-gradient-to-tl dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
						p-1 border rounded-lg text-white"
						>
							{drinkData.strInstructions}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DetailsHomepage;
