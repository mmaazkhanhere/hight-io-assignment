"use client";

import React, { useEffect, useState } from "react";

import { RotateCw } from "lucide-react";
import CocktailCard from "./cocktail-card";
import { ToggleMode } from "./toggle-mode";

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
			const request = await fetch(
				"https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
			);
			const response = await request.json();
			setData(response);
		};
		fetchData();
	}, []);

	if (data === null) {
		return (
			<div className="flex items-center justify-center w-full h-full">
				<RotateCw className="w-6 h-6 animate-spin" />
				Loading ...
			</div>
		);
	}

	return (
		<section className="flex flex-col items-start gap-y-10">
			<div className="flex items-end gap-x-5 self-center">
				<h1 className="text-4xl font-bold mt-10">Cocktails</h1>
				<ToggleMode />
			</div>

			<div className="grid grid-cols-4 gap-5">
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
