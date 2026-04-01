"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, Search, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/subscriptions", label: "サブスク", icon: Bell },
  { href: "/search", label: "検索", icon: Search },
  { href: "/profile", label: "プロフィール", icon: User },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center border-t border-zinc-700/60 bg-zinc-900/95 backdrop-blur-sm">
      <ul className="flex w-full max-w-sm items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center py-2 transition-colors duration-200",
                  isActive
                    ? "text-violet-400"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                {/* アクティブインジケーター：背景ピル */}
                <span
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-xl px-5 py-1.5 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-violet-500/20"
                      : "bg-transparent",
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn(
                      "transition-all duration-200",
                      isActive && "[&>*]:fill-current",
                    )}
                  />
                  <span className="transition-all duration-200">
                    {item.label}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
