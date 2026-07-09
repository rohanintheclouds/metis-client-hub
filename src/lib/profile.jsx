"use client";

// Per-user personalization store. Persists to localStorage for instant UX and
// syncs the subscription to the server (/api/subscribers) so the weekly cron
// knows who to email and with which clients. The server sync is best-effort:
// on the static demo there's no API, so it silently no-ops.

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { resolveFollowedClientIds } from "@/lib/follow";

export { resolveFollowedClientIds };

const DEFAULTS = {
  followedClients: ["lumen-technologies", "adp", "ford-credit", "loandepot"],
  followedTags: [],
  emailCadence: "weekly", // 'weekly' | 'off'
  digestDay: "Monday",
};

function keyFor(email) {
  return `mch.profile.${email || "anon"}`;
}

function syncToServer(user, profile) {
  if (!user) return;
  try {
    fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        followedClients: profile.followedClients,
        followedTags: profile.followedTags,
        emailCadence: profile.emailCadence,
        digestDay: profile.digestDay,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) return;
    let next = DEFAULTS;
    try {
      const raw = localStorage.getItem(keyFor(user.email));
      next = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
    } catch {}
    setProfile(next);
    setReady(true);
    // Register/refresh this subscriber on the server on sign-in.
    syncToServer(user, next);
  }, [user]);

  const save = useCallback(
    (next) => {
      setProfile(next);
      if (user) {
        localStorage.setItem(keyFor(user.email), JSON.stringify(next));
        syncToServer(user, next);
      }
    },
    [user]
  );

  const toggleClient = useCallback(
    (id) => {
      const has = profile.followedClients.includes(id);
      save({
        ...profile,
        followedClients: has
          ? profile.followedClients.filter((c) => c !== id)
          : [...profile.followedClients, id],
      });
    },
    [profile, save]
  );

  const toggleTag = useCallback(
    (tag) => {
      const has = profile.followedTags.includes(tag);
      save({
        ...profile,
        followedTags: has
          ? profile.followedTags.filter((t) => t !== tag)
          : [...profile.followedTags, tag],
      });
    },
    [profile, save]
  );

  const setCadence = useCallback((emailCadence) => save({ ...profile, emailCadence }), [profile, save]);
  const setDigestDay = useCallback((digestDay) => save({ ...profile, digestDay }), [profile, save]);

  return { profile, ready, save, toggleClient, toggleTag, setCadence, setDigestDay };
}
