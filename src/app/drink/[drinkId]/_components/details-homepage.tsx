/**A react component that displays the detail of the cocktail */

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ToggleMode } from "@/components/toggle-mode";

import { DrinkDetails } from "../../../../../interfaces-d";

type Props = {
	drinkId: string;
};

const DetailsHomepage = ({ drinkId }: Props) => {
	/*state variable to store the drink data */
	const [drinkData, setDrinkData] = useState<DrinkDetails | null>(null);

	/*useEffect to fetch the data and assign to state variable. Everytime, drinkId is change
	the component will be re-rendered */
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

	/*While the data is being fetched, display a loading page to indicate data is being fetched */
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

	/*This variable holds all the ingredient quantity in array form by looping through
	the data and filtering out all the keys of the data that starts with strMeasure
	and then maps over it. This is required to display the quantity for each ingredient */
	const ingredientMeasure: string[] = Object.keys(drinkData)
		.filter(
			(key: string) =>
				key.startsWith("strMeasure") && drinkData[key] !== null
		)
		.map((quant: string) => drinkData[quant]);

	/*This variable holds all the ingredient  in array form by looping through
	the data and filtering out all the keys of the data that starts with strIngredient
	and then maps over it. */
	const ingredient: string[] = Object.keys(drinkData)
		.filter(
			(key: string) =>
				key.startsWith("strIngredient") && drinkData[key] !== null
		)
		.map((ing: string) => drinkData[ing]);

	return (
		<section className="flex flex-col items-col w-full">
			{/*Heading and theme div */}
			<div className="flex items-center gap-x-5 self-center">
				{/*Heading */}
				<h1 className="text-3xl font-bold  underline decoration-blue-400">
					{drinkData.strDrink}
				</h1>
				{/*Toggle mode for theme changing */}
				<ToggleMode />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl mx-auto my-14 ">
				{/*Left grid */}
				<div className="flex flex-col items-start w-full">
					{/*Image */}
					<Image
						src={drinkData.strDrinkThumb}
						alt={drinkData.strDrink}
						width={400}
						height={400}
					/>

					{/*Category */}
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

					{/*Glass */}
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

				{/*Right Grid */}
				<div className="flex flex-col items-start w-full mt-10 lg:mt-0">
					{/*Ingredient heading */}
					<h2 className="text-lg font-semibold uppercase">
						Ingredients
					</h2>

					{/*Ingredient and required quantity */}
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

					{/*Instructions */}
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
