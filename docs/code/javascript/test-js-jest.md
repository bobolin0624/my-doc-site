---
title: 初探 JEST 測試
date: 2022-02-21 00:00:00
categories: Note
tags:
- JavaScript
- JEST
thumbnailImagePosition: left
thumbnailImage: https://imgur.com/MxQrWxl.png
sidebar_position: 1
---


給 JavaScript 開發者的測試框架，跟 React 整合性最佳！為什麼呢？大概因為 JEST 也是 Facebook 團隊開發的 (?)這次主要會接觸到 JEST，是要在公司的專案裡頭試著導入，於是開始邊看邊實作，本篇就來簡單紀錄一點關於測試與 JEST 的基礎知識。

### Unit Test

這次主要是做單元測試，所謂單元測試，就是以專案中最小單位(function / method) 去驗證每個 function 可以輸出符合我們期望的回傳值。下面舉個最簡單的例子：

> 有一 add function，會回傳 a + b，當測試時賦值 a = 1, b = 2 時， output 預期應該回傳 3，但卻得到回傳值為 5 時，就可以回頭去確認邏輯是不是寫成 a * 3 + b 之類的，進行 debug

![image alt](https://miro.medium.com/max/1400/1*Dodv1f9UelXFsnZTXR81XA.png)

<br/>

### 單元測試有什麼好處？

其實自己身邊遇過真的有在寫測試的工程師真的不多，畢竟每次收到需求時都已經是壓到不能再壓的時程（？，但其實這次嘗試寫測試時，發現還是有好處的，像是驗證基本錯誤、避免改 A 壞 B、降低人工測試時間成本等等，有句話說 “ Code for six minutes, debug for six hours! ” 我想應該很多開發者都有過類似的經驗吧 :face_with_monocle: 

<br/>

### JEST

雖然這次不是 React 專案而是 Node.js 後端使用 JEST 做測試，但在導入時我仍然覺得使用 JEST 來寫測試很快速也方便，先前在其他專案協作時使用 TDD 開發，使用的是 mocha 測試框架，mocha 本身斷言庫及測試替身需要再額外安裝 chai 及 sinon 套件，而 JEST 本身就包含了這些 library，因此整個導入上有速度快且容易的優勢，從安裝套件到開始寫測試大概花不到兩分鐘，可以參考以下步驟 ( JEST 的[官方文件 :book: ](https://jestjs.io/docs/getting-started)算是淺顯易懂的，讓我這種不愛看官方文件的人也有耐心地翻閱了不少內容）

```
(1) install package
npm install jest --save-dev
(2) 在 package.json 的 scripts 中多加一行 test，如此跑測試時就可以使用 npm run test
{
  "scripts": {
    "test": "jest"
  }
}
(3) 新增 __tests__ 資料夾
(4) 新增 xxx.test.js 檔
```

基本上做完上面四個步驟後，接著就可以開始寫測試囉！

#### 測試怎麼寫？

以一個前些時間專案的 unit 為例，情境是每隔一段時間需要去判斷目前的工班是否已經換班，需要驗證的就是「是」或「否」這麼簡單

測試案例的撰寫，撰寫每一道測試需要先定義

* 測試的目標為何？

前一工班與現在工班是否換班(相同)，並回傳相同與不同的 result

```
test('compare pre and now work is changed', () => {
  測試程式
})
```

* 導入要測試的函式是什麼？

```
compareWork(pre, now)
```

* 測試的期望是什麼？

希望測試 [未換班] 的結果，期望回傳的 result 的是 false

```
expect(compareWork(pre, now)).toEqual({ result: false })

```

JEST 中有很多 Matchers 可以使用如 toBe, toEqual, toBeTruthy ...等等，可以依據測試案例去查找可用的 Matchers

這個 unit 的驗證還會有 [已換班] 的結果，此時就可以再繼續寫下一個案例來測試 [已換班] 啦。


#### 超方便的 Mock (替身)

測試時需要關注點分離，我們常常都會在函式裡面又引入另一個函式，但是我們要專心在測試要被測試的 Function (SUT — System Under Test 測試目標)，這時候就需要排除不確定性（例如錯誤可能來自另一個函示），此時就可以使用 Mock 來當作替身函式 (Test Double)，模擬其他相依函式 (DOC -Depended-on Component 依賴組件) 的回傳值（類似做假資料的意思）。

可以選擇要把單一 function mock 起來，也可以 mock 我們要串外部 api 的 module 像是 axios 套件。

```
// mock function
const mockFunction = jest.fn()

// mock module
jest.mock(‘../models/xxx’)
jest.mock(‘axios’)
```

接著就指定回傳值

```
// 指定永久回傳值（也可以指定回傳某個值一次）

mockFunction.mockReturnValue()
axios.get.mockReturnValue(response)
axios.mockReturnValue(response)
```


> 最後，簡單分享在開發時解決的一個問題

#### 環境變數

問題情境：在測試某個 function 並且程式碼中有使用 axios 呼叫 api 時，由於我將 url 為透過 launch.json 存取執行 process.env 環境再取得 config.json 設定檔中的網址，雖然測試案例已經 mock axios module，不過跑測試時因為沒有讀取到環境變數，導致程式碼跑出 undefined 的值進行報錯，測試就無法順利往下跑。

這部分因為在程式碼中又牽扯到作用域的關係，於是花了一些時間在嘗試，最後在官方文件中發現了JEST 提供 setupFiles 設定，檔案中可以直接設定程式碼中需要的 config 與環境變數，如此一來在每次 npm run test 的時候就會使用這支檔案的變數內容囉。


![image alt](https://miro.medium.com/max/1400/0*vrpcNJ4HS1vP_adm)

<br />

![image alt](https://miro.medium.com/max/1400/0*bdlPciJPxuFSgrDl)


設定好後就在 .jest/setEnvVars.js 中加入 process.env 的相關變數就可以啦！


在這個問題情境下，解法或許還有一種就是使用 dotenv 的套件來存取，不過還沒有時間實作測試是否可行，還盼有高手及前輩分享經驗~~

#### 最後的最後

記錄一下自己首次從研究測試框架到導入的微心得

* 藉以利用寫單元測試的過程，審視程式碼的維護性與完整性
* 寫單元測試更能理解寫出低藕合的 code 的好處，在高藕合程式碼的狀況下就必須使用大量 mock
* 必須儘量以不更動程式碼及邏輯為前提的狀態下寫測試，除非特例狀況或重構
* 測試程式也要有好的維護性與可讀性，須考量維護成本
* 專案中團隊的討論依然重要，包含寫測試的時間點、測試的粒度、規範等等（工程師們不要再逃避溝通啦～～～by ex-PM 的吶喊 😂）



`(初學程式筆記，若文中有誤還請不吝指教 ）`:nerd_face: