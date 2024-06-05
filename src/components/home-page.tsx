"use client";

import React, { useEffect, useState } from "react";

import { RotateCw } from "lucide-react";

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
		<div>
			{data.drinks.map((drink) => {
				return (
					<div key={drink.idDrink}>
						<p>{drink.strDrink}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Homepage;
