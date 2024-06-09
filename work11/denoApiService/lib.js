export async function oFetch(o) { //oFetch 的異步函數。這個函數接受一個參數 o，o 應該是一個包含請求相關信息的對象
    let r = await fetch(o.url, {  //使用 fetch API 發送 HTTP 請求
        body: o.method == 'GET'?undefined:o.body,
        //o.url 是請求的目標 URL。
        //body 屬性指定了請求的主體內容。如果請求方法是 GET，則 body 為 //undefined（因為 GET 請求不應該有主體內容）。否則，body 設置o.body。
        //method 屬性指定了請求方法。如果未指定，默認為 GET。
        //headers 屬性指定了請求的頭信息。如果未指定，默認為空對象 {}
        method: o.method || 'GET',
        //o.method 是從參數 o 中獲取的請求方法
        //如果 o.method 未定義或為假值（如 null、undefined、0、false 等），則使用默認方法 'GET'
        //|| 運算符表示“邏輯或”，即如果 o.method 存在且為真值，則使用 o.method；否則使用 'GET'
        headers: o.headers || {},
        //|| 運算符表示“邏輯或”，即如果 o.headers 存在且為真值，則使用 o.headers；否則使用 {}
    })
    if (!r.ok) { //這行檢查變量 r（代表 HTTP 響應）的 ok 屬性。如果 r.ok 為 false，表示響應不成功
        console.log('webFetch:error! o=', o, 'r=', r) //如果響應不成功，則在控制台輸出錯誤信息。輸出的內容包括 'webFetch:error!' 字串，以及變量 o 和 r 的值
        return null //返回 null 以表示請求失敗
    }
    //檢查響應是否成功 (r.ok 是 true 表示成功，否則表示失敗)。如果響應失敗，將錯誤信息輸出到控制台，並返回 null
    let text = await r.text()
    return text
    //如果響應成功，將響應的文本內容讀取並返回
  }
  
  
