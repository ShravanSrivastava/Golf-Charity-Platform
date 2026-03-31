"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Profile = {
  full_name: string;
  email: string;
  charity_percentage: number;
  role: string;
};
type Score = { id: string; score: number; played_at: string };
type Subscription = {
  plan: string;
  status: string;
  current_period_end: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [newScore, setNewScore] = useState("");
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [loading, setLoading] = useState(true);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError] = useState("");
  const [scoreSuccess, setScoreSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const [{ data: prof }, { data: scrs }, { data: sub }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("golf_scores")
        .select("*")
        .eq("user_id", user.id)
        .order("played_at", { ascending: false })
        .limit(5),
      supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single(),
    ]);

    setProfile(prof);
    setScores(scrs || []);
    setSubscription(sub);
    setLoading(false);
  };

  const handleAddScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setScoreLoading(true);
    setScoreError("");
    setScoreSuccess(false);

    const score = parseInt(newScore);
    if (score < 1 || score > 45) {
      setScoreError("Score must be between 1 and 45");
      setScoreLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("golf_scores")
      .insert({ user_id: user!.id, score, played_at: newDate });

    if (error) {
      setScoreError(error.message);
      setScoreLoading(false);
      return;
    }

    setNewScore("");
    setScoreSuccess(true);
    setTimeout(() => setScoreSuccess(false), 3000);
    setScoreLoading(false);
    loadData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#080c08",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 24 }}>⛳ Loading...</div>
      </main>
    );
  }

  const avgScore = scores.length
    ? Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length)
    : 0;
  const bestScore = scores.length ? Math.max(...scores.map((s) => s.score)) : 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c08",
        color: "#fff",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{opacity:.3}50%{opacity:.6}}
        .fade{animation:fadeUp .5s ease both}
        .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;}
        .tab{padding:10px 20px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;font-size:14px;font-weight:500;transition:all .2s;}
        .tab.active{background:rgba(34,197,94,0.15);color:#22c55e;}
        .tab:not(.active){background:transparent;color:rgba(255,255,255,0.35);}
        .tab:not(.active):hover{color:rgba(255,255,255,0.7);}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 14px;color:#fff;font-size:15px;font-family:inherit;outline:none;transition:all .2s;box-sizing:border-box;}
        .inp:focus{border-color:rgba(34,197,94,0.5);}
        .inp::placeholder{color:rgba(255,255,255,0.2);}
        .submit-btn{padding:12px 24px;border-radius:10px;border:none;cursor:pointer;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;font-size:14px;font-weight:600;font-family:inherit;transition:all .2s;white-space:nowrap;}
        .submit-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 20px rgba(34,197,94,0.25);}
        .submit-btn:disabled{opacity:.5;cursor:not-allowed;}
        .score-bar{height:6px;border-radius:3px;background:rgba(255,255,255,0.06);overflow:hidden;}
        .score-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#22c55e,#16a34a);transition:width .8s ease;}
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          position: "sticky",
          top: 0,
          background: "rgba(8,12,8,0.9)",
          backdropFilter: "blur(12px)",
          zIndex: 50,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: "#22c55e" }}>
          ⛳ GolfGives
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["overview", "scores", "draws", "charity"].map((t) => (
            <button
              key={t}
              className={`tab ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            padding: "8px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            fontFamily: "inherit",
          }}
        >
          Sign out
        </button>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div className="fade" style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Welcome back,{" "}
            <em style={{ color: "#22c55e" }}>
              {profile?.full_name?.split(" ")[0] || "Golfer"}
            </em>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
            {subscription?.status === "active"
              ? `${subscription.plan} plan · Active until ${new Date(subscription.current_period_end).toLocaleDateString("en-GB")}`
              : "No active subscription"}
          </p>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 16,
              }}
            >
              {[
                {
                  label: "Subscription",
                  value:
                    subscription?.status === "active"
                      ? "✅ Active"
                      : "⚠️ Inactive",
                  sub: subscription?.plan || "No plan",
                },
                {
                  label: "Scores logged",
                  value: scores.length,
                  sub: "Last 5 kept",
                },
                {
                  label: "Average score",
                  value: avgScore || "—",
                  sub: "Stableford pts",
                },
                {
                  label: "Best score",
                  value: bestScore || "—",
                  sub: "Stableford pts",
                },
              ].map((stat) => (
                <div key={stat.label} className="card fade">
                  <div
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 12,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent scores + Quick add */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* Recent scores */}
              <div className="card fade">
                <div
                  style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}
                >
                  Recent Scores
                </div>
                {scores.length === 0 ? (
                  <div
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontSize: 14,
                      textAlign: "center",
                      padding: "20px 0",
                    }}
                  >
                    No scores yet — add your first below!
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {scores.map((s, i) => (
                      <div
                        key={s.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "rgba(34,197,94,0.1)",
                            border: "1px solid rgba(34,197,94,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#22c55e",
                            flexShrink: 0,
                          }}
                        >
                          {s.score}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="score-bar">
                            <div
                              className="score-fill"
                              style={{ width: `${(s.score / 45) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,0.3)",
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          {new Date(s.played_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick add score */}
              <div className="card fade">
                <div
                  style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}
                >
                  Add Score
                </div>
                <form
                  onSubmit={handleAddScore}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Stableford Score (1–45)
                    </label>
                    <input
                      className="inp"
                      type="number"
                      min={1}
                      max={45}
                      value={newScore}
                      onChange={(e) => setNewScore(e.target.value)}
                      required
                      placeholder="e.g. 32"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Date played
                    </label>
                    <input
                      className="inp"
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      required
                    />
                  </div>
                  {scoreError && (
                    <div style={{ color: "#f87171", fontSize: 13 }}>
                      {scoreError}
                    </div>
                  )}
                  {scoreSuccess && (
                    <div style={{ color: "#22c55e", fontSize: 13 }}>
                      ✓ Score added successfully!
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={scoreLoading}
                    className="submit-btn"
                    style={{ width: "100%" }}
                  >
                    {scoreLoading ? "Adding..." : "+ Add Score"}
                  </button>
                </form>
                <p
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: 12,
                    marginTop: 12,
                  }}
                >
                  Only your latest 5 scores are kept
                </p>
              </div>
            </div>

            {/* Subscription banner if inactive */}
            {subscription?.status !== "active" && (
              <div
                className="fade"
                style={{
                  background: "rgba(34,197,94,0.06)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    No active subscription
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                    Subscribe to enter monthly prize draws and support your
                    charity.
                  </div>
                </div>
                <a
                  href="/subscribe"
                  style={{
                    background: "linear-gradient(135deg,#22c55e,#16a34a)",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: 10,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    whiteSpace: "nowrap",
                  }}
                >
                  Subscribe →
                </a>
              </div>
            )}
          </div>
        )}

        {/* SCORES TAB */}
        {activeTab === "scores" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="card fade">
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 24 }}>
                Your Golf Scores
              </div>
              <form
                onSubmit={handleAddScore}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 24,
                  flexWrap: "wrap",
                }}
              >
                <input
                  className="inp"
                  type="number"
                  min={1}
                  max={45}
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  required
                  placeholder="Score (1–45)"
                  style={{ maxWidth: 160 }}
                />
                <input
                  className="inp"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                  style={{ maxWidth: 180 }}
                />
                <button
                  type="submit"
                  disabled={scoreLoading}
                  className="submit-btn"
                >
                  {scoreLoading ? "Adding..." : "+ Add Score"}
                </button>
              </form>
              {scoreError && (
                <div
                  style={{ color: "#f87171", fontSize: 13, marginBottom: 16 }}
                >
                  {scoreError}
                </div>
              )}
              {scoreSuccess && (
                <div
                  style={{ color: "#22c55e", fontSize: 13, marginBottom: 16 }}
                >
                  ✓ Score added!
                </div>
              )}

              {scores.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 0",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  No scores yet. Add your first score above!
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {scores.map((s, i) => (
                    <div
                      key={s.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "16px 20px",
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "rgba(34,197,94,0.1)",
                          border: "1px solid rgba(34,197,94,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#22c55e",
                        }}
                      >
                        {s.score}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            marginBottom: 6,
                          }}
                        >
                          {s.score} points
                        </div>
                        <div className="score-bar" style={{ maxWidth: 300 }}>
                          <div
                            className="score-fill"
                            style={{ width: `${(s.score / 45) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontSize: 14,
                        }}
                      >
                        {new Date(s.played_at).toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      {i === 0 && (
                        <span
                          style={{
                            background: "rgba(34,197,94,0.15)",
                            color: "#22c55e",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "3px 10px",
                            borderRadius: 20,
                          }}
                        >
                          Latest
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* DRAWS TAB */}
        {activeTab === "draws" && (
          <div className="card fade">
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Monthly Draws
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 14,
                marginBottom: 32,
              }}
            >
              Your draw entries are generated from your 5 most recent scores.
            </p>
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎰</div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 24,
                  marginBottom: 8,
                }}
              >
                Next draw coming soon
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
                {scores.length >= 5
                  ? "You're entered! Your numbers: " +
                    scores.map((s) => s.score).join(", ")
                  : `Add ${5 - scores.length} more score${5 - scores.length === 1 ? "" : "s"} to enter the next draw`}
              </p>
              {scores.length >= 5 && (
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    marginTop: 24,
                  }}
                >
                  {scores.slice(0, 5).map((s, i) => (
                    <div
                      key={i}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        background: "rgba(34,197,94,0.1)",
                        border: "2px solid rgba(34,197,94,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#22c55e",
                      }}
                    >
                      {s.score}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHARITY TAB */}
        {activeTab === "charity" && (
          <div className="card fade">
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Your Charity
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 14,
                marginBottom: 32,
              }}
            >
              A portion of your subscription goes directly to your chosen
              charity.
            </p>
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 24,
                  marginBottom: 8,
                }}
              >
                {profile?.charity_percentage || 10}% of your subscription
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
                goes to your selected charity every month
              </p>
              <a
                href="/charities"
                style={{
                  display: "inline-block",
                  marginTop: 24,
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Change Charity →
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
