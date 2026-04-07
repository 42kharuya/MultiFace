# Copilot Instructions

## プロジェクト概要

このプロジェクトは、SNS アプリ「**MultiFace**」のフロントエンドモック実装です。
Tricle というアプリをベースに発展させた新しいサービスで、「フェイス（多面性）」という概念を中心に据えています。

将来的には `docs/ARCHITECTURE.md` に記載された Hono バックエンドと統合する予定のため、**バックエンド統合時に差し替えやすい設計**を意識して実装します。

仕様・設計は以下のドキュメントを参照してください。実装前に必ず確認し、仕様と齟齬がないか確認してください。

| ドキュメント | 内容 |
|---|---|
| [`docs/MULTI_FACE.md`](../docs/MULTI_FACE.md) | MultiFace の仕様（主要概念・画面構成・機能一覧） |
| [`docs/FRONTEND_ARCHITECTURE.md`](../docs/FRONTEND_ARCHITECTURE.md) | フロントエンド設計方針（Repository パターン・ディレクトリ構成など） |
| [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) | バックエンド統合時の設計方針（Hono バックエンドとの統合） |
| [`docs/TRICLE.md`](../docs/TRICLE.md) | 元となった Tricle の仕様（参考） |

## 技術スタック

| 項目 | 採用技術 |
|---|---|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| パッケージマネージャ | npm |

## 実装方針

### バックエンドなし・モックデータで動作させる（ただし統合を見据えた設計で）

- API 通信は実装しない
- データはすべてモック（`src/mocks/` 以下に定義）で賄う
- `fetch` や `axios` は使用しない
- サーバーアクション・API Routes も原則使用しない
- **コンポーネントから `src/mocks/` を直接 import しない**。必ず `src/repositories/` 経由でデータを取得する（将来の API 差し替えを容易にするため）

### Repository パターンを遵守する

- `src/repositories/` 以下に各ドメインのデータ取得ロジックを定義する
- Repository の型（インターフェース）を先に定義し、モック実装を後から差し込む形にする
- 詳細は [`docs/FRONTEND_ARCHITECTURE.md`](../docs/FRONTEND_ARCHITECTURE.md) を参照

### MultiFace の UI 実装を最優先する

- `docs/MULTI_FACE.md` の仕様に忠実に実装することを目指す
- 仕様が不明な箇所はユーザーに確認してから実装する
- デザインの細部（余白、フォントサイズ、色）を丁寧に作り込む
- 命名は MultiFace の用語（`face` / `faceId`）を使い、Tricle の用語（`topic` / `topicId`）は段階的に移行する

### コンポーネント設計

- コンポーネントは `src/components/` に配置する
- ページごとのコンポーネントは `src/components/<ページ名>/` に配置する
- 共通コンポーネントは `src/components/ui/` に配置する
- Props の型定義は各コンポーネントファイル内に記述する

## コーディング規約

### TypeScript

- `any` 型の使用は禁止。不明な型は `unknown` を使う
- 型定義は `src/types/` に集約する
- `interface` より `type` を優先する

### React / Next.js

- Client Component は必要最小限にする（`"use client"` 指令は慎重に付与）
- イベントハンドラの命名は `handle〇〇` とする（例: `handleClick`）
- コンポーネントはアロー関数で定義する

```tsx
// Good
const MyComponent = () => {
  return <div />;
};

export default MyComponent;
```

### Tailwind CSS

- インラインスタイル（`style` 属性）は使用しない
- クラス名が長くなる場合は `cn()` ユーティリティ（`clsx` + `tailwind-merge`）を使う
- レスポンシブは基本的にモバイルファーストで記述する

### ファイル・ディレクトリ命名

- コンポーネントファイル: PascalCase（例: `UserCard.tsx`）
- それ以外のファイル: kebab-case（例: `mock-data.ts`）
- ディレクトリ: kebab-case（例: `user-profile/`）

## ディレクトリ構成

```
src/
├── app/                  # Next.js App Router ページ
├── components/
│   ├── ui/               # 汎用 UI コンポーネント
│   └── <feature>/        # 機能別コンポーネント
├── repositories/         # ★ データ取得レイヤー（mocks/ の直接 import 禁止）
├── mocks/                # モックデータ（repositories/ からのみ参照する）
├── types/                # 型定義
└── lib/                  # ユーティリティ関数
```

詳細なディレクトリ構成は [`docs/FRONTEND_ARCHITECTURE.md`](../docs/FRONTEND_ARCHITECTURE.md) を参照。

## AI への指示

- 実装の前に `docs/MULTI_FACE.md` を確認し、MultiFace の仕様に沿った実装をする
- フロントエンドの設計方針は `docs/FRONTEND_ARCHITECTURE.md` を参照する
- 仕様に記載がない UI の詳細はユーザーに確認する
- **`src/mocks/` をコンポーネントや `page.tsx` から直接 import するコードを書かない**。`src/repositories/` 経由を徹底する
- Tricle の命名（`Topic`・`topicId`）ではなく MultiFace の命名（`Face`・`faceId`）を使う
- バックエンド処理・API・DB に関する実装は提案・実装しない
- コードの説明は日本語で行う
- コミットメッセージは日本語で提案する
