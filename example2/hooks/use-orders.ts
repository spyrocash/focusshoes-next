import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertCustomOrder, type InsertWholesaleInquiry } from "@shared/schema";

export function useCustomOrder() {
  return useMutation({
    mutationFn: async (data: InsertCustomOrder) => {
      const res = await fetch(api.customOrders.create.path, {
        method: api.customOrders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.customOrders.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit custom order");
      }
      return api.customOrders.create.responses[201].parse(await res.json());
    },
  });
}

export function useWholesaleInquiry() {
  return useMutation({
    mutationFn: async (data: InsertWholesaleInquiry) => {
      const res = await fetch(api.wholesaleInquiries.create.path, {
        method: api.wholesaleInquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.wholesaleInquiries.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit inquiry");
      }
      return api.wholesaleInquiries.create.responses[201].parse(await res.json());
    },
  });
}
