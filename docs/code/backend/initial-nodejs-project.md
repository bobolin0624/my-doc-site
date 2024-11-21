---
title: Node.js & Express.js basic project init
date: 2021-05-12 10:18:33
categories: Note
tags:
- node.js
- mongodb
- backend
sidebar_position: 1
---

## 新建專案

這篇文章會按照我平常的步驟說明如何從零開始建立一個使用 Node.js、Express.js 和 MongoDB 的專案。有時候一不小心太久沒開新專案就會忘了一些步驟，因此整理下來可以方便查找。
[note] 在建立前，記得先安裝好 node / npm

## init project

- 建立專案名稱
```bash=
mkdir project-name
// 移動到資料夾
cd project-name
```

- npm 初始化專案，並安裝 express 套件
```bash=
npm init -y
npm install express
```

- 設定 packge.json
    - 設定程式的主入口，通常為 index.js 或 app.js
    - scripts 的設定

範例
```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "seed": "node models/seeds/seeder.js"
  }
}
```

## db setting （以 mongo 為例）

- 若沒有可連線的資料庫，可以利用 mongo compass 或 atlas 建立一個新的專案資料庫

1. 安裝 mongoose 套件
```bash
npm install mongoose
```

2. 進行連線

我習慣的路徑為 database/mongoose.js
利用 mongoose 的套件設定與 mongoDB 連線。

3. 在 models 資料夾中建立需要的 Schema 

## GIT init

別忘了進行 git 設定做好版本控制

```bash
git init
```

初始化後，commit 與 push 前記得加上 ==.gitignore==，避免敏感資訊被 push 到遠端上外洩。  :shocked_face_with_exploding_head:

.gitignore 範例

```
# OS X
.DS_Store*
Icon?
._*

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# npm
node_modules
*.log
*.gz
.env
```

完成後就可以進行第一筆 commit 囉
```bash
git add .

git commit -m "feat: project init"
```
