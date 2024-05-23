---
title: 淺談 Event Loop
date: 2021-05-12 10:18:33
categories: Note
tags:
- JavaScript
- event Loop
thumbnailImagePosition: left
thumbnailImage: https://imgur.com/MxQrWxl.png
sidebar_position: 1
---

#### 從 Javascript 的特性說起：Single Threaded

Javascript 是一種單線程（單執行緒）的語言，程式碼會在 Stack 中被一一執行。

<!-- more -->

~~講中文：~~
一次只能做一件事

##### 又有新的名詞了：堆疊 (Stack)

維基百科說：堆疊（stack）又稱為棧或堆棧，是電腦科學中的一種抽象資料型別，只允許在有序的線性資料集合的一端（稱為堆疊頂端，top）進行加入資料（push）和移除資料（pop）的運算。因而按照後進先出（LIFO, Last In First Out）的原理運作。

~~講中文：~~
試看下圖生活中發生的例子，最先洗好的杯子放最下面，但要用的時候是拿最上面最後洗好的杯子，堆疊即是如此。

![Photo by Crissy Jarvis on Unsplash](https://miro.medium.com/max/1400/0*7DZA8far6AEXEKIP)

> photo from medium - by Crissy Jarvis on Unsplash

##### 阻塞 (blocking)

上面提到一次做一件事，而如果這件事又要做很久，後面的事情就只能一直等，這樣的情況就稱為阻塞行為。

---

#### 非同步處理 (Asynchronous Callbacks) ＆ Task Queue & Event Loop

如何解決上述的情況呢？

JavaScript 的 runtime engine 一次只能做一件事，但瀏覽器可以同時執行很多件事，而且提供了 API 讓大家使用，讓程式可以透過 event loop 搭配非同步處理達到同時處理多件事。
整體的流程大概是這樣：

下面的有一段 JS 的程式碼，JS 處理程序會先依序將程式碼放入 Stack 中執行，所以執行了 `console.log(‘hello’)`，印出了 hello

![](https://miro.medium.com/max/1400/1*NzpU75qlUlwBZtKUlnaP6A.png)

接著 Stack 執行 setTimeout function，但是 setTimeout 是屬於瀏覽器提供的 api，因此會被放到 web apis 的計時器中，等到設定的時間到了後（注意即使設定 0 秒還是會走這樣的流程），再把它放到 task queue 中等待，等到所有 Stack 清空後，才會立即執行。

![](https://miro.medium.com/max/1400/1*RVbrJMFlCVUHZe-qHuPg7w.png)


所以接下來，會先執行 `console.log(‘World’)`，印出 World（注意 task queue 中的 setTimeout 還在等待中）。

![](https://miro.medium.com/max/1400/1*HUp4Y2quWzqR1zOFAyxOHw.png)


最後進入 event loop ，event loop 會去判斷如果 stack 已經沒有東西就把 task queue 中的項目依序放到 stack 當中，執行該做的事。

![](https://miro.medium.com/max/1400/1*CwT05pQah-f5V4AkJha1HA.png)


---

##### 小結

> ***事件迴圈 Event Loop***

是個監測員，監測 Call Stack 及 task queue

如果 stack 沒事件執行，且 task queue 有東西，那就將 task queue 移到 stack 執行。

如此不斷循環~~~~~


*Reference* 

[所以說event loop到底是什麼玩意兒？| Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

<!-- {%youtube 8aGhZQkoFbQ %} -->


[[筆記] 理解 JavaScript 中的事件循環、堆疊、佇列和併發模式（Learn event loop, stack, queue, and concurrency mode of JavaScript in depth）](https://pjchender.blogspot.com/2017/08/javascript-learn-event-loop-stack-queue.html)


`初學程式筆記，若文中有誤還請不吝指教`