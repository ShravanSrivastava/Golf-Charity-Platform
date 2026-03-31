'use client'
import {
  Users,
  Trophy,
  DollarSign,
  BarChart2,
  Heart,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Trash2,
  PlayCircle,
  Send,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { BrandLogoLink } from "@/components/Logo";
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type User = { id: string; full_name: string; email: string; role: string; created_at: string }
type Subscription = { user_id: string; plan: string; status: string; current_period_end: string }
type Draw = { id: string; month: number; year: number; status: string; winning_numbers: number[]; jackpot_amount: number; pool_4match: number; pool_3match: number }
type Charity = { id: string; name: string; description: string; is_featured: boolean; is_active: boolean }
type Winner = { id: string; user_id: string; match_type: string; prize_amount: number; verification_status: string; payment_status: string; draw_id: string }

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [draws, setDraws] = useState<Draw[]>([]);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawLoading, setDrawLoading] = useState(false);
  const [newCharity, setNewCharity] = useState({ name: "", description: "" });
  const [charityMsg, setCharityMsg] = useState("");
  const [drawMsg, setDrawMsg] = useState("");
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

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("Profile role:", profile?.role);

    if (!profile || profile.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    const [{ data: u }, { data: s }, { data: d }, { data: c }, { data: w }] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("subscriptions").select("*"),
        supabase
          .from("draws")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("charities").select("*").order("name"),
        supabase
          .from("winners")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

    setUsers(u || []);
    setSubscriptions(s || []);
    setDraws(d || []);
    setCharities(c || []);
    setWinners(w || []);
    setLoading(false);
  };

  const runDraw = async () => {
    setDrawLoading(true);
    setDrawMsg("");
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Generate 5 random winning numbers (1-45)
    const winning_numbers: number[] = [];
    while (winning_numbers.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!winning_numbers.includes(n)) winning_numbers.push(n);
    }

    // Get active subscribers count
    const activeCount = subscriptions.filter(
      (s) => s.status === "active",
    ).length;
    const poolTotal = activeCount * 4.99;
    const jackpot = parseFloat((poolTotal * 0.4).toFixed(2));
    const pool4 = parseFloat((poolTotal * 0.35).toFixed(2));
    const pool3 = parseFloat((poolTotal * 0.25).toFixed(2));

    // Check if draw for this month exists
    const existing = draws.find((d) => d.month === month && d.year === year);
    if (existing) {
      // Update existing
      await supabase
        .from("draws")
        .update({
          winning_numbers,
          jackpot_amount: jackpot,
          pool_4match: pool4,
          pool_3match: pool3,
          status: "simulated",
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("draws").insert({
        month,
        year,
        winning_numbers,
        jackpot_amount: jackpot,
        pool_4match: pool4,
        pool_3match: pool3,
        draw_type: "random",
        status: "simulated",
      });
    }

    setDrawMsg(
      `✓ Draw simulated! Winning numbers: ${winning_numbers.join(", ")}`,
    );
    setDrawLoading(false);
    loadData();
  };

  const publishDraw = async (drawId: string) => {
    await supabase
      .from("draws")
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", drawId);
    setDrawMsg("✓ Draw published!");
    loadData();
  };

  const addCharity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharity.name) return;
    await supabase
      .from("charities")
      .insert({ ...newCharity, is_active: true, is_featured: false });
    setNewCharity({ name: "", description: "" });
    setCharityMsg("✓ Charity added!");
    setTimeout(() => setCharityMsg(""), 3000);
    loadData();
  };

  const toggleCharity = async (id: string, current: boolean) => {
    await supabase
      .from("charities")
      .update({ is_active: !current })
      .eq("id", id);
    loadData();
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase
      .from("charities")
      .update({ is_featured: !current })
      .eq("id", id);
    loadData();
  };

  const updateWinner = async (id: string, field: string, value: string) => {
    await supabase
      .from("winners")
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq("id", id);
    loadData();
  };

  const activeUsers = users.filter((u) =>
    subscriptions.find((s) => s.user_id === u.id && s.status === "active"),
  ).length;
  const totalRevenue = subscriptions
    .filter((s) => s.status === "active")
    .reduce((a, s) => a + (s.plan === "yearly" ? 99.99 : 9.99), 0);

  if (loading) {
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
        <style>{`
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    .loader-ring { width:56px; height:56px; border-radius:50%; border:2px solid rgba(34,197,94,0.15); border-top-color:#22c55e; animation:spin 0.9s linear infinite; }
  `}</style>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            animation: "fadeIn .5s ease both",
          }}
        >
          <BrandLogoLink size={32} />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loader-ring" />
            <div
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              letterSpacing: ".06em",
              textTransform: "uppercase",
            }}
          >
            Loading admin panel
          </p>
        </div>
      </main>
    );
  }

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
        .fade{animation:fadeUp .5s ease both}
        .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;}
        .tab{padding:10px 18px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;transition:all .2s;}
        .tab.active{background:rgba(34,197,94,0.15);color:#22c55e;}
        .tab:not(.active){background:transparent;color:rgba(255,255,255,0.35);}
        .tab:not(.active):hover{color:rgba(255,255,255,0.6);}
        .inp{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;color:#fff;font-size:14px;font-family:inherit;outline:none;transition:all .2s;box-sizing:border-box;}
        .inp:focus{border-color:rgba(34,197,94,0.5);}
        .inp::placeholder{color:rgba(255,255,255,0.2);}
        .btn-green{padding:10px 20px;border-radius:10px;border:none;cursor:pointer;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;font-size:13px;font-weight:600;font-family:inherit;transition:all .2s;}
        .btn-green:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 20px rgba(34,197,94,0.25);}
        .btn-green:disabled{opacity:.5;cursor:not-allowed;}
        .btn-ghost{padding:8px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);cursor:pointer;background:transparent;color:rgba(255,255,255,0.5);font-size:12px;font-family:inherit;transition:all .2s;}
        .btn-ghost:hover{border-color:rgba(255,255,255,0.25);color:#fff;}
        .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
        .badge-green{background:rgba(34,197,94,0.15);color:#22c55e;}
        .badge-red{background:rgba(239,68,68,0.15);color:#f87171;}
        .badge-yellow{background:rgba(234,179,8,0.15);color:#fbbf24;}
        .badge-gray{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);}
        table{width:100%;border-collapse:collapse;}
        th{text-align:left;color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:0 0 12px;font-weight:500;}
        td{padding:12px 0;border-top:1px solid rgba(255,255,255,0.05);font-size:14px;color:rgba(255,255,255,0.75);vertical-align:middle;}
        select{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 8px;color:#fff;font-size:12px;font-family:inherit;outline:none;cursor:pointer;}
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <BrandLogoLink size={26} />
          <span
            style={{
              background: "rgba(234,179,8,0.15)",
              color: "#fbbf24",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: ".06em",
            }}
          >
            ADMIN
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["overview", "users", "draws", "charities", "winners"].map((t) => (
            <button
              key={t}
              className={`tab ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <a
          href="/dashboard"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          ← Dashboard
        </a>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="fade">
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Admin Dashboard
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                Platform overview and quick stats
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 16,
              }}
            >
              {[
                {
                  label: "Total users",
                  value: users.length,
                  icon: <Users size={22} color="#22c55e" />,
                },
                {
                  label: "Active subscribers",
                  value: activeUsers,
                  icon: <CheckCircle size={22} color="#22c55e" />,
                },
                {
                  label: "Monthly revenue",
                  value: `$${totalRevenue.toFixed(2)}`,
                  icon: <DollarSign size={22} color="#22c55e" />,
                },
                {
                  label: "Total draws",
                  value: draws.length,
                  icon: <BarChart2 size={22} color="#22c55e" />,
                },
                {
                  label: "Total winners",
                  value: winners.length,
                  icon: <Trophy size={22} color="#22c55e" />,
                },
                {
                  label: "Active charities",
                  value: charities.filter((c) => c.is_active).length,
                  icon: <Heart size={22} color="#22c55e" />,
                },
              ].map((stat) => (
                <div key={stat.label} className="card fade">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    {stat.icon}
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
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent draws summary */}
            <div className="card fade">
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>
                Recent Draws
              </div>
              {draws.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 20,
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <BarChart2 size={28} color="rgba(34,197,94,0.5)" />
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    No draws yet
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.15)",
                      marginTop: 6,
                    }}
                  >
                    Click Run Draw Simulation above.
                  </div>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Numbers</th>
                      <th>Jackpot</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {draws.slice(0, 5).map((d) => (
                      <tr key={d.id}>
                        <td>
                          {MONTHS[d.month - 1]} {d.year}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            {d.winning_numbers.map((n, i) => (
                              <span
                                key={i}
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 6,
                                  background: "rgba(34,197,94,0.1)",
                                  border: "1px solid rgba(34,197,94,0.2)",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: "#22c55e",
                                }}
                              >
                                {n}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ color: "#22c55e" }}>
                          ${d.jackpot_amount}
                        </td>
                        <td>
                          <span
                            className={`badge ${d.status === "published" ? "badge-green" : d.status === "simulated" ? "badge-yellow" : "badge-gray"}`}
                          >
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="fade">
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Users
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                {users.length} total members
              </p>
            </div>
            <div className="card fade">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const sub = subscriptions.find((s) => s.user_id === u.id);
                    return (
                      <tr key={u.id}>
                        <td style={{ fontWeight: 500, color: "#fff" }}>
                          {u.full_name || "—"}
                        </td>
                        <td
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: 13,
                          }}
                        >
                          {u.email}
                        </td>
                        <td>
                          <span
                            className={`badge ${u.role === "admin" ? "badge-yellow" : "badge-gray"}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: 13,
                          }}
                        >
                          {sub?.plan || "—"}
                        </td>
                        <td>
                          <span
                            className={`badge ${sub?.status === "active" ? "badge-green" : "badge-red"}`}
                          >
                            {sub?.status || "none"}
                          </span>
                        </td>
                        <td
                          style={{
                            color: "rgba(255,255,255,0.35)",
                            fontSize: 12,
                          }}
                        >
                          {new Date(u.created_at).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DRAWS */}
        {activeTab === "draws" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="fade">
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Draw Management
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                Run, simulate, and publish monthly draws
              </p>
            </div>

            {/* Run draw */}
            <div
              className="card fade"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                  Run Monthly Draw
                </div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
                  Generates 5 random winning numbers and calculates prize pools.
                </p>
                {drawMsg && (
                  <div style={{ color: "#22c55e", fontSize: 13, marginTop: 8 }}>
                    {drawMsg}
                  </div>
                )}
              </div>
              <button
                onClick={runDraw}
                disabled={drawLoading}
                className="btn-green"
              >
                {drawLoading ? (
                  "Running..."
                ) : (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <PlayCircle size={18} /> Run Draw Simulation
                  </div>
                )}
              </button>
            </div>

            {/* Draws list */}
            <div className="card fade">
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>
                All Draws
              </div>
              {draws.length === 0 ? (
                <div
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    textAlign: "center",
                    padding: "40px 0",
                  }}
                >
                  No draws yet. Click "Run Draw Simulation" above.
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Winning Numbers</th>
                      <th>Jackpot</th>
                      <th>4-Match</th>
                      <th>3-Match</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {draws.map((d) => (
                      <tr key={d.id}>
                        <td style={{ color: "#fff", fontWeight: 500 }}>
                          {MONTHS[d.month - 1]} {d.year}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 5 }}>
                            {d.winning_numbers.map((n, i) => (
                              <span
                                key={i}
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 6,
                                  background: "rgba(34,197,94,0.1)",
                                  border: "1px solid rgba(34,197,94,0.2)",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: "#22c55e",
                                }}
                              >
                                {n}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ color: "#22c55e", fontWeight: 600 }}>
                          ${d.jackpot_amount}
                        </td>
                        <td style={{ color: "rgba(255,255,255,0.6)" }}>
                          ${d.pool_4match}
                        </td>
                        <td style={{ color: "rgba(255,255,255,0.6)" }}>
                          ${d.pool_3match}
                        </td>
                        <td>
                          <span
                            className={`badge ${d.status === "published" ? "badge-green" : d.status === "simulated" ? "badge-yellow" : "badge-gray"}`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td>
                          {d.status === "simulated" && (
                            <button
                              className="btn-ghost"
                              onClick={() => publishDraw(d.id)}
                            >
                              Publish →
                            </button>
                          )}
                          {d.status === "published" && (
                            <span
                              style={{
                                color: "rgba(255,255,255,0.25)",
                                fontSize: 12,
                              }}
                            >
                              Live
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* CHARITIES */}
        {activeTab === "charities" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="fade">
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Charities
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                Manage charity listings
              </p>
            </div>

            {/* Add charity */}
            <div className="card fade">
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
                Add New Charity
              </div>
              <form
                onSubmit={addCharity}
                style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
              >
                <input
                  className="inp"
                  value={newCharity.name}
                  onChange={(e) =>
                    setNewCharity({ ...newCharity, name: e.target.value })
                  }
                  placeholder="Charity name"
                  required
                  style={{ flex: 1, minWidth: 180 }}
                />
                <input
                  className="inp"
                  value={newCharity.description}
                  onChange={(e) =>
                    setNewCharity({
                      ...newCharity,
                      description: e.target.value,
                    })
                  }
                  placeholder="Short description"
                  style={{ flex: 2, minWidth: 240 }}
                />
                <button type="submit" className="btn-green">
                  + Add
                </button>
              </form>
              {charityMsg && (
                <div style={{ color: "#22c55e", fontSize: 13, marginTop: 12 }}>
                  {charityMsg}
                </div>
              )}
            </div>

            {/* Charities list */}
            <div className="card fade">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Featured</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {charities.map((c) => (
                    <tr key={c.id}>
                      <td style={{ color: "#fff", fontWeight: 500 }}>
                        {c.name}
                      </td>
                      <td
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: 13,
                          maxWidth: 300,
                        }}
                      >
                        {c.description || "—"}
                      </td>
                      <td>
                        <button
                          className="btn-ghost"
                          onClick={() => toggleFeatured(c.id, c.is_featured)}
                          style={{
                            color: c.is_featured
                              ? "#fbbf24"
                              : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {c.is_featured ? "⭐ Featured" : "Set featured"}
                        </button>
                      </td>
                      <td>
                        <span
                          className={`badge ${c.is_active ? "badge-green" : "badge-red"}`}
                        >
                          {c.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-ghost"
                          onClick={() => toggleCharity(c.id, c.is_active)}
                        >
                          {c.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WINNERS */}
        {activeTab === "winners" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="fade">
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Winners
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                Verify submissions and manage payouts
              </p>
            </div>
            <div className="card fade">
              {winners.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 20,
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <Trophy size={28} color="rgba(34,197,94,0.5)" />
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    No winners yet
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.15)",
                      marginTop: 6,
                    }}
                  >
                    Run and publish a draw first.
                  </div>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Match Type</th>
                      <th>Prize</th>
                      <th>Verification</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.map((w) => (
                      <tr key={w.id}>
                        <td
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: 12,
                          }}
                        >
                          {w.user_id.slice(0, 8)}...
                        </td>
                        <td>
                          <span className="badge badge-green">
                            {w.match_type}
                          </span>
                        </td>
                        <td style={{ color: "#22c55e", fontWeight: 600 }}>
                          ${w.prize_amount}
                        </td>
                        <td>
                          <span
                            className={`badge ${w.verification_status === "approved" ? "badge-green" : w.verification_status === "rejected" ? "badge-red" : "badge-yellow"}`}
                          >
                            {w.verification_status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${w.payment_status === "paid" ? "badge-green" : "badge-yellow"}`}
                          >
                            {w.payment_status}
                          </span>
                        </td>
                        <td style={{ display: "flex", gap: 6 }}>
                          {w.verification_status === "pending" && (
                            <>
                              <button
                                className="btn-ghost"
                                style={{ color: "#22c55e" }}
                                onClick={() =>
                                  updateWinner(
                                    w.id,
                                    "verification_status",
                                    "approved",
                                  )
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="btn-ghost"
                                style={{ color: "#f87171" }}
                                onClick={() =>
                                  updateWinner(
                                    w.id,
                                    "verification_status",
                                    "rejected",
                                  )
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {w.verification_status === "pending" && (
                            <>
                              <button
                                className="btn-ghost"
                                style={{
                                  color: "#22c55e",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                                onClick={() =>
                                  updateWinner(
                                    w.id,
                                    "verification_status",
                                    "approved",
                                  )
                                }
                              >
                                <CheckCircle size={13} /> Approve
                              </button>
                              <button
                                className="btn-ghost"
                                style={{
                                  color: "#f87171",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                                onClick={() =>
                                  updateWinner(
                                    w.id,
                                    "verification_status",
                                    "rejected",
                                  )
                                }
                              >
                                <XCircle size={13} /> Reject
                              </button>
                            </>
                          )}
                          {w.verification_status === "approved" &&
                            w.payment_status === "pending" && (
                              <button
                                className="btn-ghost"
                                style={{
                                  color: "#fbbf24",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                                onClick={() =>
                                  updateWinner(w.id, "payment_status", "paid")
                                }
                              >
                                <Send size={13} /> Mark Paid
                              </button>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}