import { CLIENTS } from "@/lib/clients";

// Resolve the effective set of client ids a subscription should receive:
// everything explicitly followed, plus every client matching a followed tag.
// Framework-free so both the client (My Pulse) and the server (cron) can use it.
export function resolveFollowedClientIds(profile) {
  const set = new Set(profile?.followedClients || []);
  if (profile?.followedTags?.length) {
    for (const c of CLIENTS) {
      if (c.tags.some((t) => profile.followedTags.includes(t))) set.add(c.id);
    }
  }
  return [...set];
}
