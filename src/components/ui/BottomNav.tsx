"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "ホーム", icon: "🏠" },
  { href: "/subscriptions", label: "サブスク", icon: "🔔" },
  { href: "/search", label: "検索", icon: "🔍" },
  { href: "/profile", label: "プロフィール", icon: "👤" },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center border-t border-zinc-700/60 bg-zinc-900/95 backdrop-blur-sm">
      <ul className="flex w-full max-w-sm items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors",
                  isActive
                    ? "text-violet-400"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
