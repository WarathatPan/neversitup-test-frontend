import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiServer(
  endpoint: string,
  context: GetServerSidePropsContext,
  { ...customConfig }: RequestInit = {}
) {
  const cookies = parseCookies(context);
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

  const response = await fetch(`${API_URL}${endpoint}`, config);
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