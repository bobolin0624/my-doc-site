---
# sidebar_position: 1
---

### Linux 語法 - 如何關閉佔用的 port 

<!-- 實用的學習資源 https://linux.vbird.org/linux_basic/centos7/0340bashshell-scripts.php#script -->


我們會使用 ssh 加密連線到 client 端，並選定特定的 port 啟動，但 port 有時候會被佔用（你可能會看到 `already in use` 之類的）

此時就可以利用語法來檢查哪個程序在佔用

```bash
lsof -wni tcp:{port}
```

接著就會看到哪些 process 在使用這個 port，並且列出 PID\
終止該進程釋放該 port 的指令很簡單 (殺了他~~)

```bash
kill {PID}
```

結束！