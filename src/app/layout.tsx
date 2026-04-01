import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/ui/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tricle",
  description: "アクティビティ記録サービス Tricle のモック",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        {/* スマホ幅に固定してモバイルアプリらしいレイアウトに */}
        <div className="mx-auto max-w-sm min-h-screen pb-16">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
