import Image from "next/image";
import Link from "next/link";
import { topics } from "@/mocks/topics";
import { currentUser } from "@/mocks/users";

// モックのログインユーザーID
const MY_USER_ID = currentUser.id;

const TopicsPage = () => {
  const myTopics = topics.filter((t) => t.userId === MY_USER_ID);

  return (
    <main className="flex flex-col pb-6">
      {/* ページヘッダー */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm">
        <h1 className="text-base font-bold text-zinc-100">トピック</h1>
      </header>

      <div className="px-4 pt-4">
        {myTopics.length === 0 ? (
          <p className="py-12 text-center text-sm text-zinc-500">
            トピックがありません
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {myTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="flex flex-col overflow-hidden rounded-xl bg-zinc-800/60 transition-colors hover:bg-zinc-700/80 active:bg-zinc-700"
              >
                {/* テーマ画像 or 絵文字フォールバック */}
                {topic.imageUrl ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={topic.imageUrl}
                      alt={topic.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center bg-zinc-700/60">
                    {topic.emoji && (
                      <span className="text-4xl leading-none" aria-hidden="true">
                        {topic.emoji}
                      </span>
                    )}
                  </div>
                )}
                {/* カード本文 */}
                <div className="flex flex-col gap-1 p-3">
                  <div className="flex items-center gap-1.5">
                    {topic.emoji && (
                      <span className="text-base leading-none" aria-hidden="true">
                        {topic.emoji}
                      </span>
                    )}
                    <span className="truncate text-sm font-semibold text-zinc-100">
                      {topic.title}
                    </span>
                  </div>
                  {topic.description && (
                    <span className="line-clamp-2 text-xs text-zinc-400">
                      {topic.description}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default TopicsPage;
