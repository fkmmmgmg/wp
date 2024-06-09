let sqlUrl = "http://localhost:6789/sqlite"
/*這行代碼定義了一個變量 sqlUrl，其值是 SQL 服務器的 URL，即 http://localhost:6789/sqlite。這個 URL 是服務器端處理 SQL 請求的端點*/
export async function sqlFetch(db, cmd) {
    /*這是一個異步函數，用於向指定的 SQL 服務器發送請求*/
    /*export 關鍵字表示這個函數可以從這個模塊中導出，並在其他模塊中導入和使用*/
    let r = await fetch(sqlUrl, {
        body: JSON.stringify({db:db, sql:cmd}),
        /*使用 fetch 函數發送 HTTP POST 請求到 sqlUrl*/
        /*參數 db 指定了要操作的數據庫名稱*/
        /*參數 cmd 是要執行的 SQL 命令*/
        method: 'POST',
        /*method: 'POST' 表示使用 POST 方法發送請求*/
        headers: {
        'Content-Type': 'application/json'
        }
        /*headers 指定了請求的頭部，其中 Content-Type: 'application/json' 表示發送的數據格式是 JSON*/
    })
    if (!r.ok) {
        /*檢查響應對象 r 是否成功 (r.ok 為 true 表示成功),如果響應不成功，輸出錯誤信息到控制台，並返回 null*/
        console.log('sqlFetch:error! cmd=', cmd)
        return null
    }
    let obj = await r.json()/*使用 await r.json() 將解析成 JSON(JavaScript Object Notation ) 格式*/
    console.log('obj=', obj)
    return obj
    /*如果成功，解析響應的 JSON 内容並返回*/
}