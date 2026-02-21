import { getAllSignatures, getSignatureById } from "@/api/signature-api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSignatures = () => {
  return useQuery({
    queryKey: ["signatures"],
    queryFn: getAllSignatures,
  });
};

export const useGetSignatureById = (id: string) => {
  return useQuery({
    queryKey: ["signature", id],
    queryFn: () => getSignatureById(id),
  });
};
