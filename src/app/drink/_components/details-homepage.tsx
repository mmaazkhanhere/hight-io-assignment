"use client";

import { RotateCw } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DrinkDetails } from "../../../../interfaces-d";

type Props = {};

const DetailsHomepage = (props: Props) => {
	const [drinkData, setDrinkData] = useState<DrinkDetails | null>(null);
	const drinkId = usePathname().split("/").pop();

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
				<RotateCw className="w-6 h-6 animate-spin" />
				Loading ...
			</div>
		);
	}

	console.log(drinkData);

	return (
		<div>
			<p>{drinkData.strDrink}</p>
		</div>
	);
};

export default DetailsHomepage;
