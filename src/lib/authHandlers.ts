import axios from "axios";
import { AuthResponse, LoginDto, RegisterDto, User } from "./definitions";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC__API_HOST + "/auth",
  validateStatus: () => true,
});

export async function register({ email, password }: RegisterDto) {
  const res = await client.post<AuthResponse>("/register", {
    email,
    password,
  });

  return res.data;
}

export async function login({ email, password }: LoginDto) {
  const res = await client.post<AuthResponse>("/login", {
    email,
    password,
  });

  return res.data;
}

export async function logout(accessToken: string) {
  if (!accessToken) throw new Error("Not currently logged in");

  const res = await client.post<AuthResponse>("/logout", null, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return res.data;
}

export async function refresh(user: User | null, refreshToken: string | null) {
  if (!user || !refreshToken) throw new Error("Not currently logged in");

  const res = await client.post<AuthResponse>("/refresh", {
    userId: user.id,
    refreshToken,
  });

  return res.data;
}
