"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import MetisMark from "@/components/MetisMark";
import SignIn from "@/components/SignIn";
import ScrollReveal from "@/components/ScrollReveal";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/clients", label: "Clients" },
  { href: "/my-pulse", label: "My Pulse" },
  { href: "/settings", label: "Settings" },
];

export default function AppFrame({ children }) {
  const { user, ready, signOut } = useAuth();
  const pathname = usePathname();

  if (!ready) return null;
  if (!user) return <SignIn />;

  const initials = (user.name || user.email)
    .split(/[ .@]/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <ScrollReveal />
      <header className="topbar">
        <div className="container topbar-inner">
          <Link href="/" className="brand">
            <MetisMark height={28} />
          </Link>
          <nav className="nav-links">
            {NAV.map((n) => {
              const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} className={active ? "active" : ""}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="topbar-right">
            <div className="usermeta">
              <div className="nm">{user.name}</div>
              <div className="em">{user.email}</div>
            </div>
            <div className="avatar">{initials}</div>
            <button className="linkbtn" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <div className="footer-brand">
            <MetisMark height={30} variant="light" />
            <div className="footer-line">
              Driving change. <span className="g">Elevating leaders.</span>
            </div>
            <div className="footer-sub">
              The Client Hub is an internal Metis Strategy tool. Market data is point-in-time and
              summarized from public sources for informational use only, not investment advice.
            </div>
          </div>
          <div className="footer-nav">
            <div className="footer-col">
              <h4>Hub</h4>
              <Link href="/">Home</Link>
              <Link href="/clients">All clients</Link>
              <Link href="/my-pulse">My Pulse</Link>
              <Link href="/settings">Settings</Link>
            </div>
            <div className="footer-col">
              <h4>Coverage</h4>
              <span>East Coast</span>
              <span>Central</span>
              <span>West Coast</span>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          Proprietary &amp; Confidential, Metis Strategy LLC 2026
        </div>
      </footer>
    </>
  );
}
