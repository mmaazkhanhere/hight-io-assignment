import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<Link href="/">
				<Button aria-label="Homepage button" variant="outline">
					Homepage
				</Button>
			</Link>
			<Image
				src="/not-found.png"
				alt="Not Found"
				width={700}
				height={700}
			/>
		</div>
	);
};

export default NotFound;
