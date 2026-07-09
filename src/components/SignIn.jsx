"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import MetisMark from "@/components/MetisMark";

export default function SignIn() {
  const { signIn, allowedDomain } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    const res = signIn({ name, email });
    if (!res.ok) setErr(res.error);
  }

  return (
    <div className="hero-signin">
      <div className="hs-streaks" aria-hidden />
      <div className="hs-glow" aria-hidden />
      <div className="hs-inner">
        <div className="hs-logo">
          <MetisMark height={54} variant="light" />
        </div>
        <div className="hs-eyebrow">Client Intelligence Hub</div>
        <h1 className="hs-title">
          Welcome to the <span className="accent">Client Hub</span>.
        </h1>
        <p className="hs-sub">
          Every client we serve, in one place. Weekly intelligence, a briefing personalized to your
          engagements, and audio episodes on demand.
        </p>

        <form className="hs-form" onSubmit={submit}>
          <div className="hs-fields">
            <input
              className="hs-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
            <input
              className="hs-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr("");
              }}
              placeholder={`you@${allowedDomain}`}
              required
            />
          </div>
          {err && <p className="hs-err">{err}</p>}
          <button className="hs-btn" type="submit">
            <span className="hs-btn-icon">
              <Plus size={18} strokeWidth={3} />
            </span>
            Sign in to the Client Hub
          </button>
        </form>

        <p className="hs-note">Restricted to @{allowedDomain} accounts</p>
      </div>
    </div>
  );
}
