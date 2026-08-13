# TODO アプリ

Next.js (App Router) + SQLite (`node:sqlite`) の TODO アプリ。

## 必要なもの

- Node.js 22.5 以上（`node:sqlite` を使用）

## セットアップ

```bash
npm install
```

## 開発環境の実行

```bash
npm run dev
```

http://localhost:3000 を開く。

## その他のコマンド

```bash
npm test        # テスト（ドメイン・ユースケース）
npm run build   # 本番ビルド
npm start       # ビルド結果を起動
```

## データベース

SQLite のファイルを `data/todos.db` に置く。初回起動時にディレクトリとテーブルを自動作成する。
中身を初期化したいときはファイルを削除して起動し直す。

```bash
rm -f data/todos.db*
```
