# denoApiService

支援以下功能

1. fetch 跨站網頁
    * 範例：[webFetchEx.html](test/webFetchEx.html) / [webFetchEx.js](test/webFetchEx.js)
    * 注意：上述範例的 html 必須在伺服器上開啟才行 (例如用 deno 的 file_server)，否則還是會有 CORS 問題
2. sqlite 資料庫
    * 範例：[qadb.html](./test/qadb.html) / [qadb.js](./test/qadb.js) 
    * 應用：[blog](./blog/index.html)
3. upload 上傳檔案
    * 範例：[upload.html](./test/upload.html)


# 總結
這組代碼實現了一個基於 Deno 和 Oak 框架的簡單後端服務器，提供了 SQL 查詢、HTTP 請求轉發和文件上傳功能。前端使用 JavaScript 動態生成內容，通過 hash 路由處理不同的頁面視圖（列出文章、顯示文章、創建新文章）。
以下是主要組件的功能：

## denoApiService：
1.設置並啟動一個基於 Oak 的服務器，監聽 6789 端口。
2.使用 CORS 中間件允許跨域請求。
3.定義三個路由，分別處理 SQL 查詢、HTTP 請求轉發和文件上傳。

## handler.js：
1.sqlHandler：處理 SQL 查詢請求，執行 SQL 語句並返回結果。
2.fetchHandler：轉發 HTTP 請求，使用自定義的 oFetch 函數處理並返回結果。
3.uploadHandler：處理文件上傳，將上傳的文件保存到指定目錄。

## lib.js
lib.js 文件定義了一個名為 oFetch 的異步函數，該函數用於發送 HTTP 請求並返回請求的結果。這個函數主要用於處理其他模塊（如 handler.js）中的請求轉發邏輯。具體來說，它根據傳入的配置對象構造請求，發送請求，並處理響應。

## oFetch 函數
oFetch 函數是個通用的 HTTP 請求函數，允許靈活設置請求參數，並處理和返回請求結果，函數在 handler.js 中被用來轉發請求並獲取結果，從而實現簡單的代理功能。通過這種方式，oFetch 提供了一個簡單而強大的接口，用於發送和處理 HTTP 請求。
