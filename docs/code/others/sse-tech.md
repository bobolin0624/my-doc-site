---
title: 前端輪詢的替代方案：SSE / WebSocket / Fetch Stream 入門實作
date: 2025-03-21 17:00:00
categories: Note
tags: 
- sse
- 即時通訊

sidebar_position: 1
---

### 前言

近期花了一些時間探討了即時資料傳輸，特別針對 Server-Sent Events（SSE），探討的原因來自前端常見的 fetch + interval 的資料輪詢方式，可能導致後端 API 的被頻繁的觸發，即使資料可能並無異動，產生不必要的資源消耗。因次由後端來主動推送資料給前端，成為一種有效率的方案，此篇文章介紹三種通訊技術，可以因應不同場景而做選擇。


#### SSE 的使用時機與目的

SSE 的特點
- 使用 HTTP request 建立即時單向通訊（由後端推送至前端），WebSocket 則是雙向通訊模式 
- Server 端保持連線，主動推送資料給 Client 端
- 前端使用 EventSource API 建立聯繫接收資料

SSE 的目的
- 降低請求 API 頻率(Polling Requests)，提升即時數據傳輸效率
- 在資料真正異動時才重新 render 畫面

最適用的場景：
- 即時股票報價
- 社群通知或內容推播
- 資料即時監控


#### 通訊方法的比較


✅  Server-Sent Events (SSE)
- 優點
    - 輕量化單向通訊
    - 使用常用的 HTTP 協定，開發容易
    - 支援斷線自動重連機制
    - 可支援 JSON 格式
- 限制
    - 同一個瀏覽器對同一個 domain 最多 6 條連線
    - 不支援 IE/Edge 舊版本 (讚？)
    - 不支援自訂 headers

✅ WebSocket
- 優點
    - 低流量/低延遲，無連線數量限制
    - 支援雙向通訊，應用靈活
    - 初始請求連線可帶 headers
- 限制
    - 連線維護與管理較複雜
    - 需建立手動重連機制


✅ Fetch Stream / Fetch API
- 優點
    - 使用原生 Fetch 方法，無需額外套件
    - 高效的大規模資料流處理
    - 可自訂 headers
- 限制
    - 非事件驅動機制，要手動解析資料流
    - 需建立手動重連機制


##### 小結
* SSE：適合單向、低頻率的即時更新（系統動態通知、Real-Time Dashboard）
* WebSocket：適合需要雙向通訊的應用（聊天室、多人遊戲）
* Fetch Stream：適合大檔案下載、影片串流、大型資料集分析等場景


下面附上簡單的實作 example code (後端使用 NodeJS + ExpressJS)

1. SSE

`後端`
```javascript!
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = () => {
    const data = JSON.stringify({ timestamp: new Date() });
    res.write(`data: ${data}\n\n`);
  };

  const interval = setInterval(sendEvent, 5000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

```
`Front End`
```javascript!
const eventSource = new EventSource('/events');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received update:', data);
  // render HTML
};

```

2. Websocket

`後端（使用 ws 套件）`
```javascript!
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ timestamp: new Date() }));
  }, 5000);

  ws.on('close', () => clearInterval(interval));
});

```

`Front End`
```javascript!
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('WebSocket data:', data);
};

```


Fetch Stream

`後端`
```javascript!
app.get('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  for (let i = 0; i < 10; i++) {
    const chunk = JSON.stringify({ index: i, time: new Date() }) + '\n';
    res.write(chunk);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  res.end();
});

```

`前端`
```javascript!
fetch('/stream').then(async (res) => {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    console.log('Chunk received:', chunk);
  }
});

```