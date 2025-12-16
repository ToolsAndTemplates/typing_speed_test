import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TypeMaster - Typing Speed Test",
  description: "Test and improve your typing speed with TypeMaster. Track your WPM, accuracy, and compete with yourself!",
  keywords: ["typing test", "wpm", "typing speed", "typing practice", "keyboard skills"],
  authors: [{ name: "TypeMaster" }],
  openGraph: {
    title: "TypeMaster - Typing Speed Test",
    description: "Test and improve your typing speed",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
