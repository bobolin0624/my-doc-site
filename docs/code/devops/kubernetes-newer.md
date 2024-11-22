---
title: Kubernetes 到底是什麼 
date: 2024-07-18 12:02:02
categories: kubernetes
tags:
- kubernetes
- k8s
- k3s
---

官方文件的介紹：
> Kubernetes, also known as K8s, is an open source system for automating deployment, scaling, and management of containerized applications.

Kubernetes 又被稱作 k8s，是一個可以自動化部署、擴充、和管理容器化應用服務的開放原始碼系統。

---

看完一頭霧水，也不知道從何學起，這是我一開始接觸 k8s 的心態。
後來有鑒於公司使用 k3s 來做服務管理，才開始慢慢實際應用，那什麼又是 K3s？
可以把它理解為輕量化的 Kubernetes，不必使用到大量的系統資源，即可管理 containers，適合應用在邊緣運算或是 IoT 設備。
順道提一下 k9s，提供了互動式的界面，相對輸入指令更方便直觀，容易上手的多，也方便查詢。（不過之前在團隊中有遇過 k9s 殘存佔滿記憶體的狀況，所以還是要謹慎使用）

### 學習與使用契機

目前所在的團隊後端是使用微服務架構，搭配 Docker、GitLab 自動化部署，產品模組各自獨立運行，在 DevOps 主管已經建立好基礎架構下，後續慢慢的將版控交予各自負責的人，也因此這裡就顯現了使用 k3s 能夠靈活的管理容器的好處。

### 實際應用

平常工作上大部分會利用 kubectl 來做一些基本的叢集管理，`kubectl` 是 Kubernetes 的 CLI 工具，就是用來操作和管理叢集。
以下是我最常用的操作：
 - 部署應用
 - 查看應用 LOG（debug）
 - 管理服務環境變數

關於更多實用的 kubectl 指令和使用案例，會在後續的文章中詳細介紹。

