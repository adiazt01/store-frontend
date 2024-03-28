"use client";

import { BreadcrumbsNav } from "@/components/navbar/BreadcrumbsNav";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <BreadcrumbsNav />
      {children}
    </>
  );
}
