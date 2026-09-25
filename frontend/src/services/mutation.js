import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../configs/api";

const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
  });
};

const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
  });
};

const useAddProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProducts"],
    mutationFn: async (data) => {
      const response = await api.post("/products", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
const useUpdateProducts = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updataProducts"],
    mutationFn: (payload) => api.put(`/products/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProducts"],
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
const useSelectedDeleteHandler = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["selectedDelete"],
    mutationFn: (payload) => api.delete(`/products`, { data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export {
  useRegister,
  useLogin,
  useAddProducts,
  useUpdateProducts,
  useDeleteProducts,
  useSelectedDeleteHandler,
};
