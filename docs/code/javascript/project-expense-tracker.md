---
title: Project - Expense Tracker
date: 2021-08-08 10:18:33
categories: Project
tags:
- Node.js
- Express.js
- MongoDB
thumbnailImagePosition: left
thumbnailImage: https://imgur.com/uvV0FF0.png
sidebar_position: 1
---

# Project - simple expense tracker

#### Why this project

在學習後端開發的路途中，CRUD (Create, Read, Update, Delete) 以及資料的處理是學習的必經路程<!-- more -->，為了多次的產出練習，除了一開始最常入門的 Todo-List 外，也思考生活上最常使用增刪改查的應用，因為自己每天都有使用記帳 app，所以也因此實作了簡單的 Web 版本。


#### Using 

後端：Node.js + Express.js
登入機制： passport.js
資料庫：MongoDB + mongoose
前端： express-handlebars / Bootstrap
版本：Github
部署：heroku


#### Challenges and sharing

Bootstrap 的排版與 CRUD 的基本功能撰寫上，因為練習較多次的關係，相對是能掌握的部分！

但在 filter 分類的資料處理上，心中想著要考量若資料量過多造成的效能問題，所以就選擇 mongoose 提供的 aggregate 的方法，但一開始使用時並沒有看太多細節，後面要加上年/月的篩選條件優化時，就遇到了無法同時兼顧兩邊條件的設定，在觀摩了網路許多的實作經驗以及查找 aggregate 眾多語法後，才找了 $ne 來表示若某條件沒有被設定時，就找出全部資料的方式，有看到許多分享經驗的人說：程式有趣的地方在於有很多種方式可以達到一樣的效果或功能。而給自己的心態是，不求一下子就寫出最乾淨、俐落的程式碼，但求能一直保持學習精進的熱忱。

另一個是 seeder 的建立，因為有關聯的資料表，所以必須先執行 user 的建立，接著再建立資料對應給 user，使用 forEach去迭代 json 檔案，就會發生種子資料沒有建立完全的狀況，因此才知道是非同步處理的議題，程式寫到越後面執行的 task 越多，就開始面對了這個大魔王，目前對於非同步本身的概念上是理解的，但對於實作上的用法還是需要查找許多網路資料來跟著用，這次選用的是 Promise.all，在 Promise.all 中建立好一組陣列資料，來保證陣列裡的內容全部執行完畢再結束 seeder。

在使用 passport.js 提供身份驗證機制的 middleware 時，體會到練習使用第三方套件也是很重要的事，可以方便進行整個全局開發。從需求來規劃需要的功能，接著搜尋套件，閱讀大量文件，實作出想要的功能，一開始對於密麻的文件會完全不知道怎麼下手，遇到很多的挫折，所幸現在網路資源很多，不斷觀摩、嘗試，最後實作出來的成果也是會充滿不少成就感。

**expense-tracker 專案的 [GitHub](https://github.com/bobolin0624/expense-tracker) 與 [Heroku](https://intense-spire-30373.herokuapp.com/users/login)** (heroku 免費版已結束，網址可能無作用)


