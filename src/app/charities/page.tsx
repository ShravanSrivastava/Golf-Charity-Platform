"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Heart, ExternalLink, Star } from "lucide-react";

type Charity = {
  id: string;
  name: string;
  description: string;
  website_url: string;
  is_featured: boolean;
};

export default function CharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("charities")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false });
      setCharities(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = charities.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()),
  );

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
        .charity-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;transition:all .3s;cursor:default;}
        .charity-card:hover{background:rgba(34,197,94,0.04);border-color:rgba(34,197,94,0.25);transform:translateY(-4px);}
        .charity-card.featured{border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.04);}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 18px;color:#fff;font-size:15px;font-family:inherit;outline:none;transition:all .2s;box-sizing:border-box;}
        .inp:focus{border-color:rgba(34,197,94,0.5);}
        .inp::placeholder{color:rgba(255,255,255,0.2);}
      `}</style>

      <Navbar />

      {/* Hero */}
      <section
        style={{
          padding: "140px 40px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(34,197,94,0.1) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="fade"
          style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Heart size={28} color="#22c55e" />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 700,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Our Charity <em style={{ color: "#22c55e" }}>Partners</em>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Every GolfGives subscription automatically donates to your chosen
            charity. Browse our verified partners below.
          </p>
          <input
            className="inp"
            placeholder="Search charities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 400, margin: "0 auto", display: "block" }}
          />
        </div>
      </section>

      {/* Charities grid */}
      <section style={{ padding: "0 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Loading charities...
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              No charities found.
            </div>
          ) : (
            <>
              {/* Featured */}
              {filtered.some((c) => c.is_featured) && (
                <div style={{ marginBottom: 48 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 24,
                    }}
                  >
                    <Star size={16} color="#fbbf24" />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 13,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Featured charities
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill,minmax(300px,1fr))",
                      gap: 20,
                    }}
                  >
                    {filtered
                      .filter((c) => c.is_featured)
                      .map((c, i) => (
                        <CharityCard
                          key={c.id}
                          charity={c}
                          index={i}
                          featured
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* All */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  <Heart size={16} color="#22c55e" />
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 13,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    All charities
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                    gap: 20,
                  }}
                >
                  {filtered
                    .filter((c) => !c.is_featured)
                    .map((c, i) => (
                      <CharityCard key={c.id} charity={c} index={i} />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 40px 80px" }}>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "center",
            background: "rgba(34,197,94,0.04)",
            border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: 24,
            padding: "52px 40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Ready to give back?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 16,
              marginBottom: 32,
              lineHeight: 1.7,
            }}
          >
            Join GolfGives and start supporting your chosen charity with every
            subscription.
          </p>
          <a
            href="/signup"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              color: "#fff",
              padding: "15px 32px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
              transition: "all .2s",
            }}
          >
            <Heart size={18} /> Join GolfGives
          </a>
        </div>
      </section>
    </main>
  );
}

function CharityCard({
  charity,
  index,
  featured,
}: {
  charity: Charity;
  index: number;
  featured?: boolean;
}) {
  return (
    <div
      className={`charity-card ${featured ? "featured" : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Heart size={22} color="#22c55e" />
        </div>
        {featured && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(234,179,8,0.1)",
              border: "1px solid rgba(234,179,8,0.2)",
              borderRadius: 100,
              padding: "4px 10px",
            }}
          >
            <Star size={11} color="#fbbf24" />
            <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 600 }}>
              Featured
            </span>
          </div>
        )}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
        {charity.name}
      </h3>
      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 20,
          minHeight: 48,
        }}
      >
        {charity.description || "Supporting important causes across the UK."}
      </p>
      {charity.website_url && (
        <a
          href={charity.website_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "#22c55e",
            fontSize: 13,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Visit website <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}
