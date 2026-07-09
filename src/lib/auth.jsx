"use client";

// ─────────────────────────────────────────────────────────────────────────
// Auth provider.
//
// Demo mode (default, zero-config): an email-gated sign-in restricted to
// @metisstrategy.com, persisted to localStorage. No password — this is a
// prototype gate, not a security boundary.
//
// Production: set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY and
// follow README "Enabling Clerk SSO" to swap this provider for Clerk's
// <ClerkProvider> + <SignIn>. The rest of the app consumes useAuth() and does
// not need to change.
// ─────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "mch.user";
const ALLOWED_DOMAIN = "metisstrategy.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  function signIn({ name, email }) {
    const clean = (email || "").trim().toLowerCase();
    if (!clean.endsWith("@" + ALLOWED_DOMAIN)) {
      return { ok: false, error: `Use your @${ALLOWED_DOMAIN} email address.` };
    }
    const u = { name: name?.trim() || clean.split("@")[0], email: clean };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    return { ok: true };
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signOut, allowedDomain: ALLOWED_DOMAIN }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
