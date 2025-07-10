---
title: MongoDB writeConcern 實測筆記 
date: 2025-07-10 15:00:00
categories: database
tags:
- mongodb
- writeConcern
---

在實作 MongoDB 應用程式時，writeConcern 的設定會影響資料寫入的可靠性與效能。這篇筆記記錄了針對不同 writeConcern 組合做的實際測試，當時的目的是為了確保在高可用性（High Availability）架構下，各節點資料能夠達成一致性。

### 什麼是 writeConcern 以及如何設定

writeConcern 是 MongoDB 寫入安全機制的設定，控制 mongo 寫資料的過程。
writeConcern 是屬於 collection 級別的參數，因此在定義 schema 的時候就進行設定。

參數定義
```js
writeConcern: {
  w: <數字 或 'majority'>,
  j: <boolean>, // 是否等待 journal 寫入
  wtimeout: <毫秒數> // 等待超時時間
}

```

設定不同的 w 值會影響資料寫入的確認程度：
w: 1：只要 primary 寫入成功就回應
w: 'majority'：必須等大多數節點都寫入成功才回應

### 實驗操作：不同情境下的回應時間與行為


#### 情境一：Secondary 關閉，w: 'majority'

```js
writeConcern: { w: 'majority', j: true, wtimeout: 5000 }
```

- ❗資料寫入 primary 成功，但因 secondary 無法回應，大約每 5 秒回傳一筆 `writeConcernError`
- 🌐 26 筆資料寫入共花費 26.6 秒（每筆耗時約 1 秒）
- 📌 若改成 `wtimeout: 1000`，錯誤訊息頻率為每秒 1 筆

#### 情境二：Secondary 關閉，w: 1

```js
writeConcern: { w: 1, j: true, wtimeout: 5000 }
```

- ✅ 寫入 primary 即完成，不等待 secondary
- ⚡ Response time 僅 206ms

---

#### 情境三：Primary 與 Secondary 都正常，w: 'majority'

```js
writeConcern: { w: 'majority', j: true, wtimeout: 5000 }
```

- ✅ 成功寫入 primary 並等待大多數節點回應
- ⏱️ Response time 約 379ms
- 相比沒設定 `writeConcern`（約 194ms），效能有明顯差異

---

### 小結論

| 測試情境 | writeConcern 設定 | Response time | writeConcernError |
|----------|-------------------|---------------|-----------|
| 關閉 secondary | w: 'majority', wtimeout: 1000 | 26.6s | ✅ 每秒錯誤 |
| 關閉 secondary | w: 1, wtimeout: 1000 | 206ms | ❌ |
| 所有節點正常 | w: 'majority' | 379ms | ❌ |
| 所有節點正常 | 未設定 | 194ms | ❌ |

---

### 補充

- 強調資料的一致性，建議使用 `w: 'majority'` 並設定合理的 `wtimeout`
- 建議搭配應用層 retry 策略來處理 `writeConcernError`，這裡的 Error 只代表「未達預期確認數」，資料仍已寫入 primary
- `w: 2` 只有在三節點架構下才與 `'majority'` 等效，五節點則不同，例如在三節點架構中，'majority' 需要 2 個節點確認，剛好與 w: 2 一致。但在五節點中，majority = 3，此時 w: 2 就不足以保障多數一致性。
