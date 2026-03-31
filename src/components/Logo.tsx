import Link from "next/link";

export function GolfLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flag on pole */}
      <line
        x1="16"
        y1="4"
        x2="16"
        y2="26"
        stroke="#22c55e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Flag triangle */}
      <path d="M16 4 L26 9 L16 14 Z" fill="#22c55e" />
      {/* Golf hole circle */}
      <ellipse
        cx="16"
        cy="27"
        rx="6"
        ry="2"
        fill="rgba(34,197,94,0.2)"
        stroke="#22c55e"
        strokeWidth="1.2"
      />
      {/* Golf ball */}
      <circle
        cx="7"
        cy="24"
        r="3.5"
        fill="white"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.5"
      />
      {/* Ball dimples */}
      <circle cx="6" cy="23" r="0.6" fill="rgba(0,0,0,0.15)" />
      <circle cx="8.2" cy="23.5" r="0.6" fill="rgba(0,0,0,0.15)" />
      <circle cx="6.8" cy="25.2" r="0.6" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

export function BrandLogo({ size = 28 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <GolfLogo size={size} />
      <span
        style={{
          fontSize: size * 0.75,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-.02em",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        Golf<span style={{ color: "#22c55e" }}>Gives</span>
      </span>
    </div>
  );
}

export function BrandLogoLink({ size = 28 }: { size?: number }) {
  return (
    <Link href="/" style={{ textDecoration: "none", display: "inline-flex" }}>
      <BrandLogo size={size} />
    </Link>
  );
}
