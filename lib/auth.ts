import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function signup(name: string, email: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
  return res.data;
}

export async function signin(email: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/signin`, { email, password });
  return res.data;
}
