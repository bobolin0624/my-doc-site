---
title: n8n 入門實作 - 日文單字推送機器人
date: 2024-11-20 14:01:00
categories: Note
tags:
- python
- flask
- backend
sidebar_position: 1
---

## 前言

雖然 n8n 已經流行一段時間了，不過我一直都還沒真正動手接觸。這次決定花點時間快速入門，做個小工具來體驗看看 n8n 的魅力，也順便打造一個每天自動推送日文單字到 LINE 的學習小幫手。

那麼，什麼是 n8n 呢？
你想像一下，你每天都有一些固定要執行的任務：起床後洗漱、泡一杯咖啡、開啟一天的工作。現在市面上甚至有能設定「每天自動泡好咖啡」的咖啡機，只要事先設定時間，它就會自動完成整個流程。

n8n 其實就是這樣一台「數位版的自動化咖啡機」（？）
它是一款開源的自動化工作流程（workflow automation）平台，透過視覺化的節點介面，你可以自由串接各種 API、資料庫或雲端服務，不用額外撰寫伺服器程式碼，就能快速打造屬於自己的自動化任務──例如每天抓天氣資料並推送通知、或自動篩選重要信件並備份。

簡單來說，n8n 讓你不用寫一大堆程式碼，也能快速整合各種第三方服務，打造屬於自己的自動化幫手。

---

### Project 目標

✅ 每天固定時間 自動推送一個日文單字
✅ 使用 Jisho API 隨機選擇單字
✅ 透過 LINE Bot 發送到 line 對話
✅ 完全免費部署在 Render

### Tech 選用

```
n8n Workflow
├─ Schedule Trigger (Cron)
├─ HTTP Request (Jisho API)
├─ Code (JavaScript)
└─ HTTP Request (LINE Messaging API)

部署環境
├─ Render (免費 Docker 部署)
└─ UptimeRobot (保持服務運行)
```

#### Step 1 申請 LINE BOT

LINE Notify 已經停止服務了，所以需要申請 Line OA 官方帳號使用 LINE Messaging API 來推送訊息。

如何申請 LINE Messaging API

- 前往 [LINE Developers Console](https://developers.line.biz/en/)
- 建立新的 Provider
- 建立 Messaging API Channel，接著介面會引導去「Create a LINE Official Account」
- 取得 `Channel Access Token`（重要：介接 Line API 會用到）
- 用手機掃描 QR Code 加 Bot 好友，記得要先發送訊息給官方帳號進行互動過後，後續才能自動推播

#### Step 2 先在本機建立 n8n workflow

1. install n8n 
可以使用 docker run 起來，但如果電腦已經安裝過 Node.js 的話，也可以直接執行 `npx n8n` 進行安裝，執行後要等待一小段時間...

完成後會看到

![alt text](static/img/doc-img/npx-n8n.png)

註冊後進入到 dashboard 就可以開始建立第一個 workflow 囉～

註：使用 docker run 執行的指令
```
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

```

2. 建立 Workflow

每個動作都需要建立一個節點，我這次的工具總共使用了四個節點

- 節點 1 Schedule Trigger
  排程設定目標：每天早上 09:00 進行一次
  設定內容：
  * Trigger Interval: Cron
  * Cron Expression: 0 9 * * *（每天早上 9 點）
  * Timezone: Asia/Taipei （這邊說明一下 workflow 的 timezone 設定，在 workflow 面板右上角「...」點擊選擇 Settings，Timezone 選擇你要的時區）

  ![alt text](static/img/doc-img/timezone.png)

- 節點 2 

3. 匯出 Workflow

