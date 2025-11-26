---
title: 演算法筆記 - LeetCode 128: 為什麼 Sorting 不行？從直覺到 O(n) 的思考轉變
date: 2025-11-26 02:46:00
categories: Note
tags:
- leetcode
- algorithm
- JavaScript
sidebar_position: 1
---

在處理陣列問題時，我往往習慣「先排序，再處理」。然而，當題目對時間複雜度有嚴格要求時，排序往往會成為效能瓶頸。這篇筆記記錄了我在解 LeetCode 128 (Longest Consecutive Sequence) 時，如何從直覺的排序解法轉變為 $O(n)$ 的 Hash Set 解法。

## 題目描述

給定一個未排序的整數陣列 `nums`，找出其中「最長連續序列」的長度。
**關鍵限制：** 演算法的時間複雜度必須是 **$O(n)$**。

**範例：**
```javascript
Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4
// 解釋: 最長連續序列是 [1, 2, 3, 4]，長度為 4
```

### 未經大腦的直覺暴力解題

```js
const sortedArr = nums.sort((a, b) => a - b);
// 進行 for 迴圈檢查
```

但題目明確寫到 `You must write an algorithm that runs in O(n) time.`，所以這樣的解法很明顯是不符合效能需求的。

### 突破時間複雜度

既然排序已經不能用，對於看到 O(n) 的想法，可以先排除

❌ Sort (排序)：通常是 $O(n \log n)$  
❌ 雙層迴圈 (暴力解)：通常是 $O(n^2)$  

剩下常見的就是用

✅ Hash Map / Set：用空間換時間  
✅ Two Pointers (雙指針)：在陣列上滑動

這題可以用 hash map 來解

Pseudo-Code 的思路大概是這樣
```md
1. 請大家排好隊，進入一個 Set（方便快速查找）
2. 從第一個人開始看，假設第一位號碼是 `3`，就問說有沒有比 3 號碼更小的？
3. 有的話代表他不是頭，就略過 3 ，繼續找
4. 沒有的話代表 3 是頭，接著開始往後面號碼點名，看連續的號碼有幾位直到號碼斷掉，紀錄下總共幾位（長度）
5. 繼續往後看下一位號碼，依此類推 
```

實作程式碼

```js
const arr = [4, 200, 1, 100, 101, 3, 2, 102, 103, 104];

function findLongest(arr) {
  if (arr.length === 0) return 0;
  const numSet = new Set(arr);
  let maxStreak = 0;
  for (const num of numSet) {
    // 排隊點名，第一個先點，找出有沒有比他前面的數字
    // 有 => 此人可以略過
    // 沒有 => 此人是頭 =>
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      // 找出 後面有幾個人 has(num + 1)
      // 有，更新長度
      // 沒有，結束
      while (numSet.has(currentNum + 1)) {
        currentNum = currentNum + 1;
        currentStreak += 1;
      }
      // 比完
      maxStreak = Math.max(maxStreak, currentStreak);
    }
  }
  return maxStreak;
}

findLongest(arr);
```

### 心得：如何理解時間複雜度

時間複雜度一直是我的罩門（常常搞不太清楚）
為什麼用了 for 迴圈又加上 while 兩層，還可以在 $O(n)$ 的範圍中而不是 $O(n^2)$，原因是雖然看起來是兩層迴圈，但只有在找到數字頭的狀況下（外層的 for 迴圈有符合條件），才會進入 while 迴圈，換句話說，每個數字最多只會被被點名到一次，不會有被重複點名的狀況。


