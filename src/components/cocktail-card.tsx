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
		<Link
			href={`${
				drink.strDrink == "50/50"
					? `/drink/${drink.idDrink}/${encodeURIComponent(
							drink.strDrink
					  )}`
					: `/drink/${drink.idDrink}/${drink.strDrink}`
			}`}
			className="bg-gradient-to-tl from-blue-200 via-blue-300 to-blue-400  
			dark:bg-gradient-to-tl dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
			flex flex-col p-4 shadow-lg hover:scale-105 transition-all duration-500 rounded-xl gap-y-4"
		>
			<div className="overflow-hidden">
				<Image
					src={drink.strDrinkThumb}
					alt={drink.strDrink}
					width={370}
					height={370}
					className="rounded-lg"
				/>
			</div>
			<p className="text-lg font-bold text-center">{drink.strDrink}</p>
		</Link>
	);
};

export default CocktailCard;
