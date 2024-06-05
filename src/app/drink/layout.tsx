import React from "react";

type Props = {
	children: React.ReactNode;
};

const DrinkDetailLayout = ({ children }: Props) => {
	return <div className="max-w-7xl mx-auto mt-10">{children}</div>;
};

export default DrinkDetailLayout;
