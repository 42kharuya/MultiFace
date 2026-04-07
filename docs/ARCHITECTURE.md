# 設計

## 全体像

```
├── docker-compose.yml
├── nginx/
│   └── default.conf           # リバースプロキシ設定
├── frontend/                  # Next.js (BFF含む)
│   ├── Dockerfile
│   └── ...
├── backend/                   # Hono (モノリス)
│   ├── Dockerfile
│   ├── src/
│   │   ├── index.ts           # エントリポイント（各サービスを結合）
│   │   ├── lib/               # 共通ライブラリ（DBクライアント等）
│   │   └── services/          # ドメインごとの実装
│   │       ├── auth/
│   │       │   ├── index.ts   # ルーティング定義
│   │       │   └── logic.ts   # ビジネスロジック
│   │       ├── post/
│   │       │   ├── index.ts
│   │       │   └── logic.ts
│   │       └── social/
│   │           ├── index.ts
│   │           └── logic.ts
│   └── package.json
└── db/                        # (必要に応じて) 初期化SQLなど
```

## バックエンド設計

```
backend/
├── src/
│   ├── index.ts                # 全ルートの結合・Hono RPC型定義のexport
│   │
│   ├── features/               # 【垂直分割】各ドメインの「部品」
│   │   ├── auth/
│   │   │   ├── auth.entity.ts      # バリデーション論理・エンティティ
│   │   │   ├── auth.repository.ts  # IAuthRepository (Interface)
│   │   │   ├── auth.usecase.ts     # 単一ドメインのビジネスロジック
│   │   │   └── auth.handler.ts     # 認証単体のAPI（login, register等）
│   │   ├── post/
│   │   │   ├── post.entity.ts
│   │   │   ├── post.repository.ts
│   │   │   ├── post.usecase.ts
│   │   │   └── post.handler.ts     # 投稿単体のAPI（作成、削除等）
│   │   └── social/
│   │       ├── social.entity.ts
│   │       ├── social.repository.ts
│   │       ├── social.usecase.ts
│   │       └── social.handler.ts   # 関係性単体のAPI（フォロー、ブロック等）
│   │
│   ├── services/               # 【横断・統合】複数Featureを跨ぐ「シナリオ」
│   │   ├── feed/
│   │   │   ├── feed.usecase.ts     # PostとSocialを組み合わせてタイムラインを生成
│   │   │   └── feed.handler.ts     # タイムライン取得用のAPI
│   │   └── user-profile/
│   │       ├── profile.usecase.ts  # Auth(ユーザー情報)とPost(投稿一覧)を統合
│   │       └── profile.handler.ts  # プロフィール画面用のAPI
│   │
│   ├── infrastructure/         # 【具象実装】外部ライブラリ・DBへの依存
│   │   ├── db/
│   │   │   ├── drizzle.ts          # DB接続クライアント設定
│   │   │   └── schema.ts           # Drizzle(MariaDB)のテーブル定義
│   │   └── repositories/           # features/ で定義した Interface の実体
│   │       ├── drizzle-auth.repo.ts
│   │       ├── drizzle-post.repo.ts
│   │       └── drizzle-social.repo.ts
│   │
│   ├── shared/                 # 【共通】全レイヤーで共有するリソース
│   │   ├── middleware/             # 認証ガード、ログ、CORS設定
│   │   ├── types/                  # 共通の型定義
│   │   └── utils/                  # 共通のユーティリティ
│   │
│   └── lib/                    # サードパーティ製ライブラリのラッパー等
│
├── Dockerfile                  # 本番用 (Multi-stage build)
├── docker-compose.yml          # 開発用 (Nginx, MariaDB, Next.jsとの連携)
└── package.json
```
