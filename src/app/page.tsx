"use client";
import { Navbar } from "@/components/Navbar";
import { BrandLogoLink } from "@/components/Logo";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import {
  Trophy,
  Heart,
  Target,
  ChevronRight,
  Check,
  TrendingUp,
  Users,
  Gift,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  useReveal();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c08",
        color: "#fff",
        fontFamily: "'DM Sans',sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.9;transform:scale(1.04)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .hero-badge{animation:fadeUp .6s ease both}
        .hero-h1{animation:fadeUp .6s .1s ease both}
        .hero-p{animation:fadeUp .6s .2s ease both}
        .hero-cta{animation:fadeUp .6s .3s ease both}
        .hero-glow{animation:pulse 5s ease-in-out infinite}
        .float-card{animation:float 6s ease-in-out infinite}
        .reveal{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .reveal-delay-1{transition-delay:.1s}
        .reveal-delay-2{transition-delay:.2s}
        .reveal-delay-3{transition-delay:.3s}
        .reveal-delay-4{transition-delay:.4s}
        .btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;padding:14px 28px;border-radius:10px;font-weight:600;font-size:15px;border:none;cursor:pointer;transition:transform .2s,box-shadow .2s;text-decoration:none;font-family:inherit;position:relative;overflow:hidden}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(34,197,94,.35)}
        .btn-primary:active{transform:translateY(0)}
        .btn-secondary{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#22c55e;padding:14px 28px;border-radius:10px;font-weight:600;font-size:15px;border:1px solid rgba(34,197,94,.4);cursor:pointer;transition:all .2s;text-decoration:none;font-family:inherit}
        .btn-secondary:hover{background:rgba(34,197,94,.08);border-color:#22c55e;transform:translateY(-1px)}
        .card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:16px}
        .step-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:36px;transition:all .3s}
        .step-card:hover{background:rgba(34,197,94,.04);border-color:rgba(34,197,94,.25);transform:translateY(-4px)}
        .prize-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:36px;text-align:center;transition:all .3s}
        .prize-card:hover{transform:translateY(-4px)}
        .plan-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:36px;transition:all .3s;position:relative}
        .plan-card.featured{border-color:rgba(34,197,94,.5);background:rgba(34,197,94,.04)}
        .plan-card:hover{transform:translateY(-4px);box-shadow:0 24px 48px rgba(0,0,0,.4)}
        .charity-pill{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:100px;padding:10px 20px;font-size:14px;color:rgba(255,255,255,.6);transition:all .3s;display:flex;align-items:center;gap:8px}
        .charity-pill:hover{border-color:rgba(34,197,94,.3);color:#fff;background:rgba(34,197,94,.05)}
        .stat-num{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;background:linear-gradient(135deg,#22c55e,#4ade80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        nav a, nav button{text-decoration:none}
      `}</style>

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <div
          className="hero-glow"
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(34,197,94,0.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(34,197,94,0.06) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "8%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(34,197,94,0.06) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: 780, zIndex: 1 }}>
          <div
            className="hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 100,
              padding: "8px 18px",
              marginBottom: 32,
              fontSize: 13,
              color: "#4ade80",
            }}
          >
            <Trophy size={14} color="#22c55e" />
            Monthly prize draws · Charity giving · Score tracking
          </div>
          <h1
            className="hero-h1"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(48px,7vw,84px)",
              fontWeight: 700,
              lineHeight: 1.08,
              marginBottom: 24,
              letterSpacing: "-.02em",
            }}
          >
            Play Golf.
            <br />
            <em style={{ color: "#22c55e", fontStyle: "italic" }}>
              Change Lives.
            </em>
          </h1>
          <p
            className="hero-p"
            style={{
              fontSize: "clamp(16px,2vw,20px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 40px",
            }}
          >
            Track your Stableford scores, enter monthly prize draws, and
            automatically support the charity you love — all in one place.
          </p>
          <div
            className="hero-cta"
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/signup"
              className="btn-primary"
              style={{ fontSize: 16, padding: "16px 32px" }}
            >
              Start for £9.99/month <ArrowRight size={18} />
            </Link>
            <Link
              href="#how-it-works"
              className="btn-secondary"
              style={{ fontSize: 16, padding: "16px 32px" }}
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "40px 40px 80px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 40,
            textAlign: "center",
          }}
        >
          {[
            { value: "£50K+", label: "Prize pool distributed" },
            { value: "2,400+", label: "Active members" },
            { value: "12", label: "Charity partners" },
            { value: "£30K+", label: "Donated to charity" },
          ].map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1}`}>
              <div className="stat-num">{s.value}</div>
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 14,
                  marginTop: 6,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        style={{
          padding: "80px 40px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <div
              style={{
                color: "#22c55e",
                fontSize: 13,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              How it works
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Three steps to play with purpose
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 17,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Simple, transparent, and built around giving back.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                icon: <Target size={28} color="#22c55e" />,
                step: "01",
                title: "Subscribe & Choose",
                desc: "Pick a monthly or yearly plan. Select the charity closest to your heart from our verified directory of partners.",
              },
              {
                icon: <TrendingUp size={28} color="#22c55e" />,
                step: "02",
                title: "Enter Your Scores",
                desc: "Log your last 5 Stableford scores after each round. Your numbers are used to generate your monthly draw entry.",
              },
              {
                icon: <Gift size={28} color="#22c55e" />,
                step: "03",
                title: "Win & Give Back",
                desc: "Match 3, 4, or all 5 numbers to win cash prizes. A portion of every subscription automatically goes to your charity.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`step-card reveal reveal-delay-${i + 1}`}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    color: "rgba(34,197,94,0.6)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    marginBottom: 10,
                  }}
                >
                  STEP {item.step}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.7,
                    fontSize: 15,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool */}
      <section
        style={{
          padding: "80px 40px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <div
              style={{
                color: "#22c55e",
                fontSize: 13,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Prize structure
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Real prizes, every month
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 17,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Every subscription contributes to a growing prize pool.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                match: "5-Number Match",
                share: "40%",
                color: "#22c55e",
                note: "Jackpot — rolls over if unclaimed",
                icon: <Trophy size={32} color="#22c55e" />,
              },
              {
                match: "4-Number Match",
                share: "35%",
                color: "#60a5fa",
                note: "Split equally among winners",
                icon: <Star size={32} color="#60a5fa" />,
              },
              {
                match: "3-Number Match",
                share: "25%",
                color: "#a78bfa",
                note: "Split equally among winners",
                icon: <Gift size={32} color="#a78bfa" />,
              },
            ].map((tier, i) => (
              <div
                key={tier.match}
                className={`prize-card reveal reveal-delay-${i + 1}`}
                style={{ borderColor: `${tier.color}20` }}
              >
                <div style={{ marginBottom: 20 }}>{tier.icon}</div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    color: tier.color,
                    fontFamily: "'Playfair Display',serif",
                    marginBottom: 8,
                  }}
                >
                  {tier.share}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                  {tier.match}
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
                  {tier.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section
        style={{
          padding: "80px 40px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <div
              style={{
                color: "#22c55e",
                fontSize: 13,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Pricing
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Simple, honest pricing
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 17 }}>
              No hidden fees. Cancel anytime.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                name: "Monthly",
                price: "£9.99",
                period: "/month",
                featured: false,
                href: "/signup?plan=monthly",
                features: [
                  "Monthly prize draw entry",
                  "Stableford score tracking",
                  "Charity contribution (min 10%)",
                  "Winner dashboard & history",
                ],
              },
              {
                name: "Yearly",
                price: "£99.99",
                period: "/year",
                featured: true,
                href: "/signup?plan=yearly",
                features: [
                  "Everything in Monthly",
                  "2 months completely free",
                  "Priority winner verification",
                  "Early draw notifications",
                ],
              },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`plan-card reveal reveal-delay-${i + 1} ${plan.featured ? "featured" : ""}`}
              >
                {plan.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg,#22c55e,#16a34a)",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 16px",
                      borderRadius: 100,
                      letterSpacing: ".06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    BEST VALUE
                  </div>
                )}
                <div
                  style={{
                    marginBottom: 8,
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 15,
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 48,
                      fontWeight: 700,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{ color: "rgba(255,255,255,0.3)", fontSize: 15 }}
                  >
                    {plan.period}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    marginBottom: 32,
                  }}
                >
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 14,
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          background: "rgba(34,197,94,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={12} color="#22c55e" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link
                  href={plan.href}
                  className={plan.featured ? "btn-primary" : "btn-secondary"}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    fontSize: 15,
                  }}
                >
                  Get started <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charities */}
      <section
        style={{
          padding: "80px 40px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div
              style={{
                color: "#22c55e",
                fontSize: 13,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Our partners
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Supporting great causes
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 17,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Choose from our verified charity partners when you sign up.
            </p>
          </div>
          <div
            className="reveal"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            {[
              "Cancer Research UK",
              "British Heart Foundation",
              "Macmillan Cancer Support",
              "Age UK",
              "Save the Children",
            ].map((c) => (
              <div key={c} className="charity-pill">
                <Heart size={14} color="#22c55e" />
                {c}
              </div>
            ))}
          </div>
          <Link
            href="/charities"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View all charities <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Trust bar */}
      <section
        style={{
          padding: "60px 40px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 32,
            textAlign: "center",
          }}
        >
          {[
            {
              icon: <Shield size={22} color="#22c55e" />,
              label: "Stripe secured payments",
            },
            {
              icon: <Users size={22} color="#22c55e" />,
              label: "2,400+ active members",
            },
            {
              icon: <Heart size={22} color="#22c55e" />,
              label: "£30K+ donated to charity",
            },
            {
              icon: <Trophy size={22} color="#22c55e" />,
              label: "Monthly guaranteed draws",
            },
          ].map((t, i) => (
            <div
              key={t.label}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
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
                }}
              >
                {t.icon}
              </div>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          padding: "80px 40px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="reveal"
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            background: "rgba(34,197,94,0.04)",
            border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: 24,
            padding: "64px 40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Ready to play with purpose?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 17,
              marginBottom: 36,
              lineHeight: 1.7,
            }}
          >
            Join thousands of golfers making every round count for a cause they
            care about.
          </p>
          <Link
            href="/signup"
            className="btn-primary"
            style={{ fontSize: 17, padding: "18px 40px" }}
          >
            Join GolfGives today <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BrandLogoLink size={22} />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            © 2026 GolfGives · Play Golf. Change Lives.
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <Link
            href="/charities"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Charities
          </Link>
          <Link
            href="/login"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Join
          </Link>
        </div>
      </footer>
    </main>
  );
}
