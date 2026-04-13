import type { ReactNode } from "react";

type DetailPanelProps = {
  content?: ReactNode;
  placeholderEmoji?: string;
  placeholderMessage?: string;
};

type DetailPanelPlaceholderProps = {
  emoji: string;
  message?: string;
};

/**
 * DetailPanel 未選択時のプレースホルダー
 */
const DetailPanelPlaceholder = ({ emoji, message }: DetailPanelPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-8 text-center">
      <span className="text-4xl text-zinc-700">{emoji}</span>
      {message && <p className="text-sm text-zinc-600">{message}</p>}
    </div>
  );
};

/**
 * DetailPanel（右カラム詳細パネル）
 * PC 表示時に MainColumn の右側に固定表示される。
 * 中央カラムで選択したアイテムの詳細を表示する。
 * content が渡された場合はそれを表示し、未選択時はプレースホルダーを表示する。
 */
const DetailPanel = ({
  content,
  placeholderEmoji = "🗂️",
  placeholderMessage,
}: DetailPanelProps) => {
  return (
    <aside className="hidden md:flex flex-col w-96 shrink-0 overflow-y-auto h-[calc(100vh-3rem)]">
      {content ?? (
        <DetailPanelPlaceholder emoji={placeholderEmoji} message={placeholderMessage} />
      )}
    </aside>
  );
};

export default DetailPanel;
