"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BrandLogoLink } from "./Logo";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
} from "lucide-react";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: prof } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", user.id)
          .single();
        setProfile(prof);
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(8,12,8,0.88)",
        backdropFilter: "blur(16px)",
        padding: "0 40px",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <BrandLogoLink size={30} />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {!user ? (
          <>
            <Link
              href="/charities"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Charities
            </Link>
            <Link
              href="/login"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                textDecoration: "none",
                padding: "9px 20px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                transition: "all .2s",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              style={{
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                color: "#fff",
                fontSize: 14,
                textDecoration: "none",
                padding: "9px 20px",
                borderRadius: 10,
                fontWeight: 600,
              }}
            >
              Join now
            </Link>
          </>
        ) : (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "8px 14px",
                cursor: "pointer",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: 14,
                transition: "all .2s",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {profile?.full_name?.charAt(0)?.toUpperCase() || "G"}
              </div>
              <span
                style={{
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {profile?.full_name?.split(" ")[0] || "Account"}
              </span>
              {profile?.role === "admin" && (
                <span
                  style={{
                    background: "rgba(234,179,8,0.15)",
                    color: "#fbbf24",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 4,
                    letterSpacing: ".04em",
                  }}
                >
                  ADMIN
                </span>
              )}
              <ChevronDown
                size={14}
                color="rgba(255,255,255,0.4)"
                style={{
                  transform: menuOpen ? "rotate(180deg)" : "none",
                  transition: "transform .2s",
                }}
              />
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "#111714",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  padding: 8,
                  minWidth: 200,
                  boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
                  zIndex: 100,
                }}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 8,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <LayoutDashboard size={16} color="#22c55e" /> Dashboard
                </Link>

                {profile?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 8,
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "all .15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <Shield size={16} color="#fbbf24" /> Admin Panel
                  </Link>
                )}

                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.06)",
                    margin: "6px 0",
                  }}
                />

                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 8,
                    color: "rgba(255,255,255,0.5)",
                    background: "transparent",
                    border: "none",
                    fontSize: 14,
                    cursor: "pointer",
                    width: "100%",
                    fontFamily: "inherit",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(239,68,68,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <LogOut size={16} color="#f87171" /> Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
