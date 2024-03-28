import { useMemo } from "react";

function useFilteredAndPaginatedProducts(
	items,
	searchTerm,
	minPrice,
	maxPrice,
	currentPage,
	itemsPerPage,
) {
	const filteredItems = useMemo(() => {
		return items.filter(
			(item) =>
				(item.name
					? item.name.toLowerCase().includes(searchTerm.toLowerCase())
					: true) &&
				(item.price ? item.price >= minPrice && item.price <= maxPrice : true),
		);
	}, [items, searchTerm, minPrice, maxPrice]);

	const totalPages = useMemo(() => {
		return Math.ceil(filteredItems.length / itemsPerPage);
	}, [filteredItems, itemsPerPage]);

	const paginatedItems = useMemo(() => {
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;

		return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
	}, [filteredItems, currentPage, itemsPerPage]);

	return {
		totalPages,
		paginatedItems,
	};
}

export default useFilteredAndPaginatedProducts;
