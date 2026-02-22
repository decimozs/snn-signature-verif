import { apiClient } from "@/lib/api-client";
import type { Signature, Verification } from "@/lib/types";

export const getAllVerifications = async () => {
  return await apiClient<Verification[]>("/verifications", { method: "GET" });
};

export const getVerificationById = async (id: string) => {
  return await apiClient<Verification & { signature: Signature }>(
    `/verifications/${id}`,
    { method: "GET" },
  );
};
