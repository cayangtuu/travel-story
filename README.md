# travel-story(旅行筆記)
**[網站連結](https://travel-story-390212.de.r.appspot.com/) ，歡迎瀏覽**
  
**以Node.js程式與Express.js框架進行JavaSript網頁開發，以ORM操作MySQL資料庫，並搭配RestfulAPI路由撰寫風格。**  
**旅行筆記**網頁提供使用者紀錄自己生活中大大小小旅行的過程與圖片，可以記錄、編輯並於自己的個人頁面中查看完整的資訊。同時也可以查看不同使用者的旅行分享、並對特定旅行紀錄進行收藏與按讚。  
未來在網頁更新上也會提供讓共同旅行的使用者們可以一同編輯與維護該則旅行紀錄的功能，使朋友間的旅行也能一起記錄、共同回憶。  

<div align="center">
	<img src="https://github.com/cayangtuu/travel-story/blob/main/public/travel-%E9%A6%96%E9%A0%81.PNG" width="400" height="300">
  <img src="https://github.com/cayangtuu/travel-story/blob/main/public/travel-%E6%97%85%E8%A1%8C%E5%88%97%E8%A1%A8.PNG" width="400" height="300">
</div>
<div align="center">
  <img src="https://github.com/cayangtuu/travel-story/blob/main/public/travel-%E5%80%8B%E5%88%A5%E6%97%85%E8%A1%8C.PNG" width="400" height="300">
  <img src="https://github.com/cayangtuu/travel-story/blob/main/public/travel-%E5%80%8B%E4%BA%BA%E9%A0%81%E9%9D%A2.PNG" width="400" height="300">
  </div>
<br/>

### 所需工具與版本
[Visual Studio Code](https://code.visualstudio.com/docs/?dv=win)  
[nvm](https://github.com/nvm-sh/nvm)  
[Node.js 16.9.1版本](https://nodejs.org/en)  
[MySQL 8.0以上版本](https://downloads.mysql.com/archives/installer/)  
[MySQL Workbench 8.0以上版本](https://downloads.mysql.com/archives/workbench/)
### 安裝與執行步驟
1. 打開終端機(Terminal)，將專案clone至本機位置
```
$ git clone https://github.com/cayangtuu/travel-story.git
```
2. 進入專案資料夾
```
$ cd travel-story
```
3. 安裝專案所需npm套件
```
$ npm install
```
4. 建立.env檔案並新增變數，可參考.env.example檔案
```
IMGUR_CLIENT_ID=
SESSION_SECRET=
```
5. 修改config/config.json中開發環境(development)的資料庫設定
```
"development": {
    "username": <username>,  //修改使用者名稱
    "password": <password>,  //修改使用者密碼
    "database": "travel_story",  
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```
6. 建立MySQL資料庫，於MySQL Workbench中輸入並執行以下指令：
```
create database travel_story;
```
7. 建立資料表與種子資料，於終端機(Terminal)輸入以下指令：
```
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```
若沒跳出錯誤訊息，即代表資料建置完成。另可至MySQL Workbench中的database做確認。

8. 切換至開發環境，並啟動伺服器
```
$ export NODE_ENV=development
$ npm run dev
```
終端機出現```App is running on port 8080!```字樣即代表伺服器正常啟動

9. 開啟任一瀏覽器並於網址列中輸入以下網址，即可開始使用網頁
```
http://localhost:8080 
```

### 測試帳號
```
email:user1@example.com
password:12345678
```

### 作者
[Doranne](https://github.com/cayangtuu) 
