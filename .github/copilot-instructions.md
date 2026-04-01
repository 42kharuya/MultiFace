# Copilot Instructions

## プロジェクト概要

このプロジェクトは、サービス終了した SNS アプリ「Tricle」の UI モック実装です。
バックエンドは実装せず、フロントエンドの見た目・操作感の再現に集中します。

Tricle の UI 仕様・機能詳細は [`docs/TRICLE.md`](../docs/TRICLE.md) に随時追記されます。
実装前に必ず参照し、仕様と齟齬がないか確認してください。

## 技術スタック

| 項目 | 採用技術 |
|---|---|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| パッケージマネージャ | npm |

## 実装方針

### バックエンドなし・モックデータで動作させる

- API 通信は実装しない
- データはすべてモック（`src/mocks/` 以下に定義）で賄う
- `fetch` や `axios` は使用しない
- サーバーアクション・API Routes も原則使用しない

### UI 再現を最優先する

- Tricle の実際の UI に忠実に再現することを目指す
- 仕様が不明な箇所はユーザーに確認してから実装する
- デザインの細部（余白、フォントサイズ、色）を丁寧に作り込む

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
├── mocks/                # モックデータ
├── types/                # 型定義
└── lib/                  # ユーティリティ関数
```

## AI への指示

- 実装の前に `docs/TRICLE.md` を確認し、仕様に沿った実装をする
- 仕様に記載がない UI の詳細はユーザーに確認する
- バックエンド処理・API・DB に関する実装は提案・実装しない
- コードの説明は日本語で行う
- コミットメッセージは日本語で提案する
