"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SubscribePage() {
  const [plan, setPlan] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c08",
        color: "#fff",
        fontFamily: "'DM Sans',sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp .5s ease both}
        .plan-card{border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px;cursor:pointer;transition:all .25s;background:rgba(255,255,255,0.02);}
        .plan-card:hover{border-color:rgba(34,197,94,0.4);}
        .plan-card.active{border-color:#22c55e;background:rgba(34,197,94,0.06);}
        .btn{width:100%;padding:16px;border-radius:12px;border:none;cursor:pointer;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;font-size:16px;font-weight:600;font-family:inherit;transition:all .2s;margin-top:8px;}
        .btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(34,197,94,0.3);}
        .btn:disabled{opacity:.5;cursor:not-allowed;}
      `}</style>

      <div className="fade" style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#22c55e",
                marginBottom: 16,
              }}
            >
              ⛳ GolfGives
            </div>
          </a>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Choose your plan
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
            Cancel anytime. No hidden fees.
          </p>
        </div>

        {cancelled && (
          <div
            style={{
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.2)",
              color: "#fbbf24",
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 24,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Payment was cancelled. You can try again below.
          </div>
        )}

        {error && (
          <div
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {[
            {
              id: "monthly",
              name: "Monthly",
              price: "$9.99",
              period: "/month",
              badge: null,
              features: [
                "Monthly draw entry",
                "Score tracking (5 scores)",
                "Min. 10% to charity",
                "Winner dashboard",
              ],
            },
            {
              id: "yearly",
              name: "Yearly",
              price: "$99.99",
              period: "/year",
              badge: "2 months free",
              features: [
                "Everything in Monthly",
                "Priority winner verification",
                "Early draw notifications",
                "Annual summary report",
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
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `2px solid ${plan === p.id ? "#22c55e" : "rgba(255,255,255,0.2)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {plan === p.id && (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: "#22c55e",
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}
                  >
                    {p.name}
                  </span>
                  {p.badge && (
                    <span
                      style={{
                        background: "rgba(34,197,94,0.2)",
                        color: "#22c55e",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 20,
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div>
                  <span
                    style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}
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
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {p.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "rgba(255,255,255,0.5)",
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

        <button onClick={handleSubscribe} disabled={loading} className="btn">
          {loading
            ? "Redirecting to payment..."
            : `Subscribe — ${plan === "monthly" ? "$9.99/month" : "$99.99/year"} →`}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.25)",
            fontSize: 12,
            marginTop: 16,
          }}
        >
          Secured by Stripe · SSL encrypted · Cancel anytime
        </p>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <SubscribePage />
    </Suspense>
  );
}
