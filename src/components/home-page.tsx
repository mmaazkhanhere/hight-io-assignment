/**A react component representing the homepage UI of the website. The cocktail
data is fetched using useEffect and passed to cocktail card for being displayed */

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import CocktailCard from "./cocktail-card";
import { ToggleMode } from "./toggle-mode";
import HeroSection from "./hero-section";

type Props = {};
interface ResponseFormat {
	strDrink: string;
	strDrinkThumb: string;
	idDrink: string;
}
interface Response {
	drinks: ResponseFormat[];
}

const Homepage = (props: Props) => {
	{
		/*State variable for the cocktail list */
	}
	const [data, setData] = useState<Response | null>(null);

	useEffect(() => {
		{
			/*function for fetching the data */
		}
		const fetchData = async () => {
			{
				/*try catch to handle fetching effectively and logging errors if raised */
			}
			try {
				const request = await fetch(
					"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
				);
				const response = await request.json();
				setData(response);
			} catch (error) {
				console.error("Error fetching the cocktail data", error);
			}
		};
		fetchData();
	}, []);

	/*While data is being fetched (data is null), display a loading image indicating a process
	is going on */
	if (data === null) {
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

	return (
		<section className="flex flex-col items-start gap-y-10">
			{/*Hero Section */}
			<HeroSection />

			<div className="flex items-end gap-x-5 self-center px-2">
				{/*Heading */}
				<h1
					className="text-3xl md:text-4xl font-bold mt-10 underline underline-offset-2
					decoration-blue-500 "
				>
					Our Cocktail Collection
				</h1>
				{/*Button to between light and dark mode */}
				<ToggleMode />
			</div>

			{/*List of cocktails */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 px-2">
				{data.drinks.map((drink) => (
					<div key={drink.idDrink}>
						<CocktailCard drink={drink} />
					</div>
				))}
			</div>
		</section>
	);
};

export default Homepage;
