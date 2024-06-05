"use client";

import React, { useEffect, useState } from "react";

import CocktailCard from "./cocktail-card";
import { ToggleMode } from "./toggle-mode";
import Image from "next/image";
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
	const [data, setData] = useState<Response | null>(null);

	useEffect(() => {
		const fetchData = async () => {
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
			<HeroSection />

			<div className="flex items-end gap-x-5 self-center">
				<h1
					className="text-4xl font-bold mt-10 underline underline-offset-2
					decoration-blue-500"
				>
					Our Cocktail Collection
				</h1>
				<ToggleMode />
			</div>

			<div className="grid grid-cols-4 gap-5 mb-10">
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
