---
# sidebar_position: 2
---

# Linux 語法 - 服務管理基礎指令

如何使用 `systemctl` 指令管理 Systemd 中的服務，以 **anydesk** 為例，
因應公司資安的相關規範，要求我們在遠端至客戶做維運結束後，需確保服務確實被關閉，以及必須防範開機不要自動啟動服務。

要關閉服務，使用 **stop**，相反的要開啟就使用 **start**

```bash
sudo systemctl stop <service-name>.service
```

如果想確認服務真的有被關閉，可以使用 **status**

```bash
sudo systemctl status <service-name>.service
```
當看到 `Active: inactive (dead)` 的訊息，就代表現在服務是死亡狀態囉！

接著另一個指令我們希望在下次電腦開機時不要自動啟動服務，這時使用 **disable** 即可

```bash
sudo systemctl disable <service-name>.service
```

結束！