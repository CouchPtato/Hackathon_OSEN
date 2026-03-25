import axios from "axios";

function getApiUrl() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (configured) return configured;

  if (typeof window !== "undefined") {
    const { origin, hostname } = window.location;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `${origin}/api`;
    }
  }

  return "http://localhost:5000/api";
}

const API_URL = getApiUrl();

export async function signup(name: string, email: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
  return res.data;
}

export async function signin(email: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/signin`, { email, password });
  return res.data;
}
