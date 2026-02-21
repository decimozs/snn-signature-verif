function createApiClient(baseUrl = import.meta.env.VITE_API_BASE_URL) {
  return async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      credentials: "include",
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "API Request Failed");
    }

    return response.json();
  };
}

export const apiClient = createApiClient();
