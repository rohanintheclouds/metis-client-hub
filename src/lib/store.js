// Subscriber store (server-only) — who gets the weekly Client Pulse.
//
// Two backends, chosen at runtime:
//   • Upstash Redis (REST) when UPSTASH_REDIS_REST_URL/TOKEN are set — the
//     production path (works on serverless, survives restarts).
//   • A local JSON file (.data/subscribers.json) otherwise — for `npm run dev`.
//
// A subscriber record:
//   { email, name, followedClients[], followedTags[], emailCadence, digestDay, updatedAt }
import { promises as fs } from "fs";
import path from "path";

const U_URL = process.env.UPSTASH_REDIS_REST_URL;
const U_TOK = process.env.UPSTASH_REDIS_REST_TOKEN;
const useUpstash = Boolean(U_URL && U_TOK);
const SET_KEY = "mch:subs";
const key = (email) => `mch:sub:${email}`;

export function storeMode() {
  return useUpstash ? "upstash" : "file";
}

async function redis(command) {
  const res = await fetch(U_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${U_TOK}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

async function redisPipeline(commands) {
  const res = await fetch(`${U_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${U_TOK}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  return res.json();
}

const FILE = path.join(process.cwd(), ".data", "subscribers.json");
async function readFile() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}
async function writeFile(obj) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(obj, null, 2));
}

export async function upsertSubscriber(sub) {
  const email = String(sub.email || "").trim().toLowerCase();
  if (!email) throw new Error("email required");
  const record = {
    email,
    name: sub.name || email.split("@")[0],
    followedClients: sub.followedClients || [],
    followedTags: sub.followedTags || [],
    emailCadence: sub.emailCadence || "weekly",
    digestDay: sub.digestDay || "Monday",
    updatedAt: new Date().toISOString(),
  };
  if (useUpstash) {
    await redis(["SET", key(email), JSON.stringify(record)]);
    await redis(["SADD", SET_KEY, email]);
  } else {
    const all = await readFile();
    all[email] = record;
    await writeFile(all);
  }
  return record;
}

export async function removeSubscriber(email) {
  email = String(email).trim().toLowerCase();
  if (useUpstash) {
    await redis(["DEL", key(email)]);
    await redis(["SREM", SET_KEY, email]);
  } else {
    const all = await readFile();
    delete all[email];
    await writeFile(all);
  }
}

export async function getSubscriber(email) {
  email = String(email).trim().toLowerCase();
  if (useUpstash) {
    const v = await redis(["GET", key(email)]);
    return v ? JSON.parse(v) : null;
  }
  const all = await readFile();
  return all[email] || null;
}

export async function listSubscribers() {
  if (useUpstash) {
    const emails = (await redis(["SMEMBERS", SET_KEY])) || [];
    if (!emails.length) return [];
    const results = await redisPipeline(emails.map((e) => ["GET", key(e)]));
    return results
      .map((r) => r?.result)
      .filter(Boolean)
      .map((v) => JSON.parse(v));
  }
  const all = await readFile();
  return Object.values(all);
}
