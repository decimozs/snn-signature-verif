import { apiClient } from "@/lib/api-client";

export const getAllSignatures = async () => {
  return await apiClient("/signatures", { method: "GET" });
};

export const getSignatureById = async (id: string) => {
  return await apiClient(`/signatures/${id}`, { method: "GET" });
};
