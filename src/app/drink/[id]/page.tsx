import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import DetailsHomepage from "../_components/details-homepage";

type Props = {};

const DrinkDetails = (props: Props) => {
	return (
		<section>
			<Link href="/">
				<Button
					size="sm"
					variant="outline"
					className="flex items-center gap-x-2 text-base"
				>
					<ArrowLeft className="w-5 h-5" />
					<span>Back</span>
				</Button>
			</Link>

			<div className="mt-10">
				<DetailsHomepage />
			</div>
		</section>
	);
};

export default DrinkDetails;
