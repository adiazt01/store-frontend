import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { api } from "@/libs/api/axios";

const useProductStore = create(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        fetchProducts: async () => {
          try {
            const response = await api.get("/products");
            set({ products: response.data.products });
          } catch (error) {
            set({ products: [] });
          }
        },
        createProduct: async (data) => {
          try {
            const response = await api.post("/products", data);
            set({ products: [...get().products, response.data.product] });
          } catch (error) {
            console.log(error);
            set({ products: [] });
          }
        },
        updateProduct: async (id, data) => {
          try {
            const response = await api.put(`/products/${id}`, data);
            const products = get().products.map((product) => {
              if (product.id === id) {
                return response.data.product;
              }
              return product;
            });
            set({ products });
          } catch (error) {
            set({ products: [] });
          }
        },
        deleteProduct: async (id) => {
          try {
            await api.delete(`/products/${id}`);
            const products = get().products.filter(
              (product) => product.id !== id
            );
            set({ products });
          } catch (error) {
            console.log(error);
            set({ products: [] });
          }
        },
      }),
      {
        name: "product-storage",
      }
    )
  )
);

export default useProductStore;
