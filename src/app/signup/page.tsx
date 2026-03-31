"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("monthly");
  const [charityPct, setCharityPct] = useState(10);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, plan, charity_percentage: charityPct },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#080c08",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .fade1{animation:fadeUp .6s ease both}`}</style>
        <div
          className="fade1"
          style={{ textAlign: "center", maxWidth: 420, padding: 40 }}
        >
          <div style={{ fontSize: 64, marginBottom: 24 }}>📧</div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 32,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Check your inbox
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            We sent a confirmation link to{" "}
            <span style={{ color: "#fff" }}>{email}</span>. Click it to activate
            your GolfGives account.
          </p>
          <Link
            href="/login"
            style={{
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Go to Login →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c08",
        display: "flex",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes glow{0%,100%{opacity:.4}50%{opacity:.8}}
        .fade1{animation:fadeUp .6s ease both}
        .fade2{animation:fadeUp .6s .1s ease both}
        .fade3{animation:fadeUp .6s .2s ease both}
        .fade4{animation:fadeUp .6s .3s ease both}
        .slide{animation:slideIn .5s ease both}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 16px;color:#fff;font-size:15px;font-family:inherit;outline:none;transition:all .2s;box-sizing:border-box;}
        .inp:focus{border-color:rgba(34,197,94,0.5);background:rgba(34,197,94,0.04);}
        .inp::placeholder{color:rgba(255,255,255,0.2);}
        .plan-card{border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;cursor:pointer;transition:all .25s;background:rgba(255,255,255,0.02);}
        .plan-card:hover{border-color:rgba(34,197,94,0.4);background:rgba(34,197,94,0.04);}
        .plan-card.active{border-color:#22c55e;background:rgba(34,197,94,0.08);}
        .submit-btn{width:100%;padding:15px;border-radius:12px;border:none;cursor:pointer;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;font-size:15px;font-weight:600;font-family:inherit;transition:all .2s;}
        .submit-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(34,197,94,0.3);}
        .submit-btn:disabled{opacity:.5;cursor:not-allowed;}
        input[type=range]{-webkit-appearance:none;width:100%;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);outline:none;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#22c55e;cursor:pointer;}
      `}</style>

      {/* Left panel */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(160deg,#0d1f0d 0%,#080c08 60%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 60,
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
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#22c55e",
                marginBottom: 60,
              }}
            >
              ⛳ GolfGives
            </div>
          </Link>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 48,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            Play with
            <br />
            <em style={{ color: "#22c55e" }}>purpose.</em>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 340,
            }}
          >
            Join thousands of golfers making every round count for a cause they
            care about.
          </p>

          {/* Steps indicator */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {[
              { n: 1, label: "Create your account" },
              { n: 2, label: "Choose your plan & charity" },
              { n: 3, label: "Start playing & giving" },
            ].map((s) => (
              <div
                key={s.n}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    flexShrink: 0,
                    background:
                      step >= s.n ? "#22c55e" : "rgba(255,255,255,0.08)",
                    color: step >= s.n ? "#fff" : "rgba(255,255,255,0.3)",
                    transition: "all .3s",
                  }}
                >
                  {s.n}
                </div>
                <span
                  style={{
                    color:
                      step >= s.n
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(255,255,255,0.3)",
                    fontSize: 14,
                    transition: "all .3s",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 40px",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          overflowY: "auto",
        }}
      >
        {/* Step 1 — Account details */}
        {step === 1 && (
          <form
            onSubmit={handleNext}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div className="fade1">
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                Create account
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                Step 1 of 2 — Your details
              </p>
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#f87171",
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}

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
                Full Name
              </label>
              <input
                className="inp"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="John Smith"
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
                placeholder="Min. 6 characters"
              />
            </div>
            <div className="fade4">
              <button type="submit" className="submit-btn">
                Continue to Plan →
              </button>
            </div>
            <p
              className="fade4"
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.3)",
                fontSize: 14,
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "#22c55e",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Sign in
              </Link>
            </p>
          </form>
        )}

        {/* Step 2 — Plan & charity */}
        {step === 2 && (
          <div
            className="slide"
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                Choose your plan
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                Step 2 of 2 — Plan & giving
              </p>
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#f87171",
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}

            {/* Plan cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  id: "monthly",
                  name: "Monthly",
                  price: "£9.99",
                  period: "/month",
                  badge: null,
                  features: [
                    "Monthly draw entry",
                    "Score tracking",
                    "Min. 10% to charity",
                  ],
                },
                {
                  id: "yearly",
                  name: "Yearly",
                  price: "£99.99",
                  period: "/year",
                  badge: "2 months free",
                  features: [
                    "Everything in Monthly",
                    "Priority verification",
                    "Early notifications",
                  ],
                },
              ].map((p) => (
                <div
                  key={p.id}
                  className={`plan-card ${plan === p.id ? "active" : ""}`}
                  onClick={() => setPlan(p.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: `2px solid ${plan === p.id ? "#22c55e" : "rgba(255,255,255,0.2)"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {plan === p.id && (
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#22c55e",
                              }}
                            />
                          )}
                        </div>
                        <span
                          style={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 16,
                          }}
                        >
                          {p.name}
                        </span>
                        {p.badge && (
                          <span
                            style={{
                              background: "rgba(34,197,94,0.2)",
                              color: "#22c55e",
                              fontSize: 11,
                              fontWeight: 600,
                              padding: "2px 8px",
                              borderRadius: 20,
                            }}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}
                      >
                        {p.price}
                      </span>
                      <span
                        style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}
                      >
                        {p.period}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {p.features.map((f) => (
                      <div
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: "rgba(255,255,255,0.45)",
                          fontSize: 13,
                        }}
                      >
                        <span style={{ color: "#22c55e" }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Charity slider */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  ❤️ Charity contribution
                </span>
                <span
                  style={{ color: "#22c55e", fontWeight: 700, fontSize: 18 }}
                >
                  {charityPct}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                value={charityPct}
                onChange={(e) => setCharityPct(Number(e.target.value))}
              />
              <p
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: 12,
                  marginTop: 8,
                }}
              >
                Minimum 10% · Slide to give more
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: 15,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 15,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                ← Back
              </button>
              <button
                onClick={handleSignup}
                disabled={loading}
                className="submit-btn"
                style={{ flex: 2 }}
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
