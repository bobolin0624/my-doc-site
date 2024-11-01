---
title: MongoDB.local 
date: 2024-07-18 12:02:02
categories: database
tags:
- mongodb
- seminar
---

# MongoDB.local 大會分享

首次參加 MongoDB.local 大會，主要帶著一個吃 buffet，什麼都來一點的心態來聽\
，不過也設定了三個小目標：

-   了解 MongoDB 7.0 的新功能與優化
-   聽聽議程中各行業的商業模式與使用 MongoDB 的契機
-   思考有哪些功能可以幫助團隊的應用開發

### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#MongoDB-local-Taipei "MongoDB.local Taipei")MongoDB.local Taipei

「MongoDB.local 提供初學者與技術人員一個學習與交流的平台。在本次活動中，我們將一同探索如何使用 MongoDB 開發者資料平台來協助企業建構核心應用。 内容將涵蓋各行業的發展趨勢、各行業的客戶案例及 MongoDB 的最新功能，加速開發人員的工作效率，加速企業建構數據賦能的應用系統。」

今年的大會在萬豪酒店舉行，議程廳外有幾個廠商的攤位（如 Red Hat / Google Cloud 等），大會形式基本上議程緊湊，一路接續沒有中場休息的演講，下午則分為工作坊與演講兩大區域。

### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#%E8%AD%B0%E7%A8%8B "議程")議程

首軌議程主題演講是 MongoDB 的首席行銷策略長 Peder Ulander，分享關於 MongoDB 的最新動態以及主要分享 MongoDB Atlas 的應用服務功能，本屆大會的 slogan 就是「LOVE YOUR DEVELOPERS」- 善待你的開發者，這也顯現了 MongoDB 開發的功能都是為了協助開發者能加速開發和節省成本，真的很懂拉攏工程師的心呢！

以下就根據議程的順序稍微介紹一些自己聽到的重點：

#### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#%E5%9F%BA%E6%96%BC-MongoDB-Change-Stream-%E5%BB%BA%E7%AB%8B%E4%BA%8B%E4%BB%B6%E9%A9%85%E5%8B%95%E7%B3%BB%E7%B5%B1-%E8%B6%A8%E5%8B%A2%E7%A7%91%E6%8A%80 "基於 MongoDB Change Stream 建立事件驅動系統 - 趨勢科技")基於 MongoDB Change Stream 建立事件驅動系統 - 趨勢科技

趨勢科技的主力產品是資安平台，基於同時有數萬個端點需要追蹤管理，這次介紹他們如何使用 Change Stream 來做異動資料擷取，簡單說就是監聽即時數據變更。

Change Stream 提供 API 來擺脫舊版本需要到 oplog 不斷查找異動點的方式，適用於做分析、IoT 的事件監聽等，這能讓應用服務能更快速反應事件發生。

判讀事件狀態的 sample code

```
"operationType": "update" // 事件的型態， 常見的有 insert / update / delete\
"updateDescription": {
  "updatedFields" : {
  "name": "Alice" // 改變的欄位
 }
}
```

先前在團隊的服務應用上，也開發過 daemon 來監聽工廠內機台狀態產生變化的功能，只不過是是在 controller 端 setInterval 每秒抓出資料庫的值後做比對，未來若考量到監控數量變多的狀況，也許可以考量導入來減輕 service 的負擔。

#### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#%E5%BE%9E-MLOps-%E5%88%B0%E7%94%9F%E6%88%90%E5%BC%8F-AI%EF%BC%9A%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-MongoDB-%E5%B0%87-ML-%E5%B0%8E%E5%85%A5%E6%82%A8%E7%9A%84%E6%9C%8D%E5%8B%99 "從 MLOps 到生成式 AI：如何使用 MongoDB 將 ML 導入您的服務")從 MLOps 到生成式 AI：如何使用 MongoDB 將 ML 導入您的服務

今年各大會議程絕對少不了的主題，MongoDB 當然也沒錯過，It's AI!

講者提到，利用 MongoDB as private data source 並使用 chatGPT 第三方工具 LlamaIndex，將非公開的資訊像是公司內部規章 PDF import 到 MongoDB 中，最後可以像 ChatGPT 般提供問答服務。

以下文章是更詳細的介紹，有興趣的人可以看看：\
[Build a ChatGPT with your Private Data using LlamaIndex and MongoDB](https://medium.com/llamaindex-blog/build-a-chatgpt-with-your-private-data-using-llamaindex-and-mongodb-b09850eb154c)

#### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#Crypto-Exchange-%E7%9A%84%E6%97%85%E7%A8%8B-%E7%8F%BE%E5%AF%A6%E7%9A%84%E6%8C%91%E6%88%B0%E8%88%87-MongoDB-x2F-Google-Cloud-%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%88 "Crypto Exchange 的旅程: 現實的挑戰與 MongoDB / Google Cloud 解決方案")Crypto Exchange 的旅程: 現實的挑戰與 MongoDB / Google Cloud 解決方案

本議程有兩個主講人，一個是 WOO Network 區塊鏈交易平台的介紹以及選用 MongoDB 的原因，講者提到為何選用 MongoDB，主要考量因素是：

-   因應區塊鏈快速的市場變化與功能
-   具有彈性 （schema-less）
-   因應 Data 數量快速成長的可擴充性

另一位則是來自 Google Cloud 的 Google Looker 數據分析平台，介紹若公司或產品蒐集到很多資料後，可以利用這平台做些什麼，包含分析 / 視覺化 / 生成式 AI ...等等，讓資料更具有價值。

了解更多 [Google Looker](https://cloud.google.com/looker?hl=zh-tw)

#### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#%E4%BE%86%E8%87%AA-MongoDB-%E7%9A%84%E6%9C%80%E6%96%B0%E8%A8%8A%E6%81%AF-amp-MongoDB-7-0-%E9%87%8D%E7%A3%85%E7%99%BB%E5%A0%B4 "來自 MongoDB 的最新訊息 & MongoDB 7.0 重磅登場")來自 MongoDB 的最新訊息 & MongoDB 7.0 重磅登場

主要重點有四大面向：Streamlined Developer Experience / Performance / Migrations / Security，看得出來 MongoDB 一直有強調希望讓開發者能夠更無拘束且更簡單的處理數據，因此除了效能與安全性提升外，也很著重在開發者體驗以及協助開發者減少開發成本。\
以下就分這四大亮點來簡述：

`Streamlined Developer Experience`

-   query 的強化：例如可以在 aggregate 的時候就可以 In-Database 直接做數據分析，取得平均數等等，達到更高效能與自動化。
-   Time Series Collections：時間序資料的優化，資料可刪除/異動。
-   Change Streams：增強效能改善（例如能即時發現 user 的 profile 異動，給予更多服務）
-   shard key advisor commands

`Performance UP`

-   $group / $match / $lookups 等 query 的效能提升，其中 $group 效能提升 50%、$match 效能提升 90%，很是驚豔！

`Security`

-   可以在加密資料不須解密的狀況下進行 query。

`Migration - Relational Migrator`

-   這功能對想要轉移資料庫的團隊們是一大福音，畢竟開發者們最害怕的就是變動，如果能無痛的讓資料做 Migration，那會是很大的吸引力，也不會因此而固守在自己熟悉但卻不合適的資料庫工具上。

#### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#%E4%BD%BF%E7%94%A8-MongoDB-Relational-Migrator-%E7%8F%BE%E4%BB%A3%E5%8C%96%E6%94%B9%E9%80%A0%E6%82%A8%E7%9A%84%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F "使用 MongoDB Relational Migrator 現代化改造您的應用程式")使用 MongoDB Relational Migrator 現代化改造您的應用程式

緊接著就馬上介紹如何使用 Migrator 來協助做資料移轉，在面對舊有資料庫有龐大資料的狀況下，過往做資料遷移所要考量的時間、成本都是巨大的考驗（當天的講者之一提到他們之前在做 Migration 的時候可是花了整整一年的時間）。\
而 MongoDB 的 Relational Migrator 可以做到設計 schema、搬移資料並產生對應的程式碼。

#### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#%E6%B0%B8%E8%B1%90%E9%8A%80%E8%A1%8C%E5%A6%82%E4%BD%95%E9%81%8B%E7%94%A8-MongoDB-%E5%84%AA%E5%8C%96%E4%BD%BF%E7%94%A8%E8%80%85%E6%95%B8%E4%BD%8D%E9%80%9A%E8%B7%AF%E9%AB%94%E9%A9%97 "永豐銀行如何運用 MongoDB 優化使用者數位通路體驗")永豐銀行如何運用 MongoDB 優化使用者數位通路體驗

原先也是使用 RDBMS 的永豐銀行，因為發現消費者在查詢銀行資料時常被限制（這也是我使用網銀一直以來的困擾!!）總是不能查詢比較久以前的資料，或是產品間的資料不能相通，原來這都是受限於 DB 的處理能力。

包含：

-   資料查詢的限制（時間 / 筆數）
-   效能考量：將資料轉移到倉儲，依年份分 DB（增加 query effort）
-   資料 mapping → 無法做 pagination

最後改採用 MongoDB 則能夠達到以下三點，也更加強了使用者體驗：

-   可以利用彈性的架構因應臨時需求
-   輕易整併跨系統交易明細
-   透過一主二從架構來達到讀寫分離，發揮可用性

#### [](https://bobolin0624.github.io/2023/09/28/events-mongo-day-2023/#Noodoe%EF%BC%9A%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-MongoDB-%E5%89%B5%E9%80%A0%E6%B5%81%E6%9A%A2%E7%9A%84%E5%85%85%E9%9B%BB%E9%AB%94%E9%A9%97 "Noodoe：如何使用 MongoDB 創造流暢的充電體驗")Noodoe：如何使用 MongoDB 創造流暢的充電體驗

Noodoe 是提供全球電動汽車充電服務的公司，從提供充電樁管理平台的角度切入電動車市場，將應用服務佈署於雲端平台上，一開始是使用 firebase 搭配 firestore 工具，但因後續資料量過大及人力資源有限的狀況下，最後轉向使用 Mongo Atlas 的服務，包含 Atlas search 與搭配 kafka 使用 change stream。

為什麼選擇使用 MongoDB：

-   彈性的資料結構因應客製化需求 NoSQL
-   服務需要 Transaction 機制
-   利用 Aggregation 的即時 query 資料分析

這次大會上全託管資料庫服務 Atlas 推廣也介紹不少，惟因目前團隊主要還是在本地的建置服務居多，因此就沒有特別著墨紀錄太多，不過先前自己在進行 side project 的建置時，他有提供永久免費的方案供開發者使用，非常方便！

另外最後還有一點想提的就是 Time Series Collection，對我們團隊來說是可以關注的，在智慧工廠的監控上，會有許多需要依照時間來進行統計分析的需求，若未來想使用 NoSQL 來處理，也許可以考慮採用。

以上就是 2023 MongoDB Local 大會的基本介紹，如果想看各議程更詳細的介紹的話，在 MongoDB 的 [Youtube 官方頻道](https://www.youtube.com/playlist?list=PL4RCxklHWZ9ut8RH0fUY26byk_7vfd5mU)可以看到錄影片段。