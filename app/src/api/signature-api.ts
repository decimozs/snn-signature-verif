import { apiClient } from "@/lib/api-client";
import type { Signature, SignatureLogs, Verification } from "@/lib/types";

export const getAllSignatures = async () => {
  return await apiClient<Signature[]>("/signatures", { method: "GET" });
};

export const getSignatureById = async (id: string) => {
  return await apiClient<
    Signature & { logs: SignatureLogs[]; verifications: Verification[] }
  >(`/signatures/${id}`, { method: "GET" });
};
