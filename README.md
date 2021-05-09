# E-commerce-Website-with-Django-Vue

E-commerce-website の作成をバックエンドは Django、フロントエンドは TypeScript を使用して Vue で作成。

使用言語:

- Python
- TypeScript

# DEMO

https://できたら公開.com/

# Features

Vue2 系で書かれているプロジェクトが多い中、昨年リリースされた Vue3 で作られたプロジェクトが非常に少ないです。
Vue3.x で導入された Composition Api の仕組みは今後 Vue で主流になっていくと公式から発表がありました。

だからこそ、Composition Api で少しでもお役に立てるよう作成しました。

# Requirement

下記がそれぞれの Version になります。
Vue では TypeScript を使用しています。

- node (v12.16.2)

- @vue/cli (5.0.0-beta.0)

- Vue3.x (composition api)

- Python 3.9.2

# Installation

※ 作成者はデータベースに MySql を使用しました。
ローカルの環境に合わせてください。

Python ライブラリの install

```bash
pip install -r requirements.txt
```

node ライブラリのインストール

```bash
npm install
```

# Usage

サイトをローカルで見るための手順

```bash
git clone https://github.com/kouhei-github/E-commerce-Website-with-Django-Vue.git

cd E-commerce-Website-with-Django-Vue/djackets_django
```

mysql サーバーを立ち上げる

```bash
mysql.server start
mysql -uroot

CREATE DATABASE DB名 DEFAULT CHARACTER SET utf8mb4;
CREATE USER 'ユーザー名'@'localhost' IDENTIFIED WITH mysql_native_password BY 'パスワード';
GRANT ALL PRIVILEGES ON DB名.* TO 'ユーザー名'@'localhost';
exit;
```

※ .env ファイルに環境変数を書き込んでおいてください

Django プロジェクトの起動

```bash
cd クローンしたプロジェクトまでのパス

python -m venv environment_3_9_2

. environment_3_9_2/bin/activate

cd djackets_django

python manage.py makemigrations

python manage.py migrate

python manage.py runserver
```

npm の起動

```bash
npm install
npm run serve
```

下記にアクセス
http://localhost:8080/

# Note

言語やフレームワークの Version 等、設定が必要ですので合わせてください。

.env ファイルを作成して下記の内容にしてください。

```.env
# MySQL
DATABASE_URL=mysql://ユーザー名:パスワード@127.0.0.1:3306/DB名

# https://miniwebtool.com/ja/django-secret-key-generator/
SECRET_KEY=上記サイトからsecret Keyを生成してcopy & paste
DEBUG=True
ALLOWED_HOSTS=[127.0.0.1]
DOMAIN_ROOT=ご自身のpath/djackets_django/
```

# Author

作成者情報

- Kohei Nagamatsu
- k509937k509937@yahoo.com

# License

You don't have to ask.
