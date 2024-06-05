/**A react component that displays the hero section of the website. A random
 * cocktail is displayed on the hero section by fetching data from specified
 * endpoint
 */
"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { RotateCw } from "lucide-react";

import { DrinkDetails } from "../../interfaces-d";

type Props = {};

const HeroSection = (props: Props) => {
	/*State variable for the data */
	const [randomData, setRandomData] = useState<DrinkDetails | null>(null);

	/*useEffect to fetch data from the specified endpoint */
	useEffect(() => {
		const fethcRandomDrink = async () => {
			try {
				const request = await fetch(
					"https://www.thecocktaildb.com/api/json/v1/1/random.php"
				);
				const response = await request.json();
				setRandomData(response.drinks[0]);
			} catch (error) {
				console.error("Error fetching the random drink", error);
			}
		};
		fethcRandomDrink();
	}, []);

	/*While data is being fetched, display a loading page indicating data is being
	fetched */
	if (randomData === null) {
		return (
			<div className="w-full flex items-center justify-center h-full">
				<RotateCw className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	return (
		<section className="w-full bg-gradient-to-tr from-blue-300 via-blue-500 to-blue-700 px-2">
			<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-center py-10 ">
				{/*Hero Headline and subheading */}
				<div className="flex flex-col items-start gap-y-3">
					\{/*Headline */}
					<h1 className="text-5xl font-bold uppercase tracking-wide text-black ">
						Sip Our Featured Creation{" "}
						<span className="text-white">
							{randomData.strDrink}
						</span>
					</h1>
					{/*Subheading */}
					<p className="font-extralight">
						We change our menu every month and pick our favorite
						display here
					</p>
				</div>
				{/*Image */}
				<div>
					<Link
						className="overflow-hidden "
						href={`/drink/${randomData.idDrink}/${randomData.strDrink}`}
					>
						<Image
							src={randomData.strDrinkThumb}
							alt={randomData.strDrink}
							width={300}
							height={300}
							className="hover:scale-105 transition duration-500 rounded-lg"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
