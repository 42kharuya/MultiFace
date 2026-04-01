# モック実装フロー

## このモックの目的

**チーム開発の提案プレゼン用**のモックです。  
メンバーが「どんなアプリか」を直感的にイメージできることを最優先とします。

- ✅ 「実際に動いているように見える」完成度を目指す
- ✅ 全画面より**見せたい画面を丁寧に**作る
- ❌ 機能の網羅性・バックエンド実装は不要

仕様の詳細は [`TRICLE.md`](./TRICLE.md) を参照してください。

## プレゼンで見せるべき画面（優先順）

| 優先度 | 画面 | 伝えられること |
|---|---|---|
| 🔴 必須 | **ホーム** | アプリの基本操作感・アクティビティ一覧 |
| 🔴 必須 | **トピック詳細** | Trickle の核心「トピック × アクティビティ」構造 |
| 🟡 推奨 | **プロフィール（振り返りタイル）** | 継続記録という価値・ビジュアルのインパクト |
| 🟡 推奨 | **サブスク** | SNS 的な要素・他ユーザーとの関わり方 |
| 🟢 あれば良い | **検索** | アプリとしての完成感を演出 |

## ステップ概要

```
① プロジェクトセットアップ
      ↓
② 型定義 + モックデータ作成
      ↓
③ 共通 UI コンポーネント + レイアウト
      ↓
④ 画面の実装（優先順に）
      ↓
⑤ 見栄え・細部の仕上げ
```

## ① プロジェクトセットアップ

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
npm install clsx tailwind-merge
```

`src/lib/utils.ts` に `cn()` ユーティリティを追加。

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

- [ ] `npm run dev` でローカルサーバーが起動する
- [ ] Tailwind CSS が適用されている

## ② 型定義 + モックデータ作成

### 型定義 (`src/types/`)

```ts
// user.ts
type User = {
  id: string;
  name: string;
  avatarUrl: string;
  badge?: string;
};

// topic.ts
type Topic = {
  id: string;
  userId: string;
  title: string;
  imageUrl?: string;
};

// activity.ts
type Activity = {
  id: string;
  topicId: string;
  userId: string;
  body: string;
  imageUrls?: string[];
  linkedActivityIds?: string[];
  createdAt: string; // ISO 8601
};
```

### モックデータ (`src/mocks/`)

プレゼンで「リアルに使われている感」を出すためにデータの質にこだわる。

| ファイル | 内容 | 量の目安 |
|---|---|---|
| `users.ts` | 自分（`currentUser`）+ 他ユーザー | 自分 1 人 + 他 3〜4 人 |
| `topics.ts` | 各ユーザーのトピック | 各ユーザー 3〜5 個 |
| `activities.ts` | 各トピックの投稿 | 各トピック 5〜10 件 |

**データ作成のコツ**:
- アクティビティの内容は「実際に書きそうなこと」を使う（「読書感想」「今日の料理」など）
- `createdAt` は過去 3 ヶ月程度に分散させる（振り返りタイルを映えさせるため）
- 画像は [picsum.photos](https://picsum.photos/) 等のプレースホルダーを活用

## ③ 共通 UI コンポーネント + レイアウト

### 共通コンポーネント (`src/components/ui/`)

先に共通部品を作っておくと、各画面の実装が速くなる。

| コンポーネント | 用途 | プレゼンへの貢献 |
|---|---|---|
| `Avatar.tsx` | ユーザーアイコン | 人感・SNS っぽさ |
| `Badge.tsx` | ユーザー名横のバッジ絵文字 | Trickle 独自の個性 |
| `ActivityCard.tsx` | アクティビティ 1 件の表示 | 最も目に触れる部品 |
| `TopicChip.tsx` | トピック名のカラーラベル | 構造の理解を助ける |
| `BottomNav.tsx` | 下部タブナビゲーション | スマホアプリ感の演出 |

### レイアウト (`src/app/layout.tsx`)

全画面共通で `BottomNav` を表示する。スマホ幅（`max-w-sm`）で中央揃えにするとモバイルアプリらしく見える。

```
┌─────────────────────┐
│       Header        │
├─────────────────────┤
│                     │
│      画面コンテンツ   │
│                     │
├─────────────────────┤
│  🏠   🔔   🔍   👤  │  ← BottomNav
└─────────────────────┘
```

## ④ 画面の実装（優先順）

### 🔴 画面 1: ホーム（最優先）

**パス**: `/`  
**内容**: 自分が書いたアクティビティの時系列フィード

```
src/app/page.tsx
src/components/home/
├── ActivityFeed.tsx        # フィード全体
└── ActivityCard.tsx        # 1 件分（ui/ の ActivityCard を利用）
```

**プレゼンで伝えること**: 「トピックごとに整理された自分だけのフィード」

**実装ポイント**:
- 各アクティビティにトピック名（カラーチップ）を添える
- 200 文字超は折りたたみ、「もっと見る」ボタンで展開
- 画像があればサムネイル表示

### 🔴 画面 2: トピック詳細（最優先）

**パス**: `/topics/[topicId]`  
**内容**: 特定トピック内のアクティビティ一覧

```
src/app/topics/[topicId]/page.tsx
src/components/topic/
├── TopicHeader.tsx         # トピック名・説明・サブスクボタン
└── TopicActivityFeed.tsx   # そのトピックの投稿一覧
```

**プレゼンで伝えること**: Trickle の核心「トピックという単位でカテゴリ管理する」体験

**実装ポイント**:
- トピック名・アイコンをヘッダーに大きく表示
- モックなので「サブスクする」ボタンは見た目だけ実装でよい

### 🟡 画面 3: プロフィール（推奨）

**パス**: `/profile`  
**内容**: 自分のトピック一覧 + 振り返りタイル

```
src/app/profile/page.tsx
src/components/profile/
├── UserInfo.tsx              # アイコン・名前・バッジ
├── TopicList.tsx             # トピック一覧グリッド
└── ActivityTileCalendar.tsx  # 振り返りタイル（GitHub 風）
```

**プレゼンで伝えること**: 「継続して書き留めることの楽しさ・記録としての価値」

**実装ポイント**:
- タイルは過去 52 週分を表示
- 投稿数に応じて 5 段階で色を変える（`bg-green-100` 〜 `bg-green-700`）
- このタイルが映えると Trickle の魅力をひと目で伝えられる

### 🟡 画面 4: サブスク（推奨）

**パス**: `/subscriptions`  
**内容**: サブスクライブ中のトピックのフィード

```
src/app/subscriptions/page.tsx
src/components/subscriptions/
└── SubscriptionFeed.tsx
```

**プレゼンで伝えること**: 「人をフォローするのではなく、トピック単位で興味を管理する」

**実装ポイント**:
- 投稿者のアイコン・名前・トピック名を必ず表示（誰の何のトピックかわかるように）

### 🟢 画面 5: 検索（あれば良い）

**パス**: `/search`  
**内容**: キーワード検索

```
src/app/search/page.tsx
src/components/search/
├── SearchBar.tsx
├── SearchScopeSelector.tsx   # 「全体 / 自分 / サブスク」切り替え
└── SearchResults.tsx
```

**実装ポイント**:
- `String.includes()` でモックデータから部分一致絞り込み
- スコープ切り替えを UI に出すだけでも「ちゃんとしてる感」が出る

## ⑤ 見栄え・細部の仕上げ

画面が揃ったら、プレゼンの印象を上げるために以下を調整する。

### チェックリスト

- [ ] **スマホ幅に収める**: `max-w-sm mx-auto` でモバイルアプリらしい縦長レイアウトに
- [ ] **カラーテーマを整える**: テーマカラーを 1 色決めて統一感を出す（Trickle はダークテーマが印象的）
- [ ] **アイコン・絵文字を活用**: トピックのアイコンに絵文字を使うと一気にそれらしくなる
- [ ] **アニメーション**: `transition` や `hover:` をカードに付けるだけで動的な印象になる
- [ ] **スクロールが自然に動くか確認**: 発表中に詰まらないことを確認

### やりすぎない判断基準

> 「プレゼン相手がそれを見て Trickle のことを理解できるか？」

理解に不要な細部（検索の高度な機能、設定画面など）は実装しない。
