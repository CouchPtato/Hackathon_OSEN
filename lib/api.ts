import type { Quest, LeaderboardEntry, User } from "./types";

// Configure the backend URL - can be set via environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface QuestResponse {
  quests: Quest[];
}

interface ActivityPayload {
  type: string;
  questId?: string;
  xpGained?: number;
  statChanges?: Record<string, number>;
}

// Token management
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("liferpg_token", token);
    } else {
      localStorage.removeItem("liferpg_token");
    }
  }
}

export function getAuthToken(): string | null {
  if (authToken) return authToken;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("liferpg_token");
  }
  return authToken;
}

// Generic fetch wrapper with auth
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.message || `Error: ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Network error. Please check your connection." };
  }
}

// Auth endpoints
export async function login(
  username: string,
  password: string
): Promise<ApiResponse<LoginResponse>> {
  const response = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (response.data?.token) {
    setAuthToken(response.data.token);
  }

  return response;
}

export function logout() {
  setAuthToken(null);
}

// Quest endpoints
export async function getQuests(): Promise<ApiResponse<QuestResponse>> {
  return apiFetch<QuestResponse>("/quests");
}

export async function createQuest(
  quest: Omit<Quest, "id" | "completed">
): Promise<ApiResponse<Quest>> {
  return apiFetch<Quest>("/quests", {
    method: "POST",
    body: JSON.stringify(quest),
  });
}

export async function completeQuest(questId: string): Promise<ApiResponse<Quest>> {
  return apiFetch<Quest>(`/quests/${questId}/complete`, {
    method: "PATCH",
  });
}

// Activity endpoint
export async function logActivity(
  activity: ActivityPayload
): Promise<ApiResponse<{ success: boolean }>> {
  return apiFetch("/activity", {
    method: "POST",
    body: JSON.stringify(activity),
  });
}

// Leaderboard endpoint
export async function getLeaderboard(): Promise<ApiResponse<LeaderboardEntry[]>> {
  return apiFetch<LeaderboardEntry[]>("/leaderboard");
}

// User profile endpoint (if exists)
export async function getUserProfile(): Promise<ApiResponse<User>> {
  return apiFetch<User>("/auth/profile");
}
