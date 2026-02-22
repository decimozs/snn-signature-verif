import { getAllSignatures, getSignatureById } from "@/api/signature-api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const signatureQueries = {
  getAll: () =>
    queryOptions({
      queryKey: ["signatures"],
      queryFn: getAllSignatures,
    }),
  getById: (id: string) =>
    queryOptions({
      queryKey: ["signature", id],
      queryFn: () => getSignatureById(id),
    }),
};

export const useGetAllSignatures = () => {
  return useQuery(signatureQueries.getAll());
};

export const useGetSignatureById = (id: string) => {
  return useQuery(signatureQueries.getById(id));
};
