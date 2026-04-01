import Image from "next/image";
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
            className="flex items-center gap-2.5 overflow-hidden rounded-xl bg-zinc-800/60 p-3.5 transition-colors hover:bg-zinc-700/80 active:bg-zinc-700"
          >
            {/* 画像サムネイル or 絵文字アイコン */}
            {topic.imageUrl ? (
              <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={topic.imageUrl}
                  alt={topic.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            ) : (
              topic.emoji && (
                <span className="flex-shrink-0 text-2xl leading-none" aria-hidden="true">
                  {topic.emoji}
                </span>
              )
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
