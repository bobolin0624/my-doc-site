---
title: DevOps - AWS 服務初體驗
date: 2021-10-28 10:23:32
categories: Project
tags:
- AWS
- Elastic Beanstalk
- deploy
thumbnailImagePosition: left
thumbnailImage: https://imgur.com/9LIXIIB.png
sidebar_position: 1
---

使用 AWS [Elastic Beanstalk](https://aws.amazon.com/tw/elasticbeanstalk/) 與 [RDS](https://aws.amazon.com/tw/rds/) 服務部署網站

## Why AWS?

部署在部分公司也成了工程師必備的技能之一，通常最常看到的就是 AWS ，當然還有 GCP 與 AZURE，不過 AWS 是這三大最早出現的，所以就先挑他來做練習。

## What is AWS? 

看起來包山包海的，所以他到底是什麼？ 官網寫著：
> Amazon Web Services 是全球最全面和廣泛採納的雲端平台，透過全球資料中心提供超過 200 項功能完整的服務。數百萬個客戶 — 包括成長最快的新創公司、最大型企業以及領先的政府機構 — 都使用 AWS 來降低成本、變得更靈活，且更迅速地創新。

我想…就是提供各式各樣不同的雲端相關服務囉！

**Let's start!**

基本上只要在 Google 輸入「Node.js 部署 AWS」應該點到這裡 => https://aws.amazon.com/tw/getting-started/hands-on/deploy-nodejs-web-app/

官網甚至提供中文的教學步驟 :book:，我是依照使用「AWS Elastic Beanstalk 和 Amazon DynamoDB 啟動 Node.js Web 應用程式環境的教學」開始部署之旅，不過因為這次練習部署的站我使用的是 MySQL，所以我最後使用的是 Amazon RDS 的資料庫做連線，如果是使用 NoSQL 的話就使用 DynamoDB 即可。

Elastic Beanstalk 是 AWS 幫助開發者把 EC2 跟其他部署的建設基礎都處理好的類 PaaS 服務（理解有誤的話還有望前輩們指教），所以只要選好 server 方案、平台，上傳程式碼，就可以輕鬆部署完成。

因為部署並不複雜，且官網都有詳細說明，所以這篇就沒有一一寫出步驟，主要挑出有遇到的幾個小問題來分享：

<br />

### *  ***.env 檔案 — 環境設定***

這次練習的專案我有使用 Imgur 的 API 來做上傳圖片，如果專案有需要設定環境參數的話記得到「組態」的「環境屬性」做設定

![image alt](https://miro.medium.com/max/700/1*zht_hrS0BTuhRSkPz-umUA.png)

![image alt](https://miro.medium.com/max/700/1*WhnG6-opD3MHWYJD62eQKw.png)

<br />

### * ***有錢才能任性：建立 Database — region 也很重要***

我在本機先使用了 MySQL 做開發，所以就選擇使用 Amazon RDS 來與應用程式串接

![image alt](https://miro.medium.com/max/700/1*H5fU4Fwa3wxJ8Vms32kjnA.png)

這邊遇到的小坑是，我一開始建立專案選在 region 選了亞太地區(大阪)，結果建立 Database 的時候，怎麼選都沒看到 db.t2.micro 的免費方案（換了 MySQL 版本也是），最後請教了一下有經驗的人才發現，原來 region 不同服務跟計價也會有差異，後來改選到亞太地區(東京)才順利建立了免費試用的資料庫（目前免費專案也是只有第一年 750 hr / month 哦，之後要隨時注意一下 billing，以免被收費~)

<br />

### * ***專案部署設定***

Elastic Beanstalk 部署可以用上傳檔案的方式，似乎也可以使用 EB CLI 與 Docker 的方式部署（之後再找機會嘗試），這次我是先使用了壓縮專案成 ZIP 檔案上傳的方式部署，專案先將 config.json 檔案的 production 設定完成後，將專案打包上傳，部署完後滿心期待點了網址卻一直出現轉圈圈的狀況，毫無頭緒的我，第一個想法是看 LOG 檔報了什麼錯，但在 AWS 上的 Log 去哪看呢？ 就在「日誌」裡頭，「請求日誌」點下去可以選擇要全部的還是只要 100 行，下載下來是個 ZIP 檔，解壓縮後找到 web.stdout.log 這個檔案，就可以看到 log 了 :+1: 

![image alt](https://miro.medium.com/max/700/1*6eU6jvDlox75AR703Yn4jw.png)

第一次出錯我看到 log 顯示的像是連線錯誤，查看了一下發現在 AWS 上應該是執行 `package.json` 中 `start` 腳本，於是我就將設定改成 
`"start": "NODE_ENV=production node app.js" `重新部署後，網站就成功跑起來了，不過對於這樣的連線問題還是有些疑惑存在，希望未來可以再慢慢補齊觀念。

這次部署到 AWS 的網站算是個人的 Portfolio [ 全端開發使用 Node.js + Express.js + Handlebars (版型取用網路上免費的 Bootstrap template 來做套版修改) ]，因為免費方案有限制因此純分享就不附上 demo 網址啦～～

