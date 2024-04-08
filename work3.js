console.log("Hello!")

let userInput = prompt("輸入數字");
let n = parseInt(userInput); //將輸入數字轉為數字類型

function printOdd(n) {
    let oddNumber = ""; //保存奇數的字符串
    for (let i = 1; i < n; i += 2) {
        oddNumber += i + " "; // 將奇數添加到字符串中
    }
    console.log(oddNumber); // 打印
}
if (!isNaN(n)){
    console.log(`小於${n}的所有奇数：`);//使用反引號(可用"+n+"代替)
    printOdd(n);
}else{
    console.log("請輸入有效數字");
}

function isPrime(n) {
    if (n <= 1) {
        return false; // 1 和負數都不是質數
    }
    if (n <= 3) {
        return true;
    }
    // 如果 n 可以被 2 或 3 整除，那它就不是質數
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }
     // 在所有可能的質數中，除了 2 和 3，其他質數都是形如 6k+1 或 6k-1 的形式
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false; // 如果 n 能被 i 或 i+2 整除(5以上的奇數)，那么 n 不是質數
        }
    }
    return true;
}
if (isPrime(n)) {
    console.log(`${n} 是質數`);
} else {
    console.log(`${n} 不是質數`);
}



function sumPrime(n){
    let sum = 0; 
    for (let i = 2; i < n; i++) { //從2開始
        if (isPrime(i)) { 
            sum += i; 
        }
    }
    return sum; 
}
console.log(`小於 ${n} 的所有質數合：${sumPrime(n)}`);

// 向使用者獲取值
let vectorA = prompt("请输入向量a，用逗号分隔：").split(",").map(Number);
let vectorB = prompt("请输入向量b，用逗号分隔：").split(",").map(Number);

console.log("向量a为：", vectorA);
console.log("向量b为：", vectorB);

function vectorAdd(a, b) {
    let vectors = []; // 儲存向量之空格

    // 轉換使用者輸入之值形成串列
    for (let i = 0; i < arguments.length; i++) {
        vectors.push(arguments[i]);
    }

    // 檢查長度(必須一致)
    let length = vectors[0].length;
    for (let i = 1; i < vectors.length; i++) {
        if (vectors[i].length !== length) {
            console.log("向量長度不匹配");
            return null;
        }
    }


    let result = []; // 存放結果的質
    for (let i = 0; i < a.length; i++) {
        result.push(a[i] + b[i]); // 將對應位置的元素相加並放入结果數组中
    }

    return result;
}

console.log("向量相加的结果為：", vectorAdd(vectorA, vectorB)); // 打印结果

// 與用戶交互獲取矩陣值
let matrixA = [];
let matrixB = [];

let rows = parseInt(prompt("輸入矩陣的行數："));
let columns = parseInt(prompt("輸入矩陣的列數："));

// 向使用者獲取值A
console.log("輸入矩陣A的值：");
for (let i = 0; i < rows; i++) {
    let row = prompt(`輸入矩陣A的第 ${i + 1} 行，用逗號分隔：`).split(",").map(Number);
    matrixA.push(row);
}

// 向使用者獲取值B
console.log("輸入矩陣B的值：");
for (let i = 0; i < rows; i++) {
    let row = prompt(`輸入矩陣B的第 ${i + 1} 行，用逗號分隔：`).split(",").map(Number);
    matrixB.push(row);
}

console.log("矩陣A為：", matrixA);
console.log("矩陣B為：", matrixB);


function matrixAdd() {
    let matrices = []; // 可存放區

    // 轉換為串列
    for (let i = 0; i < arguments.length; i++) {
        matrices.push(arguments[i]);
    }

    // 檢查(維度須一致)
    let rows = matrices[0].length;
    let columns = matrices[0][0].length;
    for (let i = 1; i < matrices.length; i++) {
        if (matrices[i].length !== rows || matrices[i][0].length !== columns) {
            console.log("不匹配");
            return null;
        }
    }

    // 矩陣相加
    let result = [];
    for (let i = 0; i < rows; i++) {
        let newRow = [];
        for (let j = 0; j < columns; j++) {
            let sum = 0;
            for (let k = 0; k < matrices.length; k++) {
                sum += matrices[k][i][j];
            }
            newRow.push(sum);
        }
        result.push(newRow);
    }

    return result;
}

console.log("矩陣相加的结果：", matrixAdd(matrixA, matrixB)); // 打印结果

// 向使用者獲取值A
console.log("輸入矩陣A的值：");
let rowA = parseInt(prompt("輸入矩陣的行數："));
let columnA = parseInt(prompt("輸入矩阵的列數："));
for (let i = 0; i < rowA; i++) {
    let row = prompt(`輸入矩陣A的第 ${i + 1} 行，用逗號分隔：`).split(",").map(Number);
    matrixA.push(row);
}

// 向使用者獲取值B
console.log("輸入矩陣B的值：");
let rowB = parseInt(prompt("輸入矩陣的行数："));
let columnB = rowA;
console.log(`矩陣B列數:${rowA}`);
for (let i = 0; i < rowA; i++) {
    let row = prompt(`輸入矩陣B的第 ${i + 1} 行，用逗號分隔：`).split(",").map(Number);
    matrixB.push(row);
}

console.log("矩陣A：", matrixA);
console.log("矩陣B：", matrixB);

// 矩陣相乘
function matrixMul(matrixA, matrixB) {
    if (columnA !== rowB) {
        console.log("無法進行矩陣相乘：矩陣A的列數需等于矩陣B的行數");
        return null;
    }

    // 矩阵相乘
    let result = [];
    for (let i = 0; i < rowA; i++) {
        let newRow = [];
        for (let j = 0; j < columnB; j++) {
            let mul = 0;
            for (let k = 0; k < columnA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            newRow.push(sum);
        }
        result.push(newRow);
    }

    return result;
}

console.log("矩陣相乘的结果：", matrixAdd(matrixA, matrixB)); // 打印结果

let yearInput = prompt("輸入西元年");
let year = parseInt(yearInput); //將輸入數字轉為數字類型
function daysInYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 366; // 潤年有366天
    } else {
        return 365; // 平年有365天
    }
}

console.log(`daysInYear(${year}) => ${daysInYear(year)}`); // 打印结果