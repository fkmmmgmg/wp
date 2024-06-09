/*單頁應用程式*/
import {sqlFetch} from '../lib/sql.js'/*導入sqlFetch(路徑位置sql.js)*/

export var R = {}/*全域對象R宣告，用於用於存儲一些可重複使用的函式或數據*/
let _id=0, _title=1, _body=2/*其他變數宣告*/

window.onhashchange = async function () {/*監聽瀏覽器的 hashchange 事件，當 URL 中的 hash 改變時執行相應的操作*/
  var r
  var tokens = window.location.hash.split('/')/*當網頁加載完成後執行的函式，用於初始化應用程序*/
  console.log('tokens=', tokens)
  switch (tokens[0]) {
    case '#show':
      let r = await sqlFetch('blog', `SELECT id, title, body FROM posts WHERE id=${tokens[1]}`)
      R.show(r[0]) // 取得第一筆傳入 (雖然只會有一筆，但 SELECT 預設會傳回很多比，所以用 results[0] 只取第一筆)
      break
    case '#new':
      R.new()//用於創建新的帖子，包括一個表單，用戶可以填寫標題和內容
      break
    default:
      let posts = await sqlFetch('blog', `SELECT id, title, body FROM posts`)
      R.list(posts)//用於顯示帖子列表，包括帖子標題和 "Read post" 鏈接
      break
  }
}

window.onload = async function () {
  await sqlFetch('blog', `CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)`)
  window.onhashchange()
}

R.layout = function (title, content) { //用於設置頁面的標題和內容
  document.querySelector('title').innerText = title
  document.querySelector('#content').innerHTML = content
}

R.list = function (posts) {//接受一個參數 posts
  let list = [] //代碼初始化了一個空數組 list，用來存放每個文章的 HTML 片段
  for (let post of posts) { //代碼使用 for...of 迴圈遍歷 posts 數組中的每個 post
    list.push(`
    <li> 
      <h2>${post[_title]}</h2>
      <p><a id="show${post[_id]}" href="#show/${post[_id]}">Read post</a></p>
    </li>
    `)
  } 
  /*<li>表示列表項目*/
  /*顯示文章標題，使用 post[_title] 插入標題內容*/
  /*顯示一個鏈接，點擊後會跳轉到文章詳細頁面，鏈接的 href 包含文章的 ID。*/
  let content = `
  <h1>Posts</h1>
  <p>You have <strong>${posts.length}</strong> posts!</p>
  <p><a id="createPost" href="#new">Create a Post</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return R.layout('Posts', content)
}
/*<ul id="posts">${list.join('\n')}</ul>：生成一個無序列表，其中包含所有文章的列表項目。list.join('\n') 將所有 HTML 片段連接成一個字符串，每個片段之間用換行符分隔*/
/*顯示一個鏈接，點擊後會跳轉到創建新文章的頁面。*/

R.new = function () {
  R.layout('New Post', `
  <h1>New Post</h1>
  <p>Create a new post.</p>
  <form>
    <p><input id="title" type="text" placeholder="Title" name="title"></p>
    <p><textarea id="body" placeholder="Contents" name="body"></textarea></p>
    <p><input id="savePost" type="button" value="Create"></p>
  </form>
  `)
  /*R.layout 方法返回的內容將作為 R.show 方法的返回值。這意味著 R.show 方法會生成並顯示包含文章詳細內容的頁面*/
  document.querySelector('#savePost').onclick = ()=>R.savePost()
}

R.show = function (post) {
  return R.layout(post[_title], `
    <h1>${post[_title]}</h1>
    <p>${post[_body]}</p>
  `)
  /*<h1>${post[_title]}</h1>：顯示文章的標題，使用 post[_title] 插入標題內容*/
  /*從 post 對象中獲取文章的標題。這裡使用了前面定義的 _title 索引（值為 1），表示 post 對象中存儲標題的字段*/ 
}
/*<p>${post[_body]}</p>：顯示文章的正文，使用 post[_body] 插入正文內容。這裡使用了 _body 索引（值為 2），表示 post 對象中存儲正文的字段*/
/*<h1>${post[_title]}</h1>：顯示文章的標題，使用 post[_title] 插入標題內容*/
/*R.layout 方法返回的內容將作為 R.show 方法的返回值。這意味著 R.show 方法會生成並顯示包含文章詳細內容的頁面*/

R.savePost = async function () { //用於保存新的帖子到數據庫中，並將用戶重定向到帖子列表頁面
  let title = document.querySelector('#title').value //選擇 id 為 title 的輸入框，並獲取其值，將其存儲在 title 變量中
  let body = document.querySelector('#body').value  //選擇 id 為 body 的文本區，並獲取其值，將其存儲在 body 變量中
  await sqlFetch('blog', `INSERT INTO posts (title, body) VALUES ('${title}', '${body}')`)
  /*向 'blog' 數據庫發送一個 SQL 查詢*/
  /*INSERT INTO posts (title, body) VALUES ('${title}', '${body}')：插入一個新帖子到 posts 表中，使用用戶輸入的標題和內容*/
  window.location.hash = '#list'
  /*這行代碼將窗口的哈希部分設置為 #list，這會觸發 window.onhashchange 事件，從而加載並顯示帖子列表頁面*/
}

/*R.savePost 函數的主要作用是保存新的帖子到數據庫中，並在保存成功後重定向用戶到帖子列表頁面*/
/*1.從表單中獲取用戶輸入的標題和內容*/
/*2.使用 sqlFetch 函數執行 SQL 查詢，將新帖子插入到數據庫中*/
/*3.將窗口哈希設置為 #list，觸發帖子列表頁面的加載*/
