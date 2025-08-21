---
title: 
date: 2025-08-21 03:21:00
categories: Note
tags: 
- GIT

sidebar_position: 1
---

某次 coding 到一半，突然出現 git graph 轉很久，git changes 也爆掉，一直以為是 vscode 版本更新導致套件相容出現的錯誤，後來才發現有可能是我在執行 yarn test / yarn start build 時中途強制中斷，導致專案目錄裡冒出大量暫時性檔案（我遇到的是 node_modules 裡又生成一個 node_modules 2 資料夾，超詭異 🤯）。
這些檔案雖然沒有被 Git 追蹤，但 Git 在執行 `git status` 時仍需要掃描整個工作目錄來判斷哪些是 **untracked files**。再加上 VS Code 會在背景持續讀取與刷新版本控制狀態，整個操作就變得非常怪異。 

在卡頓的情況下，情急之下我又嘗試進行一些 Git 操作，結果衝突發生，最終留下了 `index.lock`，造成後續所有 Git 指令都報錯的狀況。

#### 什麼是 index.lock？

當執行需要寫入 Git **index** 的命令（例如 `git add`）時，Git 會在 `.git` 目錄中建立一個臨時鎖定檔案 **`index.lock`**。 
這個檔案的用途是避免多個 Git Process 同時修改索引，造成資料衝突。 

一般來說，命令執行完成後，Git 會自動刪掉這個鎖定檔案。 
但如果 Git 過程沒有正常結束，就可能導致 `index.lock` 沒有被移除，進而讓後續的 Git 操作失敗，出現類似：

```bash
Git failed with a fatal error
fatal: Unable to create '.git/index.lock': File exists.
```

#### 解法
1. **重開 VSCode**（有時候就能解決） 
2. **重開機**（萬用大絕，但記得先存檔 XD） 
前兩個我都試過了，都不行，最後我是用下面方法解決的
3. **手動刪除 `index.lock`** 
   - 刪除前先確保沒有任何 Git Process 正在執行 
   - 在專案根目錄執行： 

     ```bash
     rm -f .git/index.lock
     ```

Git 的鎖定機制是為了保護專案不被同時修改導致錯亂。
人生不能重來，但 Git 可以 -- 😆


[參考資料](https://blog.darkthread.net/blog/failed-to-create-index-lock/)]

