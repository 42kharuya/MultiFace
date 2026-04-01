import HomeTabs from "@/components/home/HomeTabs";
import FAB from "@/components/ui/FAB";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* スティッキーヘッダー */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm">
        <h1 className="text-lg font-bold text-zinc-100">ホーム</h1>
      </header>

      <main>
        <HomeTabs />
      </main>

      <FAB />
    </div>
  );
}
