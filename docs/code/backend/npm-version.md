---
title: npm & lockfileVersion 版本衝突紀錄
date: 2023-12-02 11:32:00
categories: Note
tags:
- node.js
- cicd
- backend
sidebar_position: 1
---

在專案開發過程中，升級套件和 Node.js 版本是常見的情況。然而，這個過程可能會遇到一些意想不到的挑戰，特別是在持續整合（CI）環境中。某次專案開發時剛好遇到需要升級套件的狀況，升級套件又剛好需要更高版本的 nodejs 才支援，然後就在途中遇到了 gitlab runner build code 失敗的狀況，以下藉此紀錄一下解決方法。

### 問題
package-lock.json 是 npm 用於鎖定專案依賴關係的檔案。
其中有一個屬性：lockfileVersion，因為在升級 Node.js 時，npm 也可能會升級，進而在 npm install 會隨著你 install 當下的環境產生對應的版本。

[官方文件](https://nodejs.org/en/about/previous-releases)中可以看到各個 node 版本對應綁定的 nvm 版本，以我這次遇到的狀況為例

Node.js v12.22.12 使用 npm v6.14.16 ，生成的 lockfileVersion 為 1。
Node.js v14.19.2 使用 npm v6.14.17，lockfileVersion 一樣也是為 1，因此如果本機開發環境使用更新版本而產生的 lockfileVersion 的版本為版本 2 或更高版本(如我本機當下環境為 16 or 18 以上)
，在 push commit 後 Dockerfile 則是抓取抓取較舊的 node image，這時在 gitlab runner build code 的時候可能就會發生失敗，出現套件相關的錯誤。


### 解決

如果真的遇到版本升級相關的建置錯誤時，建議：

- 檢查 package-lock.json 的 lockfileVersion
- 確保 CI/CD 環境的 Node.js 和 npm 版本與本地開發環境一致
- 在本機環境使用相同版本，重新產生 package-lock.json

所以如果下次有遇到版本或 Node.js 升級又遇到 build code error 跟套件有關的錯誤的話，可以嘗試往 package-lock.json 的 lockfileVersion 方向去找~

[參考資料] (https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json#lockfileversion)

