# Linux 語法 - 如何安裝驅動程式

##### 以 NVIDIA 的顯示驅動程式為例

- 首先到官方下載到 driver run 檔案後

https://www.nvidia.com/zh-tw/drivers/unix/linux-amd64-display-archive/

- 使用 `sudo telnit3` 關閉 GUI 
- 接著到達驅動程式安裝擋的路徑
```
cd {/path/to/NVIDIA_driver}
```
- 執行安裝
```
sudo sh ./{NVIDIA_driver file}
```
- 安裝完成 `sudo telnit 5` 回到 GUI 介面

##### 以 Realtek 網卡安裝 WiFi 驅動程式為例

- 安裝開發工具用於編譯驅動程式

```
sudo apt install build-essential -y
```

- 新增資料夾目錄

```
mkdir -p ~/build
cd ~/build
```

- 安裝 git 來 clone 驅動程式的專案

```
sudo apt install git
```
```
git clone https://github.com/brektrou/rtl8821CU.git
```

- 進入專案目錄

```
cd rtl8821CU
```

- 編譯驅動程式

```
make
```

- 安裝驅動程式

```
sudo make install
```

結束！