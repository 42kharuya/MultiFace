"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bell,
  Search,
  User,
  Layers,
  Pencil,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PostModal from "@/components/ui/PostModal";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/subscriptions", label: "サブスク", icon: Bell },
  { href: "/topics", label: "トピック", icon: Layers },
  { href: "/search", label: "検索", icon: Search },
  { href: "/profile", label: "プロフィール", icon: User },
];

const SideNav = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="hidden md:flex flex-col gap-2 w-56 shrink-0 sticky top-0 h-screen pt-6 pb-6 px-3">
        {/* ロゴ・アプリ名 */}
        <div className="px-3 pb-4">
          <span className="text-xl font-bold text-violet-400 tracking-tight">
            Tricle_Mock
          </span>
        </div>

        {/* ナビゲーションアイテム */}
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-violet-500/20 text-violet-400"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
                  )}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn(
                      "shrink-0 transition-all duration-200",
                      isActive && "[&>*]:fill-current",
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 投稿ボタン */}
        <div className="mt-4 px-1">
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 active:scale-95 active:bg-violet-700"
          >
            <Pencil size={16} strokeWidth={2.5} />
            <span>投稿する</span>
          </button>
        </div>
      </nav>

      <PostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default SideNav;
