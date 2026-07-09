"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import MetisMark from "@/components/MetisMark";
import SignIn from "@/components/SignIn";

const NAV = [
  { href: "/", label: "Clients" },
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
    </>
  );
}
