"use client";

import { RotateCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DrinkDetails } from "../../../../../interfaces-d";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Props = {
	drinkId: string;
};

const DetailsHomepage = ({ drinkId }: Props) => {
	const [drinkData, setDrinkData] = useState<DrinkDetails | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const request = await fetch(
				`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
			);
			const response = await request.json();
			setDrinkData(response.drinks[0]);
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
			<h1 className="text-3xl font-bold text-center">
				{drinkData.strDrink}
			</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl mx-auto mt-10">
				<div className="flex flex-col items-start w-full">
					<Image
						src={drinkData.strDrinkThumb}
						alt={drinkData.strDrink}
						width={400}
						height={400}
					/>
					<div className="flex flex-col gap-y-1">
						<h2 className="text-lg font-bold">Categories</h2>
						<Badge>{drinkData.strCategory}</Badge>
					</div>
					<div className="flex flex-col gap-y-1">
						<h2 className="text-lg font-bold">Glass</h2>
						<Badge>{drinkData.strGlass}</Badge>
					</div>
				</div>
				<div className="flex flex-col items-start w-full">
					<h2 className="text-lg font-bold">Ingredients</h2>
					<ul className="w-full">
						{ingredient.map((ing, index) => (
							<li
								key={index}
								className="p-1 rounded-lg border mt-1 w-full"
							>
								{ingredientMeasure[index] &&
									ingredientMeasure[index] + " "}
								{ing}
							</li>
						))}
					</ul>
					<div className="flex flex-col gap-y-1 mt-5">
						<h2 className="text-lg font-bold">Instructions</h2>
						<p className="p-1 border rounded-lg">
							{drinkData.strInstructions}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DetailsHomepage;
