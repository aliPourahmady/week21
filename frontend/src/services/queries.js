import { useQuery } from "@tanstack/react-query";
import api from "@/configs/api";

const useProducts = ({
  page = 1,
  limit = 10,
  name,
  minPrice,
  maxPrice,
} = {}) => {
  return useQuery({
    queryKey: ["products", { page, limit, name, minPrice, maxPrice }],
    queryFn: async () => {
      const params = { page, limit };
      if (name) params.name = name;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      try {
        const res = await api.get("/products", { params });
        return res.data;
      } catch (err) {
        if (err.response?.status == 400) {
          return { data: [], totalProducts: 0 };
        }
      }
      throw err;
    },
  });
};

export { useProducts };
