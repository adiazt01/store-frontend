"use client";

import { CardProduct } from "@/components/cards/CardProduct";
import useStore from "@/hooks/store/useStore";
import useProductStore from "@/store/productStore";
import { Pagination, Input, Button, Divider, Slider } from "@nextui-org/react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const products = useStore(useProductStore, (state) => state.products) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const productsPerPage = 6;
  const memoizedProducts = useMemo(() => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, searchTerm, currentPage, minPrice, maxPrice]);

  useEffect(() => {
    setCurrentProducts(memoizedProducts);
  }, [products, searchTerm, currentPage, minPrice, maxPrice]);

  return (
    <main className="flex flex-col mt-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-8 text-2xl font-semibold">
          <h1>Productos</h1>
          <div className="flex items-center gap-8 flex-col mt-2">
            <Button
              href="/dashboard/products/create"
              as={Link}
              className="w-full border-3 h-12"
              variant="ghost"
              radius="sm"
              color="primary"
              endContent={<FaPlus className="text-lg" />}
            >
              Añadir producto
            </Button>
            <Divider className="w-full" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Ingresa para buscar un producto..."
              size="sm"
              startContent={<FaSearch size={18} />}
              type="search"
            />
            <div className="flex flex-col w-full gap-4">
              <Slider
                label="Filtrar por precio"
                onChange={(value) => {
                  setMinPrice(value[0]);
                  setMaxPrice(value[1]);
                }}
                maxValue={1000}
                minValue={0}
                defaultValue={[0, 1000]}
                formatOptions={{ style: "currency", currency: "Bsf" }}
                className="w-full"
              />
              <p className="w-full mt-2 text-sm text-left text-zinc-500">
                Mostrando {currentProducts.length} de {products.length}{" "}
                productos
              </p>
            </div>
          </div>
        </header>
        <Divider className="w-full" />
        {currentProducts.length === 0 && (
          <p className="text-2xl w-full font-semibold text-center">
            Ups, al parecer no hay productos que coincidan con tu búsqueda
          </p>
        )}
        <section className="grid min-h-[630px] grid-cols-2 auto-rows-min gap-8 w-full">
          {currentProducts &&
            currentProducts.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </section>
      </div>
      <div className="-mt-10 flex flex-row justify-center w-full">
        {currentProducts.length > 0 && (
          <Pagination
            className="mx-auto w-full"
            onChange={(number) => setCurrentPage(number)}
            total={currentProducts.length / productsPerPage + 1}
            initialPage={1}
          />
        )}
      </div>
    </main>
  );
}
