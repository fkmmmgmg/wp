import { Application, Router} from "https://deno.land/x/oak@v12.0.0/mod.ts" // "https://deno.land/x/oak/mod.ts";
//從 "https://deno.land/x/oak@v12.0.0/mod.ts" 導入 Application 和 Router 模塊
import { oakCors } from "https://deno.land/x/cors/mod.ts";
//從 "https://deno.land/x/cors/mod.ts" 導入 oakCors 以啟用 CORS
import { sqlHandler, fetchHandler, uploadHandler } from './handler.js'
//從本地文件 './handler.js' 中導入 sqlHandler、fetchHandler 和 uploadHandler 函數
const app = new Application()//創建一個新的 Application 實例 app
const router = new Router()//創建一個新的 Router 實例 router

router.post('/fetch', fetchHandler)//'/fetch' 路由由 fetchHandler 處理
router.post('/sqlite', sqlHandler)//'/sqlite' 路由由 sqlHandler 處理
router.post('/upload', uploadHandler)//'/upload' 路由由 uploadHandler 處理

app.use(oakCors()); // Enable CORS for All Routes //使用 oakCors() 啟用 CORS，允許所有路由進行跨域請求
app.use(router.routes())//使用 router.routes() 中間件處理定義的路由
app.use(router.allowedMethods())//使用 router.allowedMethods() 中間件允許的 HTTP 方法

console.log('Server run at http://127.0.0.1:6789') //輸出伺服器運行的信息到控制台，顯示伺服器運行在 http://127.0.0.1:6789
await app.listen({ port: 6789 })//使用 app.listen({ port: 6789 }) 啟動伺服器，監聽 6789 端口


//Application：允許你使用和管理中介軟體。中介軟體是處理請求和響應的一種機制，它們可以在請求到達最終處理程序之前或響應發送回客戶端之前，對請求和響應進行修改。你可以使用中介軟體來執行各種任務，例如日誌記錄、身份驗證、CORS 處理等
//Router ：路由通常由 Router 類處理，但 Application 負責將路由中介軟體連接到應用程序上，從而實現對不同 URL 請求的分發和處理
//啟動伺服器：Application 提供了 listen 方法，用於監聽指定端口上的傳入請求，從而啟動伺服器
//oakCors 是 Oak 框架中的一個中介軟體，用於處理 CORS 設置。允許和控制跨域請求，這在現代 Web 開發中非常重要，特別是當你的前後端應用程序分別部署在不同的域名或端口上時
//fetchHandler 函數：檢查請求的主體內容是否為 JSON，然後解析 JSON，使用 oFetch 函數處理該 JSON，最後將處理結果返回給客戶端
//sqlHandler 函數：處理發送到 /sqlite 路由的 POST 請求。它會接收 JSON 格式的請求內容，其中包括資料庫名稱和 SQL 查詢語句


