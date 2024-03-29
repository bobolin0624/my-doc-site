# Linux 語法 - 如何安裝驅動程式

##### 以 NVIDIA 的顯示驅動程式為例

- 首先到官方找到要下載的 driver run 檔案  
  [download](https://www.nvidia.com/zh-tw/drivers/unix/linux-amd64-display-archive/)


- 使用 `sudo telnit 3` 關閉 GUI 

- 接著到達驅動程式安裝檔的路徑

```bash
cd {/path/to/NVIDIA_driver}
```
- 執行安裝

```bash
sudo sh ./{NVIDIA_driver file}
```
- 安裝完成 `sudo telnit 5` 回到 GUI 介面

##### 以 Realtek 網卡安裝 WiFi 驅動程式為例

- 安裝開發工具用於編譯驅動程式

```bash
sudo apt install build-essential -y
```

- 新增資料夾目錄

```bash
mkdir -p ~/build
```

- 指定到目標目錄

```bash
cd ~/build
```

- 安裝 git 工具

```bash
sudo apt install git
```

- clone 驅動程式的專案

```bash
git clone https://github.com/brektrou/rtl8821CU.git
```

- 指定到專案目錄

```bash
cd rtl8821CU
```

- 編譯驅動程式

```bash
make
```

- 安裝驅動程式

```bash
sudo make install
```

結束！