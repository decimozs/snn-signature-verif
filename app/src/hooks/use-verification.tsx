import {
  getAllVerifications,
  getVerificationById,
} from "@/api/verification-api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const verificationQueries = {
  getAll: () =>
    queryOptions({
      queryKey: ["verifications"],
      queryFn: getAllVerifications,
    }),
  getById: (id: string) =>
    queryOptions({
      queryKey: ["verification", id],
      queryFn: () => getVerificationById(id),
    }),
};

export const useGetAllVerifications = () => {
  return useQuery(verificationQueries.getAll());
};

export const useGetVerificationById = (id: string) => {
  return useQuery(verificationQueries.getById(id));
};
