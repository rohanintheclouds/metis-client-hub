"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
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

        <form className="hs-card" onSubmit={submit}>
          <label className="hs-label" htmlFor="hs-email">Work email</label>
          <input
            id="hs-email"
            className="hs-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErr("");
            }}
            placeholder={`you@${allowedDomain}`}
            required
            autoFocus
          />
          <label className="hs-label" htmlFor="hs-name">Full name <span className="hs-opt">optional</span></label>
          <input
            id="hs-name"
            className="hs-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rohan Ray"
          />
          {err && <p className="hs-err">{err}</p>}
          <button className="hs-btn" type="submit">
            Sign in to the Client Hub
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
          <p className="hs-hint">
            No password. We use your email to personalize your hub and weekly digest.
          </p>
        </form>

        <p className="hs-note">Restricted to @{allowedDomain} accounts</p>
      </div>
    </div>
  );
}
