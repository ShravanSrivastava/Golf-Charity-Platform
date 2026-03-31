import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GolfGives — Play Golf. Change Lives.",
  description:
    "Track your golf scores, enter monthly prize draws, and support your favourite charity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
