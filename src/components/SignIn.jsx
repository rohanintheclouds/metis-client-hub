"use client";

import { useState } from "react";
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
    <div className="signin-wrap">
      <div className="signin">
        <div className="brand">
          <MetisMark height={34} />
        </div>
        <h1>Client Hub</h1>
        <p className="sub">Firm-wide client intelligence, personalized to your engagements.</p>
        <form onSubmit={submit}>
          <div className="field">
            <label>Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rohan Ray" />
          </div>
          <div className="field">
            <label>Work email</label>
            <input
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
          {err && <p className="err">{err}</p>}
          <button className="btn primary" type="submit">
            Enter the Hub
          </button>
        </form>
        <p className="demo-note">
          Demo sign-in, restricted to @{allowedDomain}. In production this is Clerk SSO.
          Your followed clients and weekly digest are tied to this email.
        </p>
      </div>
    </div>
  );
}
