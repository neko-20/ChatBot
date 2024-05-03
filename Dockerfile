# ベースになるコンテナイメージの指定
FROM python:3.11-slim-bookworm

# コンテナ内の作業ディレクトリを指定
WORKDIR /app

# ローカルのrequirements.txtをコンテナ内にコピー
COPY ./app/requirements.txt ./

# pipを最新バージョンに更新
RUN pip install --upgrade pip

# 依存パッケージをキャッシュせずに一括インストール
RUN pip install --no-cache-dir -r requirements.txt
