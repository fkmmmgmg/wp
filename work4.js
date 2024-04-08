//請寫一個 min(a,b) 函數傳回 a, b 裡較小的那個數字
let a = prompt("輸入數字");
let b = prompt("輸入數字");
function min(a, b) {
    return a < b ? a : b;
}
console.log(min(a,b));

//請寫一個 arrayMin(a) 函數傳回陣列 a 裡最小的那個數字
let userInput = prompt("輸入值，用逗號分隔：");
let arr = userInput.split(",").map(Number);


function arrayMin(a) {
    if (a.length === 0) {
        return null; // 如果數組是空，返回 null
    }

    let min = a[0]; // 設數组的第一个元素是最小值
    for (let i = 1; i < a.length; i++) {
        if (a[i] < min) {
            min = a[i]; // 更新最小值
        }
    }
    return min;
}

console.log("數组最小值：",  arrayMin(arr));

//請寫一個 filter(a, f) 函數可以根據 f 成功或失敗過濾掉那些不合的內容
let filteredArr = filter(arr, function(x) { return x % 2 === 1; });
function filter(a, f) {  //a為arr，f為公式
    let result = [];
    for (let i = 0; i < a.length; i++) {
        if (f(a[i])) {  //()內為x質也就是arr內的質
            result.push(a[i]);
        }
    }
    return result;
}

console.log(filteredArr);

//請寫一個函數 weekday(str) 可以把星期幾的英文轉換成數字（0,1,2,3,4,5,6) (Sunday 是 0)
let week = prompt("輸入星期幾的英文");

function weekday(str) {
    switch (str.toLowerCase()) {
        case 'sunday':
            return 0;
        case 'monday':
            return 1;
        case 'tuesday':
            return 2;
        case 'wednesday':
            return 3;
        case 'thursday':
            return 4;
        case 'friday':
            return 5;
        case 'saturday':
            return 6;
        default:
            return -1; // 如果输入的是無效的星期幾，返回 -1
    }
}

console.log(weekday(week));

//請寫一個函數 countChar(str) 可以算出一個字串中，每個字出現幾次。
let str = prompt("輸入字串");

function countChar(str) {
    let charCount = {}; // 創建一个空對象，用於存放每个字符的出現次數

    // 遍歷字串，統計每个字符出现的次數
    for (let char of str) {
        // 如果當前字符已經在 charCount 對象中，就將其出現次數加一，否則將其初始值設為1
        if (charCount[char]) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    }

    return charCount;
}

//轉換字符

function formatResult(result) {
    let output = "{ ";
    for (let key in result) {
        output += `${key}: ${result[key]}, `;
    }
    output = output.slice(0, -2); // 去除最后的逗號和空格
    output += " }";
    return output;
}

console.log(` "${str}" => ${formatResult(countChar(str))}`); // 打印结果


//寫一個函數 gcd(a,b) 傳回 a, b 兩數字的最大公因數
let c = prompt("輸入數字");
let d = prompt("輸入數字");

function gcd(c, d) {
    // 利用歐幾里得算法(輾轉相除)
    while (d !== 0) {
        let temp = d;
        d = c % d;
        c = temp;
    }
    // 當 b 為 0 時，a 就是最大公因數
    return c;
}

//寫一個函數 lcm(a,b) 傳回 a, b 兩數字的最小公倍數。
function lcm(c, d) {
    // 計算算最小公倍数
    return (c * d) / gcd(c, d);
}
console.log(`最大公因數：${gcd(c, d)}`);
console.log(`最小公倍數：${lcm(c, d)}`);

//請寫一個函數 gradient(f, p) 可以計算 f 在 p 點的梯度
const h = 0.01; //定義了一個變數 h，它表示用於計算偏微分的微小增量大小

// 我們想找函數 f 的最低點
function f(p) {
    const [x, y] = p;
    return x * x + y * y;
}
//定義了一個函數 f，它接受一個點 p
//返回該點處函數的值例子中為簡單函數f(x,y)=x*x+y*y，即返回點(x,y)到原點的距離平方


function df(f, p, k) {
    const p1 = p.slice(); // 複製陣列以避免改變原始陣列
    p1[k] += h;
    return (f(p1) - f(p)) / h;
}
// df(f, p, k) 為函數 f 對變數 k 的偏微分: df / dp[k]
// 例如在上述 f 範例中 k=0, df/dx, k=1, df/dy

// 函數 f 在點 p 上的梯度
function grad(f, p) {
    const gp = p.slice(); // 複製陣列以避免改變原始陣列
    for (let k = 0; k < p.length; k++) {
        gp[k] = df(f, p, k);
    }
    return gp;
} 
//定義了一個函數 grad,它計算了函數 f 在點 p 處的梯度。
//它通過對每個變量進行偏導數計算，從而得到梯度向量。

const [x, y] = [1, 3];//定義了一個點 (1, 3)，用作函數的輸入
console.log('x=', x, 'y=', y);
console.log('df(f(x,y), 0) = ', df(f, [x, y], 0));
console.log('df(f(x,y), 1) = ', df(f, [x, y], 1));
console.log('grad(f)=', grad(f, [x, y]));

