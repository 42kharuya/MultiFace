import Link from "next/link";
import { type Topic } from "@/types/topic";

type TopicListProps = {
  topics: Topic[];
};

const TopicList = ({ topics }: TopicListProps) => {
  return (
    <section className="px-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        トピック
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.id}`}
            className="flex items-center gap-2.5 rounded-xl bg-zinc-800/60 p-3.5 transition-colors hover:bg-zinc-700/80 active:bg-zinc-700"
          >
            {/* 絵文字アイコン */}
            {topic.emoji && (
              <span className="text-2xl leading-none flex-shrink-0" aria-hidden="true">
                {topic.emoji}
              </span>
            )}
            {/* タイトル */}
            <span className="truncate text-sm font-medium text-zinc-100">
              {topic.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopicList;
