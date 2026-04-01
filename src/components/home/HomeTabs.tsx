"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ActivityFeed from "./ActivityFeed";
import TimelineFeed from "./TimelineFeed";

type TabKey = "mine" | "timeline";

type Tab = {
  key: TabKey;
  label: string;
};

const TABS: Tab[] = [
  { key: "mine", label: "自分の投稿" },
  { key: "timeline", label: "タイムライン" },
];

/**
 * ホームタブ切り替え。
 * "自分の投稿" / "タイムライン" の 2 タブを管理する Client Component。
 */
const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("mine");

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
  };

  return (
    <div className="flex flex-col">
      {/* タブバー */}
      <div className="flex border-b border-zinc-800">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={cn(
              "flex-1 py-2.5 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "border-b-2 border-violet-500 text-violet-400"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* フィード */}
      <div className="px-4 py-4">
        {activeTab === "mine" ? <ActivityFeed /> : <TimelineFeed />}
      </div>
    </div>
  );
};

export default HomeTabs;
