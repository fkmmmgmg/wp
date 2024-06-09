import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { oFetch } from "./lib.js"
//導入從 ./lib.js 文件中導出的 oFetch 函數。這個函數將在稍後被用來處理請求的 JSON 內容
export async function sqlHandler(ctx) {
// 函數定義的開始，接收一個上下文對象（`ctx`），該對象包含請求和響應相關的信息
    const body = ctx.request.body(); // content type automatically detected
    console.log('body = ', body) //這行代碼將請求的主體內容輸出到控制台，方便調試和檢查請求的內容
    if (body.type === "json") { //檢查請求的主體內容類型是否為 JSON。如果是 JSON，則進行後續處理
        let json = await body.value  // 12.0.0 版， 新版為 let json = await body.json()
        console.log('json=', json)  //檢查請求的主體內容類型是否為 JSON。如果是 JSON，則進行後續處理
        let db = json.db //從 JSON 中提取資料庫名稱（db）和 SQL 查詢語句（sql）
        let sql = json.sql
        const dbo = new DB(`db/${db}.db`) //使用資料庫名稱打開對應的 SQLite 資料庫。DB 是從 SQLite 模組導入的類，用於打開和操作 SQLite 資料庫
        let result = sql ? dbo.query(sql) : '[]' //如果提供了 SQL 查詢語句，則執行該查詢，並將結果存儲在 result 變量中；如果沒有提供 SQL 查詢語句，則設置 result 為空數組 '[]'
        dbo.close() //查詢完成後關閉資料庫連接，釋放資源
        ctx.response.body = result  //將查詢結果設置為響應的主體內容，返回給請求的客戶端
    }
}

export async function fetchHandler(ctx) {
    // 函數定義的開始，接收一個上下文對象（`ctx`），該對象包含請求和響應相關的信息
    const body = ctx.request.body(); // content type automatically detected
    //請求中獲取主體內容，並輸出到控制台以便調試
    console.log('body = ', body)
    if (body.type === "json") {
        // 如果主體內容類型是 JSON，則進行處理
        let json = await body.value
        // JSON 內容，並將其輸出到控制台以便調試
        console.log('json=', json)
        //使用 oFetch 函數對解析出的 JSON 內容進行處理，並將結果輸出到控制台以便調試
        let result = await oFetch(json)
        console.log('result=', result)
        //使用 oFetch 函數對解析出的 JSON 內容進行處理，並將結果輸出到控制台以便調試
        ctx.response.body = result
        //將處理結果設置為響應的主體內容，返回給請求的客戶端
    }
}

export async function uploadHandler(ctx) { //定義並導出一個名為 uploadHandler 的異步函數，用於處理請求
    const body = await ctx.request.body({ type: 'form-data' }) //請求中獲取主體內容，並指定內容類型為 form-data。這表示請求的內容是一個表單數據，通常包含文件上傳
    const data = await body.value.read() //解析表單數據並讀取其內容
    console.log(data)
    console.log("fields=", data.fields)
    //將解析出的表單數據輸出到控制台進行調試，包括表單中的字段內容
    let r = []
    //初始化一個空數組 r，用於存儲處理後的文件信息
    for (let f of data.files) { //遍歷表單數據中的文件列表
        console.log("filename=", f.filename)
        //將每個文件的臨時文件名和原始文件名輸出到控制台進行調試
        console.log("originalName=", f.originalName)
        await Deno.copyFile(f.filename, `./upload/${f.originalName}`)
        //將臨時文件移動到指定的目錄（./upload），並使用原始文件名
        await Deno.remove(f.filename)
        //刪除臨時文件，釋放資源
        r.push({file:f.originalName})
        //將處理後的文件信息（包含原始文件名）添加到數組 r 中
    }
    ctx.response.body = r
    //將數組 r 設置為響應的主體內容，返回給請求的客戶端
}

//處理發送到 /sqlite 路由的 POST 請求。它會接收 JSON 格式的請求內容，其中包括資料庫名稱和 SQL 查詢語句
//解析 JSON 內容，提取資料庫名稱和 SQL 查詢語句
//打開對應的 SQLite 資料庫，執行 SQL 查詢
//將查詢結果設置為響應的主體內容，返回給請求的客戶端

//定義並導出一個名為 uploadHandler 的異步函數，用於處理請求
//這樣的設計允許服務器處理文件上傳並將文件存儲到特定目錄，然後將文件信息返回給客戶端
