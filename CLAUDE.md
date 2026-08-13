# CLAUDE.md

Next.js (App Router) + SQLite (`node:sqlite`) の TODO アプリ。
オニオンアーキテクチャと Atomic Design で構成する。

## コマンド

```bash
npm run dev     # 開発サーバー (http://localhost:3000)
npm test        # vitest（domain / application のみ）
npm run build   # 本番ビルド（型チェックを兼ねる）
```

## レイヤ構成

依存は常に内向き。外側の層を内側から import しない。

```
domain          … エンティティ・値オブジェクト・リポジトリの契約。他層に依存しない
application     … ユースケース。domain のみに依存する
infrastructure  … リポジトリ実装（SQLite / インメモリ）・ID 採番
presentation    … React コンポーネント（Atomic Design）。TodoDto のみ受け取る
app             … Next.js のページと Server Action
di/container.ts … コンポジションルート。実装の結線はここだけで行う
```

- ドメインのエンティティ・値オブジェクトは `private constructor` + 静的ファクトリ、不変。状態変更は新しいインスタンスを返す。
- ルール違反は `domain/todo/errors.ts` の `DomainError` 派生を throw する。
- ユースケースはクラスで、依存はコンストラクタ注入。公開メソッドは `execute` のみ。
- presentation にエンティティを渡さない。`application/todo/todo-dto.ts` の `TodoDto` に詰め替える。
- SQL は `infrastructure/persistence/sqlite/` の外に書かない。
- コンポーネントは Server Component のまま、更新は `<form action={...}>` と Server Action で行う。Server Action は props（`FormAction` 型）で受け取り、コンポーネントは結線先を知らない。
- スタイルは CSS Modules（コンポーネントと同じ名前の `.module.css`）。

## 機能を追加するときの順番

1. `domain` … 必要ならエンティティ・リポジトリの契約を拡張する
2. `infrastructure` … `TodoRepository` の全実装（SQLite / インメモリ）を追従させる
3. `application` … ユースケースを 1 クラス追加し、テストも書く
4. `di/container.ts` … 結線する
5. `app/actions.ts` … Server Action を足す（`run()` を通す）
6. `presentation` … atoms → molecules → organisms → templates の粒度に合わせて配置し、`app/page.tsx` から渡す

## テスト

- 対象は `domain` と `application` のみ。UI とインフラのテストは書かない。
- ユースケースのテストは `InMemoryTodoRepository` を使う。モックライブラリは使わない。
- テストは対象ファイルの隣に `*.test.ts` で置く。`describe` はクラス名、`it` は日本語で振る舞いを書く。
- 正常系と、そのユースケース固有の異常系（見つからない・入力が不正）を押さえる程度に留める。

## 進め方

- 既存の書き方に合わせることを最優先する。新しいライブラリやパターンは持ち込まない。
- 過剰な実装をしない。依頼されていない抽象化・設定・エラー処理を足さない。
- 依頼内容に不備や判断が必要な点があれば、手を止めて確認する。
- 実装後は `npm test` と `npm run build` を通し、`npm run dev` で実際に動作確認する。
- コメントは日本語で、意図が読み取れない箇所にだけ書く。
