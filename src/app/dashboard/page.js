"use client";

import { ProductsContainer } from "@/components/containers/ProductsContainer";
import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { FaDollarSign, FaShoppingCart, FaPlus } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";
import useProductStore from "@/store/productStore";
import useSellStore from "@/store/sellStore";
import { useEffect } from "react";
import useStore from "@/hooks/store/useStore";
import { CardSales } from "@/components/cards/CardSales";
import { SellsThisWeek } from "@/components/charts/SellsThisWeek";
import { FastCreateSellButton } from "@/components/buttons/FastCreateSellButton";

const columns = [
  {
    key: "product",
    label: "Productos",
  },
  {
    key: "quantity",
    label: "Cantidad",
  },
  {
    key: "priceTotal",
    label: "Precio total",
  },
  {
    key: "createdAt",
    label: "Fecha",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export default function Dashboard() {
  const { fetchProducts } = useProductStore();
  const products = useStore(useProductStore, (state) => state.products);
  const { fetchSells } = useSellStore();
  const sells = useStore(useSellStore, (state) => state.sells);
  const totalSalesPerDay = useStore(
    useSellStore,
    (state) => state.totalSalesPerDay
  );
  const totalSalesToday = useStore(
    useSellStore,
    (state) => state.totalSalesToday
  );
  const totalSalesThisWeek = useStore(
    useSellStore,
    (state) => state.totalSalesThisWeek
  );

  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
    if (!sells) {
      fetchSells();
      console.log(sells);
    }
  }, [products, sells, fetchProducts, fetchSells]);

  return (
    <main className="mt-4">
      <div className="gap-4 flex flex-row justify-center">
        <Button
          href="dashboard/products/create"
          as={Link}
          color="primary"
          endContent={<FaPlus className="text-lg" />}
        >
          Añadir producto
        </Button>
        <Button
          href="dashboard/shopping/create"
          as={Link}
          color="primary"
          endContent={<FaShoppingCart className="text-lg" />}
        >
          Añadir compra
        </Button>
        <FastCreateSellButton />
      </div>
      <div className="my-8 text-2xl font-semibold">
        <h2>Resumen de ventas</h2>
      </div>
      <div className="gap-8 grid grid-cols-1 w-full">
        <CardSales totalSales={totalSalesToday} label="Ventas de hoy" />
        <CardSales
          totalSales={totalSalesThisWeek}
          label="Ventas de esta semana"
        />
        <SellsThisWeek totalSalesPerDay={totalSalesPerDay} />
      </div>
      <div className="my-8 text-2xl font-semibold">
        <h2>Ultimos productos</h2>
      </div>
      <div className="gap-4 grid grid-cols-2">
        <ProductsContainer />
      </div>
      <div className="my-8 text-2xl font-semibold">
        <h2>Ultimas ventas</h2>
      </div>

      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className="text-center" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {sells &&
            sells
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((sell) => (
                <TableRow className="text-center" key={sell.id}>
                  <TableCell>{sell.product.name}</TableCell>
                  <TableCell>{sell.quantity}</TableCell>
                  <TableCell>{`${sell.totalPrice} BsF`}</TableCell>
                  <TableCell>
                    {new Date(sell.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="flex flex-row justify-center gap-2 w-full">
                    <Button
                      isIconOnly
                      variant="bordered"
                      color="danger"
                      className="border-0 rounded-full"
                      aria-label="Delete"
                      onClick={() => console.log(sell.id)}
                    >
                      <FaTrash className="text-xl" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </main>
  );
}
