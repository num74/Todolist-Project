# シンプルなTodoアプリ

Express.js、PostgreSQL、および EJSを使用して構築されたシンプルなtodoアプリです。"Today" および "This Week" としてカテゴリ分けされた todo アイテムを追加、編集、削除することができます。

## セットアップ

### 1. クローン：

git clone https://github.com/num74/Todolist-Project.git

### 2. 依存関係をインストール：

cd Todolist-Project<br>
npm install


### 3. PostgreSQL データベースをセットアップします：

PostgreSQL データベースを作成します。
プロジェクトのルートディレクトリに .env ファイルを作成し、次の環境変数を定義します：

PGUSER=ユーザーネーム<br>
PGHOST=ホスト名<br>
PGDATABASE=データベース名<br>
PGPASS=パスワード<br>
PGPORT=ポート<br>

### 4. アプリケーションを実行：

npm start

## 使用方法
ウェブブラウザで http://localhost:3000 に移動します。<br>
今日と今週のための todo アイテムを追加することができます。<br>
今日と今週のための todo アイテムは別々に表示されます。<br>
todo アイテムをクリックしてタイトルを編集できます。<br>
チェックマークをクリックして todo アイテムを削除できます。<br>

## 依存関係
Express.js<br>
EJS<br>
Body-parser<br>
pg<br>
dotenv<br>
Axios<br>

