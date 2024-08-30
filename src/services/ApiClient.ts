import { parseCookies } from "nookies";

export async function apiClient(
  endpoint: string,
  { ...customConfig }: RequestInit = {}
) {
  const cookies = parseCookies();
  const { access_token } = cookies;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (access_token) {
    headers["Authorization"] = `Bearer ${access_token}`;
  }
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  const response = await fetch(`/api${endpoint}`, config);
  const res = await response.json();

  if ("data" in res) {
    const { data } = res;
    return data;
  }

  if (!response.ok) {
    throw new Error(res.message || "Failed to fetch data");
  }

  return res;
}
