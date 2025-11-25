---
title: n8n 入門實作 - 日文單字推送機器人
date: 2024-11-20 14:01:00
categories: Note
tags:
- n8n
- line
sidebar_position: 1
---

## 前言

雖然 n8n 已經流行一段時間了，不過我一直都還沒真正動手接觸。這次決定花點時間快速入門，做個小工具來體驗看看 n8n 的魅力，也順便打造一個每天自動推送日文單字到 LINE 的學習小幫手。

**那麼，什麼是 n8n 呢？**
想像一下，每天都有一些固定要執行的任務：起床後洗漱、泡一杯咖啡、開啟一天的工作。現在市面上甚至有能設定「每天自動泡好咖啡」的咖啡機，只要事先設定時間，它就會自動完成整個流程。

n8n 其實就是這樣一台「數位版的自動化咖啡機」（？）
它是一款開源的自動化工作流程（workflow automation）平台，透過視覺化的節點介面，你可以自由串接各種 API、資料庫或雲端服務，不用額外撰寫伺服器程式碼，就能快速打造屬於自己的自動化任務──例如每天抓天氣資料並推送通知、或自動篩選重要信件並備份。

簡單來說，n8n 讓你不用寫一大堆程式碼，也能快速整合各種第三方服務，打造屬於自己的自動化幫手。

---

### Project 目標

* ✅ **定時執行**：每天固定時間自動觸發
* ✅ **獲取資料**：使用 Jisho API 隨機選擇日文單字
* ✅ **訊息推播**：透過 LINE Bot 發送到個人 LINE 對話
* ✅ **免費部署**：使用 Render Docker 服務

### Tech 選用

```text
n8n Workflow
├─ Schedule Trigger (Cron)
├─ HTTP Request (jlpt-vocab-api)
├─ Code (JavaScript)
└─ HTTP Request (LINE Messaging API)
```

### Step 1 申請 LINE BOT

LINE Notify 已經停止服務了，所以需要申請 Line OA 官方帳號使用 LINE Messaging API 來推送訊息。

如何申請 LINE Messaging API

- 前往 [LINE Developers Console](https://developers.line.biz/en/)
- 建立新的 Provider
- 建立 Messaging API Channel，接著介面會引導去「Create a LINE Official Account」
- 取得 `Channel Access Token`（重要：介接 Line API 會用到）
- 用手機掃描 QR Code 加 Bot 好友，記得要先發送訊息給官方帳號進行互動過後，後續才能自動推播

### Step 2 先在本機建立 n8n workflow

1. install n8n <br />
可以使用 docker run 起來，但如果電腦已經安裝過 Node.js 的話，也可以直接執行 `npx n8n` 進行安裝，執行後要等待一小段時間...

完成後會看到

![alt text](/img/doc-img/npx-n8n.png)

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

- `節點 1` Schedule Trigger
  - 排程設定目標：每天早上 09:00 執行一次
  - 設定內容：
    * Trigger Interval: Cron
    * Cron Expression: 0 9 * * *（每天早上 9 點）
    * Timezone: Asia/Taipei （這邊說明一下 workflow 的 timezone 設定，在 workflow 面板右上角「...」點擊選擇 Settings，Timezone 選擇你要的時區）

    ![alt text](/img/doc-img/timezone.png)

- `節點 2` HTTP Request - 向外部資料庫取得日文單字
  > 這邊要先感謝 jlpt-vocab-api [GitHub](https://github.com/wkei/jlpt-vocab-api?tab=readme-ov-file)，我使用了他們的 API 取得日文隨機單字
  - HTTP Request 原理很簡單，可以想像他就是 n8n 內建的 postman，我使用的 API 是公開不需要驗證的，所以只要設定方法跟網址就可以
    - Method: `GET`
    - URL: `https://jlpt-vocab-api.vercel.app/api/words/random`
    - Response Format: JSON （這個不需要特別設定）
  - 測試請求： 設定完成後，點擊節點上的「Execute Step，如果成功，會在右側視窗看到類似下圖的 JSON 資料回傳（包含了單字 word、意思 meaning 等欄位）

  ![alt text](/img/doc-img/n8n-httprequest.png)

- `節點 3` Code in JavaScript - 整理拿到的資料格式
  - 拿到 API 回傳的 JSON 資料後，直接推送到 LINE 會是一串沒有溫度的字們，所以需要 Code 節點來處理回傳的格式：
  1. 提取欄位：透過 `items[0].json` 抓取上一個節點的結果，把單字、假名、羅馬拼音挑出來。
  2. 內容加料：因為原本的單字 API 沒有提供例句，所以我這段程式碼裡「偷吃步」，直接在 Code 節點內呼叫了另一個外部 API Jotoba（再度感謝）來補充例句。
  為什麼這樣寫？ 通常我們會拉另一個 HTTP Request 節點來抓例句，但透過 n8n 內建的 this.helpers.request 方法，我們可以在 JavaScript 裡面直接發送請求。這樣的好處是邏輯更集中，而且可以方便地做 Error Handling（如果抓不到例句，至少單字要能正常發送，不要讓整個流程掛掉）。

  下面提供範例（非最終完成版）
  ```js
  // 取得上一個節點 (HTTP Request) 回傳的資料
  const data = items[0].json;

  // 防呆機制：如果沒有拿到 word 欄位，就回傳空訊息
  if (!data || !data.word) {
    return [{ json: { message: "讀取失敗，請檢查 API 連線" } }];
  }

  // 提取需要的欄位，並設定預設值 (Fallback)
  const word = data.word || '未知單字';
  const furigana = data.furigana || '';
  const romaji = data.romaji || '';
  const meaning = data.meaning || '無解釋';

  // 組裝要發送到 LINE 的最終訊息格式
  // 這裡使用了 \n 來換行，讓版面更清晰
  const message = `
  📚 今日日文單字：${word} (${furigana})

  🔤 拼音：${romaji}
  💡 意思：${meaning}

  今日も頑張りましょう！💪
  `.trim();

  // 回傳處理好的資料，讓下一個節點 (LINE) 使用
  return [{ json: { message } }];
  ```
- `節點 4` HTTP Request - 發送 LINE 訊息
  最後一步，我們要將整理好的 message 字串，透過 LINE Messaging API 推送到我們的手機上。這裡我們同樣使用 HTTP Request 節點，但這次是要對 LINE 的伺服器發送指令。
  - 設定重點： 這裡我們使用 broadcast 接口，它的作用是「向所有已加此 Bot 為好友的使用者廣播訊息」。因為這個 Bot 只有我自己在用，所以這是最簡單不用抓 User ID 的做法。
    Method: `POST`
    URL: `https://api.line.me/v2/bot/message/broadcast`
    Authentication: Generic Credential Type -> Header Auth

    這邊需要建立一個新的 Credential，或者直接在節點下方設定 Headers。

    Name: Authorization

    Value: Bearer YOUR_CHANNEL_ACCESS_TOKEN
    注意：Bearer 和 Token 中間要有一個空格！Token 就是在 Step 1 申請時拿到的那一串字串。
  - Body 設定 (JSON)： 我們要傳送符合 LINE 格式的 JSON Payload。在 text 的欄位中，我們使用 n8n 的 Expression 功能，引用上一個 Code 節點產出的 message 變數。

  ![alt text](/img/doc-img/n8n-json-message.png)
  ```js
  {
    "messages": [
        {
            "type": "text",
            // 這裡的 {{ $json.message }} 代表動態引用上一個節點的輸出結果
            "text": "{{ $json.message }}"
        }
    ]
  }
  ```

### Step 3 可以測試啦

當四個節點都設定好之後，最讓人期待的時刻來了！
點擊 workflow 編輯器下方的 Execute Workflow 按鈕。
觀察執行畫面，如果節點變綠色打勾，代表執行成功。
檢查 LINE，看看是否有收到推播通知。
檢查重點：
✅ API：是否有成功吐出資料？
✅ Code 節點：是否有正確將 JSON 轉換成字串？
✅ LINE：是否收到機器人傳來的日文單字？


### Step 4 部署環境建議

測試成功後，因為有排程每天會固定執行，記得在 Dashboard 右上角把 Workflow "Active" 開啟，這樣不論你在哪裡運行 n8n，排程才會真正生效哦～

關於部署，我個人選擇了 Render 的免費方案：

將做好的 Workflow 匯出成 JSON 檔案。

在 Render 上起一個 n8n 的 Docker Service。

將 JSON 檔案匯入並重新設定 Credential。

以上，這篇主要分享的是第一次接觸 n8n 的體驗過程，實務上還有一些細節文章沒能涵蓋，大家可以再去查找資料，動手實作～

最後的最後，附上我的成品，目前已經運行了兩週，有分享給一個也在學日文的朋友使用，也算是小有成就感～

![alt text](/img/doc-img/nihongogogo-line.jpg)

