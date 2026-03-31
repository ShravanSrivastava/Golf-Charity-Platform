"use client";
import { BrandLogoLink } from "@/components/Logo";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c08",
        display: "flex",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px);} to { opacity:1; transform:translateY(0);} }
        @keyframes glow { 0%,100%{opacity:.4} 50%{opacity:.8} }
        .fade1{animation:fadeUp .6s ease both}
        .fade2{animation:fadeUp .6s .1s ease both}
        .fade3{animation:fadeUp .6s .2s ease both}
        .fade4{animation:fadeUp .6s .3s ease both}
        .inp {
          width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; padding:14px 16px; color:#fff; font-size:15px;
          font-family:inherit; outline:none; transition:all .2s; box-sizing:border-box;
        }
        .inp:focus { border-color:rgba(34,197,94,0.5); background:rgba(34,197,94,0.04); }
        .inp::placeholder { color:rgba(255,255,255,0.2); }
        .submit-btn {
          width:100%; padding:15px; border-radius:12px; border:none; cursor:pointer;
          background:linear-gradient(135deg,#22c55e,#16a34a); color:#fff;
          font-size:15px; font-weight:600; font-family:inherit;
          transition:all .2s; letter-spacing:.02em;
        }
        .submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(34,197,94,0.3); }
        .submit-btn:disabled { opacity:.5; cursor:not-allowed; }
      `}</style>

      {/* Left panel — decorative */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(160deg,#0d1f0d 0%,#080c08 60%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hidden md:flex"
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(34,197,94,0.12),transparent 70%)",
            animation: "glow 4s ease-in-out infinite",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <BrandLogoLink size={32} />
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 48,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            Every round
            <br />
            <em style={{ color: "#22c55e" }}>matters.</em>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 340,
            }}
          >
            Track your scores, enter monthly prize draws, and support the
            charity closest to your heart.
          </p>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              "Monthly prize draws with real cash prizes",
              "10%+ of every subscription to charity",
              "Stableford score tracking built in",
            ].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    flexShrink: 0,
                  }}
                />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 40px",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="fade1" style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            Welcome back
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
            Sign in to your GolfGives account
          </p>
        </div>

        {error && (
          <div
            className="fade2"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171",
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 24,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div className="fade2">
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Email
            </label>
            <input
              className="inp"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="fade3">
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Password
            </label>
            <input
              className="inp"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="fade4">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </div>
        </form>

        <p
          className="fade4"
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.3)",
            fontSize: 14,
            marginTop: 32,
          }}
        >
          No account?{" "}
          <Link
            href="/signup"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Create one free →
          </Link>
        </p>
      </div>
    </main>
  );
}
