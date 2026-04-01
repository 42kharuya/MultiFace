import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/ui/BottomNav";
import SideNav from "@/components/ui/SideNav";

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
      className={`${geistSans.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        {/* PC: SideNav + メインコンテンツの2カラム、モバイル: max-w-sm 中央寄せ */}
        <div className="mx-auto max-w-sm md:max-w-4xl flex min-h-screen">
          <SideNav />
          <main className="flex-1 min-w-0 pb-16 md:pb-0 md:border-x md:border-zinc-800">
            {children}
          </main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
