---
title: Flask 入門
date: 2024-11-20 14:01:00
categories: Note
tags:
- python
- flask
- backend
sidebar_position: 1
---

利用 chatGPT 協助開發 python ＆ flask 的簡易心得


### 緣起

此專案的目的單純是為了我想在本機端快速查找客戶資料，目前是寫在 .md 用 vscode ctrl + f 搜尋，但隨著客戶量越來越多希望可以有更好的整理，需求則是越輕量越好。

快速的列了大概的需求就問了 chatGPT，請他推薦我開發工具
推薦了 3 個
1. Python + Flask
2. JavaScript + Node.js + Express
3. JavaScript + Electron

平時工作上都以寫 JavaScript 為主，因此這次練習我選擇了 Python + Flask，不過 Electron 可以製作桌面應用，未來有機會也可以寫寫看。

**Let's start!**

我的 Python 版本是 `Python 3.8.10`

首先先建立一個虛擬環境

```bash
$ mkdir myproject
$ cd myproject
$ python3 -m venv .venv

$ . .venv/bin/activate
```

接著安裝 flask
```bash!
pip install Flask
```

### Flask 簡介
先來看一下 Flask 是什麼好了，Flask 是一個輕量的 Web 程式框架，用 Python 語言開發。
有接觸過 Python 的人應該都知道還有另一個 Web 框架叫做 FastAPI，目前待的團隊中有部份人就是使用 FastAPI 開發的，有一個令人羨慕的功能就是自動產出 Swagger 文件 ☝️ ，而 Flask 則有大量的第三方套件可以使用。
另外在效能上，FastAPI 似乎在處理大規模請求的狀況下表現較佳，也支援異步處理，不過因為這只是我個人的小練習加上只在本機執行使用，因此最後我選擇使用較好上手的 Flask。

### 建立 Flask 應用
接著在專案中新增 `app.py` 檔案

```python!
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '<p>Hello, World!</p>'
```

接著在 terminal 中執行 `flask run`，會看到一行
`Running on http://127.0.0.1:5000`，代表服務已經跑起來了，可以使用瀏覽器打開，將會看到瀏覽器顯示 Hello, World! 的文字。

#### 基本 CRUD 操作

在後端專案中，最基礎也最常見的功能莫過於 CRUD 的 API 操作。
以下介紹如何使用 Flask 框架完成，另外在練習 Flask 的時候因為存放資料的安全問題因此我沒有使用到資料庫，而是選擇使用 json 的套件存放 json file 在 local 中，因此如果想使用像 SQLite 或其他的資料庫，則需要另外學習相關的 ORM 或 query 語法。

若要使用 json file 的 CRUD API 操作，需要導入的模組有
```python!
from flask import Flask, request, jsonify
import json
import os
```

- POST （create） 建立 user 資料
    ```python
    @app.route('/users', methods=['POST'])
    def create_user():
        try:
            # 如果前端是 form post 帶入 api，可以使用 request.form['xxx'] 來取得 post 的 data
            # 或是使用 request.get_json() 取得
            # 查看既存資料
            with open(DATA_FILE, 'r') as f:
            users = json.load(f)
            # 新增 user，users 可以再自行定義 data 等等
            with open(DATA_FILE, 'w') as f:
            json.dump(users, f, indent=2)
            
            return jsonify(), 201
        except Exception as error:
            return jsonify({'error': str(e)}), 400
    ```
- GET (read) 以取得所有 user 為例
    ```python
    @app.route('/users', methods=['GET'])
    def get_users():
        # DATA_FILE 為 json file path
        with open(DATA_FILE, 'r') as f:
            users = json.load(f)
        return jsonify(users), 200
    ```
- POST (update) 利用 user_id 更新單一筆 user 資料 
    ```python
    @app.route('/users/<int:user_id>', methods=['PUT'])
    def update_user(user_id):
        try:
            updated_data = request.get_json()

            with open(DATA_FILE, 'r') as f:
                users = json.load(f)

            for user in users:
                if user['id'] == user_id:
                    user.update(updated_data)
                    break
            else:
                return jsonify({'error': 'User not found'}), 404

            with open(DATA_FILE, 'w') as f:
                json.dump(users, f, indent=4)

            return jsonify({'message': 'User updated successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    ```
- DELETE (delete) 刪除單一筆 user 資料
    ```python
    @app.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        try:
            with open(DATA_FILE, 'r') as f:
                users = json.load(f)

            updated_users = [user for user in users if user['id'] != user_id]

            if len(updated_users) == len(users):
                return jsonify({'error': 'User not found'}), 404

            with open(DATA_FILE, 'w') as f:
                json.dump(updated_users, f, indent=4)

            return jsonify({'message': 'User deleted successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    ```

#### UI 介面

接下來是畫面的部份，可以直接使用基本的 HTML / CSS / JS 完成，呼叫 Flask 所開發的 API 呈現 CRUD 操作結果。
專案結構大致如下
```
project/
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── styles.css
│   └── api.js
└── users.json
```

剩下的切版與細節部份就不贅述囉，把我練習的 [repo](https://github.com/bobolin0624/flask-easy-management/tree/develop) 放上來供參~~

