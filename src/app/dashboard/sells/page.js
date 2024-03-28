"use client";

import {
  Button,
  Divider,
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import useStore from "@/hooks/store/useStore";
import useSellStore from "@/store/sellStore";
import useFilteredAndPaginatedProducts from "@/hooks/components/usePaginationAndFilters";
import { useState } from "react";

export default function SellsPage() {
  const sells = useStore(useSellStore, (state) => state.sells) || [];
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const sellsPerPage = 5;
  const { paginatedItems: currentSells, totalPages } =
    useFilteredAndPaginatedProducts(
      sells,
      searchTerm,
      minPrice,
      maxPrice,
      page,
      sellsPerPage
    );

  return (
    <main className="flex flex-col my-8">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 text-2xl font-semibold">
          <h1>Ventas</h1>
          <div className="flex items-center gap-8 flex-col mt-2">
            <Button
              href="/dashboard/sells/create"
              as={Link}
              className="w-full border-3 h-12"
              variant="ghost"
              radius="sm"
              color="primary"
              endContent={<FaPlus className="text-lg" />}
            >
              Registrar venta
            </Button>
            <Divider className="w-full" />
          </div>
        </div>
      </header>
      <section>
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={totalPages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="name">NOMBRE</TableColumn>
            <TableColumn key="quantity">CANTIDAD</TableColumn>
            <TableColumn key="totalPrice">ROLE</TableColumn>
          </TableHeader>
          <TableBody items={sells}>
            {currentSells &&
              currentSells.map((sell) => (
                <TableRow key={sell.id}>
                  <TableCell>{sell.product.name}</TableCell>
                  <TableCell>{sell.quantity}</TableCell>
                  <TableCell>{sell.totalPrice}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
