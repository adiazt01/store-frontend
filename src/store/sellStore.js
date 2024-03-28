import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { api } from "@/libs/api/axios";
import moment from "moment";

moment.updateLocale("es", {
  week: {
    dow: 1,
  },
});

const useSellStore = create(
  devtools(
    persist(
      (set, get) => ({
        sells: [],
        totalSalesToday: 0,
        totalSalesThisWeek: 0,
        totalSalesPerDay: {},
        fetchSells: async () => {
          try {
            const response = await api.get("/sells");

            if (!response.data.sells) {
              throw new Error("Sells is undefined");
            }

            let totalSalesToday = 0;
            let totalSalesThisWeek = 0;
            const totalSalesPerDay = {};

            const now = moment().startOf("day");
            const startOfWeekDate = now.clone().startOf("week");

            response.data.sells.forEach((sell) => {
              const sellDate = moment(sell.createdAt);
              const formattedSellDate = sellDate.format("YYYY-MM-DD");
              totalSalesPerDay[formattedSellDate] =
                (totalSalesPerDay[formattedSellDate] || 0) + sell.totalPrice;

              if (sellDate.isSame(now, "day")) {
                totalSalesToday += sell.totalPrice;
              }

              if (sellDate.isBetween(startOfWeekDate, now, "day", "[]")) {
                totalSalesThisWeek += sell.totalPrice;
              }
            });

            set({
              sells: response.data.sells,
              totalSalesToday,
              totalSalesThisWeek,
              totalSalesPerDay,
            });
          } catch (error) {
            console.log(error);
            set({ sells: [], error: error.message });
          }
        },
        createSell: async (data) => {
          try {
            await api.post("/sells", data);
            const response = await api.get("/sells");
            set({ sells: response.data.sells,  });
          } catch (error) {
            console.log(error);
            set({ sells: [] });
          }
        },
        updateSell: async (id, data) => {
          try {
            const response = await api.put(`/sells/${id}`, data);
            const sells = get().sells.map((sell) => {
              if (sell.id === id) {
                return response.data.sell;
              }
              return sell;
            });
            set({ sells });
          } catch (error) {
            set({ sells: [] });
          }
        },
        deleteSell: async (id) => {
          try {
            await api.delete(`/sells/${id}`);
            const sells = get().sells.filter((sell) => sell.id !== id);
            set({ sells });
          } catch (error) {
            set({ sells: [] });
          }
        },
      }),
      {
        name: "sell-storage",
      }
    )
  )
);

export default useSellStore;
