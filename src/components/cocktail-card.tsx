/**A react component that represents the a card to display the image of cocktail and name */

import React from "react";
import Image from "next/image";
import Link from "next/link";
type Props = {
	drink: {
		strDrink: string;
		strDrinkThumb: string;
		idDrink: string;
	};
};

const CocktailCard = ({ drink }: Props) => {
	return (
		/*Some cocktails have such name that are not valid (like 50/50 which will take
			user to another route that is not handled. So the name is encoded to correctly 
			handle the route
		) */
		<Link
			href={`${
				drink.strDrink.includes("/")
					? `/drink/${drink.idDrink}/${encodeURIComponent(
							drink.strDrink
					  )}`
					: `/drink/${drink.idDrink}/${drink.strDrink}`
			}`}
			className="bg-gradient-to-tl from-blue-200 via-blue-300 to-blue-400  
			dark:bg-gradient-to-tl dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
			flex flex-col p-4 shadow-lg hover:scale-105 transition-all duration-500 rounded-xl gap-y-4"
		>
			{/*Image */}
			<div className="overflow-hidden">
				<Image
					src={drink.strDrinkThumb}
					alt={drink.strDrink}
					width={370}
					height={370}
					className="rounded-lg"
				/>
			</div>
			{/*Name */}
			<p className="text-lg font-bold text-center">{drink.strDrink}</p>
		</Link>
	);
};

export default CocktailCard;
