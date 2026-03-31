import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">⛳ GolfGives</div>
          <div className="flex gap-4">
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">
              Login
            </Link>
            <Link href="/signup" className="btn-primary text-sm py-2 px-4">
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-2 rounded-full mb-6">
            🏆 Monthly Prize Draws · ❤️ Charity Impact · ⛳ Golf Tracking
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Play Golf.
            <br />
            <span className="gradient-text">Change Lives.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Track your Stableford scores, enter monthly prize draws, and
            automatically donate to the charity you love — all in one platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Start for £9.99/month →
            </Link>
            <Link
              href="#how-it-works"
              className="btn-secondary text-lg px-8 py-4"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "£50K+", label: "Prize Pool Distributed" },
            { value: "2,400+", label: "Active Members" },
            { value: "12", label: "Charity Partners" },
            { value: "£30K+", label: "Donated to Charity" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">How it works</h2>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
            Three simple steps to play, win, and give back.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Subscribe & Choose",
                desc: "Pick a monthly or yearly plan. Select the charity closest to your heart from our verified directory.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Enter Your Scores",
                desc: "Log your last 5 Stableford scores after each round. Your numbers are used to generate your monthly draw entry.",
                icon: "⛳",
              },
              {
                step: "03",
                title: "Win & Give",
                desc: "Match 3, 4, or all 5 numbers in the monthly draw to win prizes. A portion of every subscription goes to your charity.",
                icon: "❤️",
              },
            ].map((item) => (
              <div key={item.step} className="card p-8 relative">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-green-500 text-sm font-mono mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool */}
      <section className="py-24 px-6 bg-white/2">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Prize Pool Breakdown
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Every subscription contributes to real cash prizes.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                match: "5-Number Match",
                share: "40%",
                color: "green",
                note: "Jackpot — rolls over if unclaimed",
              },
              {
                match: "4-Number Match",
                share: "35%",
                color: "blue",
                note: "Split equally among winners",
              },
              {
                match: "3-Number Match",
                share: "25%",
                color: "purple",
                note: "Split equally among winners",
              },
            ].map((tier) => (
              <div key={tier.match} className="card p-8 text-center">
                <div
                  className={`text-5xl font-bold mb-2 ${
                    tier.color === "green"
                      ? "text-green-400"
                      : tier.color === "blue"
                        ? "text-blue-400"
                        : "text-purple-400"
                  }`}
                >
                  {tier.share}
                </div>
                <div className="text-white font-semibold mb-2">
                  {tier.match}
                </div>
                <div className="text-gray-500 text-sm">{tier.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Simple Pricing
          </h2>
          <p className="text-gray-400 text-center mb-16">
            No hidden fees. Cancel anytime.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Monthly",
                price: "£9.99",
                period: "/month",
                features: [
                  "Monthly prize draw entry",
                  "Score tracking (5 scores)",
                  "Charity contribution (min 10%)",
                  "Winner dashboard",
                ],
                href: "/signup?plan=monthly",
                featured: false,
              },
              {
                name: "Yearly",
                price: "£99.99",
                period: "/year",
                features: [
                  "Everything in Monthly",
                  "2 months free",
                  "Priority winner verification",
                  "Early draw notifications",
                ],
                href: "/signup?plan=yearly",
                featured: true,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`card p-8 ${plan.featured ? "border-green-500/50 relative" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <div className="text-gray-400 mb-2">{plan.name}</div>
                <div className="text-4xl font-bold mb-1">
                  {plan.price}
                  <span className="text-lg text-gray-400">{plan.period}</span>
                </div>
                <ul className="my-6 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                    >
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center ${plan.featured ? "btn-primary" : "btn-secondary"} w-full`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charities */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Supporting Great Causes</h2>
          <p className="text-gray-400 mb-12">
            Choose from our verified charity partners at signup.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Cancer Research UK",
              "British Heart Foundation",
              "Macmillan Cancer Support",
              "Age UK",
              "Save the Children",
            ].map((c) => (
              <div key={c} className="card px-6 py-3 text-gray-300 text-sm">
                ❤️ {c}
              </div>
            ))}
          </div>
          <Link
            href="/charities"
            className="inline-block mt-8 text-green-400 hover:text-green-300 transition"
          >
            View all charities →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center card p-12 border-green-500/20">
          <h2 className="text-4xl font-bold mb-4">
            Ready to play with purpose?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of golfers making every round count.
          </p>
          <Link href="/signup" className="btn-primary text-lg px-10 py-4">
            Join GolfGives Today →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-gray-600 text-sm">
        © 2026 GolfGives · Built with purpose ·{" "}
        <Link href="/charities" className="hover:text-gray-400">
          Charities
        </Link>
      </footer>
    </main>
  );
}
