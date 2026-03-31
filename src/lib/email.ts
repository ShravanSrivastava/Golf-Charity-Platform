import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: "GolfGives <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to GolfGives! ⛳",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:40px 20px;background:#080c08;color:#fff;">
        <h1 style="color:#22c55e;font-size:28px;">Welcome to GolfGives, ${name}! ⛳</h1>
        <p style="color:#aaa;line-height:1.7;">You're now part of a community of golfers making every round count for charity.</p>
        <h3 style="color:#fff;">What's next?</h3>
        <ul style="color:#aaa;line-height:2;">
          <li>Add your first 5 Stableford scores</li>
          <li>Select your charity</li>
          <li>Enter the monthly prize draw</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;background:#22c55e;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:20px;">
          Go to Dashboard →
        </a>
        <p style="color:#555;font-size:12px;margin-top:40px;">GolfGives · Play Golf. Change Lives.</p>
      </div>
    `,
  });
}

export async function sendDrawResultEmail(
  email: string,
  name: string,
  winningNumbers: number[],
  userNumbers: number[],
  matchCount: number,
  prize: number,
) {
  const isWinner = matchCount >= 3;
  await resend.emails.send({
    from: "GolfGives <onboarding@resend.dev>",
    to: email,
    subject: isWinner
      ? `🏆 You won £${prize} in the GolfGives draw!`
      : "🎰 This month's GolfGives draw results",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:40px 20px;background:#080c08;color:#fff;">
        <h1 style="color:${isWinner ? "#22c55e" : "#fff"};font-size:28px;">
          ${isWinner ? `🏆 You won £${prize}!` : "🎰 Draw Results"}
        </h1>
        <p style="color:#aaa;">Hi ${name}, here are this month's draw results:</p>
        <div style="background:#111;padding:20px;border-radius:12px;margin:20px 0;">
          <p style="color:#aaa;font-size:13px;margin-bottom:8px;">Winning numbers:</p>
          <div style="display:flex;gap:8px;">
            ${winningNumbers.map((n) => `<span style="background:#22c55e22;border:1px solid #22c55e44;color:#22c55e;width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;">${n}</span>`).join("")}
          </div>
          <p style="color:#aaa;font-size:13px;margin:16px 0 8px;">Your numbers:</p>
          <div style="display:flex;gap:8px;">
            ${userNumbers.map((n) => `<span style="background:#ffffff11;border:1px solid #ffffff22;color:#fff;width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;">${n}</span>`).join("")}
          </div>
        </div>
        ${isWinner ? `<p style="color:#22c55e;font-weight:600;">You matched ${matchCount} numbers and won £${prize}! Log in to verify your win.</p>` : `<p style="color:#aaa;">You matched ${matchCount} number${matchCount === 1 ? "" : "s"} this month. Keep playing!</p>`}
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;background:#22c55e;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:20px;">
          View Dashboard →
        </a>
      </div>
    `,
  });
}
