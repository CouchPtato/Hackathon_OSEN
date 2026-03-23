import { useState } from "react";
import { signup, signin } from "@/lib/auth";
import { User } from "@/lib/types";

export function AuthModal({ open, onClose, onAuthSuccess }: { open: boolean; onClose: () => void; onAuthSuccess: (user: User, token: string) => void }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        const { user, token } = await signup(name, email, password);
        onAuthSuccess(user, token);
      } else {
        const { user, token } = await signin(email, password);
        onAuthSuccess(user, token);
      }
      onClose();
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
      ) {
        setError(err.response.data.message as string);
      } else {
        setError("Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-xs shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{isSignup ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup && (
            <input className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          )}
          <input className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="text-red-500 dark:text-red-400 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-green-600 dark:bg-green-700 text-white rounded py-2 font-semibold hover:bg-green-700 dark:hover:bg-green-800 transition" disabled={loading}>{loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}</button>
        </form>
        <div className="mt-3 text-center text-sm text-gray-700 dark:text-gray-300">
          {isSignup ? "Already have an account?" : "Don't have an account?"} {" "}
          <button className="text-green-600 dark:text-green-400 underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>
        <button className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold" onClick={onClose}>&times;</button>
      </div>
    </div>
  ) : null;
}
