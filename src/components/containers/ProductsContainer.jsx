"use client";

import useStore from "@/hooks/store/useStore";
import useProductStore from "@/store/productStore";
import { CardProduct } from "../cards/CardProduct";

export const ProductsContainer = () => {
	const products = useStore(useProductStore, (state) => state.products);

	if (!products) return <p>No hay productos</p>;

	return (
		<>
			{products &&
				products.map((product) => (
					<CardProduct key={product.id} product={product} />
				))}
		</>
	);
};
