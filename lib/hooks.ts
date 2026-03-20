import useSWR, { mutate } from "swr";
import * as api from "./api";
import type { Quest, LeaderboardEntry, User } from "./types";

// SWR fetcher functions
const questsFetcher = async () => {
  const response = await api.getQuests();
  if (response.error) throw new Error(response.error);
  return response.data?.quests || [];
};

const leaderboardFetcher = async () => {
  const response = await api.getLeaderboard();
  if (response.error) throw new Error(response.error);
  return response.data || [];
};

const profileFetcher = async () => {
  const response = await api.getUserProfile();
  if (response.error) throw new Error(response.error);
  return response.data;
};

// Custom hooks
export function useQuests() {
  const { data, error, isLoading, mutate: mutateQuests } = useSWR<Quest[]>(
    "quests",
    questsFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const completeQuest = async (questId: string) => {
    // Optimistic update
    mutateQuests(
      (current) =>
        current?.map((q) =>
          q.id === questId ? { ...q, completed: true } : q
        ),
      false
    );

    const response = await api.completeQuest(questId);
    if (response.error) {
      // Revert on error
      mutateQuests();
      throw new Error(response.error);
    }

    return response.data;
  };

  const createQuest = async (quest: Omit<Quest, "id" | "completed">) => {
    const response = await api.createQuest(quest);
    if (response.error) throw new Error(response.error);
    mutateQuests();
    return response.data;
  };

  return {
    quests: data || [],
    isLoading,
    error,
    completeQuest,
    createQuest,
    refreshQuests: () => mutateQuests(),
  };
}

export function useLeaderboard() {
  const { data, error, isLoading } = useSWR<LeaderboardEntry[]>(
    "leaderboard",
    leaderboardFetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  return {
    leaderboard: data || [],
    isLoading,
    error,
    refreshLeaderboard: () => mutate("leaderboard"),
  };
}

export function useProfile() {
  const { data, error, isLoading, mutate: mutateProfile } = useSWR<User>(
    "profile",
    profileFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const updateLocalProfile = (updates: Partial<User>) => {
    mutateProfile(
      (current) => (current ? { ...current, ...updates } : current),
      false
    );
  };

  return {
    user: data,
    isLoading,
    error,
    updateLocalProfile,
    refreshProfile: () => mutateProfile(),
  };
}

export function useAuth() {
  const { user, isLoading, error, refreshProfile } = useProfile();

  const login = async (username: string, password: string) => {
    const response = await api.login(username, password);
    if (response.error) throw new Error(response.error);
    refreshProfile();
    return response.data;
  };

  const logout = () => {
    api.logout();
    mutate("profile", null, false);
    mutate("quests", [], false);
    mutate("leaderboard", [], false);
  };

  const isAuthenticated = !!api.getAuthToken();

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    refreshProfile,
  };
}
