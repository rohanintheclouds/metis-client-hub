"use client";

// Per-user personalization store (localStorage prototype).
// In production this becomes a row per user in the DB, keyed by Clerk user id.
// Tracks which clients/project-types a person follows and their email cadence.

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { CLIENTS } from "@/lib/clients";

const DEFAULTS = {
  followedClients: ["lumen-technologies", "adp", "ford-credit", "loandepot"],
  followedTags: [],
  emailCadence: "weekly", // 'weekly' | 'off'
  digestDay: "Monday",
};

function keyFor(email) {
  return `mch.profile.${email || "anon"}`;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(keyFor(user.email));
      setProfile(raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS);
    } catch {
      setProfile(DEFAULTS);
    }
    setReady(true);
  }, [user]);

  const save = useCallback(
    (next) => {
      setProfile(next);
      if (user) localStorage.setItem(keyFor(user.email), JSON.stringify(next));
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

  return { profile, ready, save, toggleClient, toggleTag, setCadence };
}

// Resolve the effective set of client ids a profile should see in "My Pulse":
// everything explicitly followed, plus every client matching a followed tag.
export function resolveFollowedClientIds(profile) {
  const set = new Set(profile.followedClients || []);
  if (profile.followedTags?.length) {
    for (const c of CLIENTS) {
      if (c.tags.some((t) => profile.followedTags.includes(t))) set.add(c.id);
    }
  }
  return [...set];
}
