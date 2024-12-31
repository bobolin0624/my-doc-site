---
title: kubectl 常用服務指令
date: 2024-12-31 13:08:02
categories: kubernetes
tags:
- kubernetes
- k8s
- kubectl
---

在 Kubernetes(K8s)中，常使用 kubectl 來作為管理和操作叢集的指令工具，以下筆記一些在工作上常用的 command。

### 基本語法結構

```bash!
kubectl [command] [TYPE] [NAME] [flags]
```

細節說明

`command` - 執行的操作，包含像是 get, delete, describe, ... 等
`type` - 資源類型，包含 pod, service, deployment, ... 等
`NAME` - 為要操作的資源名稱
`flags` - 其他選項參數

這樣會有點抽象，下面列出一些實用的操作

#### namespace

取得所有的命名空間 namespace
```bash!
kubectl get namespace

# 簡寫
kubectl get ns
```

#### pod

取得所有 namespace 下的 pod
```bash!
kubectl get pods -A
```

取得特定 namespace 底下的 pod
```bash!
kubectl get pods -n <namespace>
```

加上 -o wide 可以取得更多資訊（如運行在哪個 node 上 / IP 等）
```bash
kubectl get pods -n <namespace> -o wide
```

查看 pod log 範例
```bash
kubectl logs <pod-name> -n <namespace> -f --timestamps --tail=20
```

logs 後續可以加上一些常用參數
- `-f` 持續追蹤新的 log 輸出
- `--timestamps` 顯示時間戳記
- `--tail=N` 只顯示最後 N 行
- `--since=duration` 顯示特定時間內的日誌（如 1h, 5m）
更多可以參考[官方文件](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#logs)的說明

#### deployment

有時候會面臨一些需要版本更新的情境，這時候可以應用到 deployment 操作

取得 deployments
```bash=
kubectl get deployments -n <namespace>
```

編輯 deployments YAML 檔案
```bash=
kubectl edit deployment/<deployment-name> -n <namespace>
```

重啟服務
```bash=
kubectl rollout restart deployment/<deployment-name> -n <namespace>
```

開發人員在服務都 deploy 之後，最常會需要做的事情就是進行除錯，有幾個小 tips 可以分享分享

1. 使用 `kubectl describe` 查看節點的狀態
2. 使用 `kubectl logs` 查看日誌紀錄
3. 可以搭配 `| grep` 快速過濾部份資訊


結束！這算是我個人小小整理的速查表，供參！

