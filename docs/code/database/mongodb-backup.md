---
title: MongoDB 資料備份 
date: 2025-01-03 13:45:00
categories: database
tags:
- mongodb
- mongoexport
- mongodump
---

備份是個好習慣！這篇文章紀錄如何使用 MongoDB 的工具備份現有資料，並將資料傳輸到本地環境的方法。

### 伺服器端需安裝 mongo-tools

首先確保 server 已經安裝 mongo tool，具備資料庫的讀取權限，能夠執行 mongoexport / mongodump

### mongoexport vs mongodump

MongoDB 提供兩個工具


| 項目 | mongoexport | mongodump |
| -------- | -------- | -------- |
| 輸出格式     | JSON / CSV     | BSON     |
| 用途 | 適合用在需要檢視或修改 document 的情境 | 適合一次備份完整的資料庫


#### 使用 mongoexport

備份單一個 collection，可以使用 mongoexport 匯出 json file

```shell!
mongoexport --host={host} --port={port} --username={username} --password={pwd} --authenticationDatabase=admin --db={db-name} --collection={collection-name} --out=/tmp/collection-back-up.json
```

筆記一下如果 password 含有 @ 字符，可以在 @ 前加上反斜線 `\` 符號


可以使用 tar 指令，將 export 出來的多個 json 檔案包成一個壓縮檔案

```bash!
tar -czvf back-up.tar a.json b.json c.json
```

最後回到 local，將遠端 server 的 tar 檔案傳輸回來

```bash!
scp {username}@{ip}:/tmp/back-up.tar {local-path}
```

若要進行 import，這時使用 mongoimport 指令，就可以將 json 檔案匯入到 db

```bash!
mongoimport --host <host-ip> --port <port> --db {dbname} --collection {collection-name} --file xxx.json --jsonArray
```

#### 使用 mongodump

如果想要直接備份整個 db，可以直接使用 mongodump (匯出的不是 json 檔案，所以如果是想要整體匯出匯入可以使用 dump，但如果想查看單一 collections 的 documents 內容，推薦使用 mongoexport)

```bash!
mongodump --host {host} --port {port} -u {username} -p {password} --authenticationDatabase admin --db {db-name}  --out /tmp/backup
```

匯出資料夾內部的結構大致上為：

```bash!
backup/
└── db-name/
    ├── collection1.bson
    ├── collection1.metadata.json
    ├── collection2.bson
    └── collection2.metadata.json
```

如果 mongoexport 出來的資料想要還原的話，可以使用 mongoimport，而使用 mongodump 出來的資料，要匯入可使用 mongorestore


結束！備份配置檔案雖然小繁瑣但指令還算簡易，當然如果能使用 GUI 像 compass 工具的話，可以更快的匯出 json 或是 CSV 之類的檔案，不過環境上不一定有 GUI 可以使用，因此紀錄一下指令有備無患囉。