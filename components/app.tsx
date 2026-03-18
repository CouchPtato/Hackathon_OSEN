"use client";

import { useState, useEffect } from "react";
import { Dashboard } from "./dashboard";
import { LoginForm } from "./login-form";
import { useAuth } from "@/lib/hooks";
import { getAuthToken } from "@/lib/api";

export function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check for existing token on mount
    const token = getAuthToken();
    if (token) {
      setShowLogin(false);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    await login(username, password);
    setShowLogin(false);
  };

  const handleSkip = () => {
    setShowLogin(false);
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (showLogin && !isAuthenticated) {
    return <LoginForm onLogin={handleLogin} onSkip={handleSkip} />;
  }

  return <Dashboard />;
}
