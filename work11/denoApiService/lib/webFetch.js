let gateUrl = "http://localhost:6789/fetch"
/*這行代碼定義了一個變量 gateUrl，其值是網關的 URL，即 http://localhost:6789/fetch。這個 URL 是後端服務器的接口，用於處理 HTTP 請求*/
export async function webFetch(o) {
    /*這是一個異步函數，接受一個參數 o，該參數是要發送的請求內容*/
    let params = { /*定義了一個 params 對象，包含了 HTTP 請求的參數配置*/
        body: JSON.stringify(o),/*body 屬性將參數 o 轉換為 JSON 字符串*/
        method: 'POST', /*method: 'POST' 表示使用 POST 方法發送請求*/
        headers: { /*headers 屬性指定了請求的頭部，其中 "Content-Type": "application/json" 表示發送的數據格式是 JSON*/
            "Content-Type": "application/json",
        }
    }
    console.log('params=', params) /*使用 fetch 函數向指定的 URL gateUrl 發送 HTTP POST 請求，並帶上之前定義的參數 params*/
    let r = await fetch(gateUrl, params)
    if (!r.ok) {
        console.log('webFetch:error! o=', o, 'r=', r)
        return null
    }/*在 webFetch 函數中，這個 URL 用於 fetch 函數的第一個參數，表示要將 HTTP 請求發送到 http://localhost:6789/fetch 這個地址*/
    let text = await r.text()
    /*如果響應成功，使用 await r.text() 將響應的內容解析為文本*/
    return text
    /*回解析出的文本內容*/
}
/*指定服務器上的具體路徑或端點。這個端點通常對應於後端服務器上的某個處理請求的路由或控制器*/ 