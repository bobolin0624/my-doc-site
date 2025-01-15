---
title: 踩坑 - package.json 套件版本
date: 2025-01-14 15:39:00
categories: Note
tags:
- node.js
- npm
- backend
sidebar_position: 1
---

## 前言 - coding 前請詳閱公開說明書

在 npm 套件進行升版後，最近遇到了一個坑，藉由這篇文章來補補坑洞

一般升級套件版本，我用過兩種方式
1. 清掉舊有安裝：
    * 刪除 package-lock.json 和 node_modules 資料夾
    * 在 package.json 中指定新版本
    * 執行 npm install
2. 直接更新特定套件：
   * 執行 `npm uninstall {package-name}`
   * 執行 `npm install {package-name}@{version}`

## 意外發現的套件版本小坑

而最近在做高可用性（High Availability）架構災難測試，意外發現了一些套件版本控制的小問題。
因為目前團隊後端是微服務架構，因此是由不同的開發者各自維護，雖然 `package.json` 中 dependencies 的版本寫的 `"mongoose": "^6.5.5"`，但`package-lock.json` 版本卻是 `"6.13.5"`

## 造成什麼問題？

我們在測試時，發現僅部份服務的 mongo 連線有問題（至於 mongoose 在 HA 相關的處理後續有機會再寫一篇文章說明），而有些沒有，這導致應用 debug 的困難，因為不斷的疑惑在「表面上」一樣的版本下，為什麼會有結果不一樣的狀況，查到後來才發現原來套件版本根本不一致，mongoose auto-reconnect 連線機制在 6.13.5 會是相對穩定的版本

## 了解 NPM 版本控制符號

來看看專案中 package.json 的套件版本寫法
```javascript!
"mongoose": "^6.5.5"
```
有一個前綴 `^`，這符號代表什麼呢？

查看了一下 npm 文件，發現其實有說明，以下挑出常用的版本控制寫法

1. 無前綴（version）
    * 必須完全匹配指定版本
    * 例："mongoose": "6.5.5"

2. 波浪號（~version）
    * 「Approximately equivalent to version」
    * 鎖定主要版本和次要版本
    * 例：`~6.5.1` 表示 `>=6.5.1` 且 `<6.6.0`

3. 插入號（^version）
   * 「Compatible with version」
   * 僅鎖定主要版本
   * 例：`^6.5.5` 表示 `>=6.5.5` 且 `<7.0.0`


所以當我們寫上 `^6.5.5` 指的並不是指定 `6.5.5` 版本，而是有條件的抓取更新版本，才會導致服務之間版本不一致的問題，若未來要指定安裝版本記得不要寫前綴就可以囉！


另外 NPM 貼心的提供了一個工具可以查詢版本範圍：[semver calculator](https://semver.npmjs.com/)。只要輸入版本範圍，就能看到符合條件的所有版本。
