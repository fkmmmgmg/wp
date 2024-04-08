function gcd(a, b) {
    // 使用欧几里德算法计算最大公约数
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    // 当 b 为 0 时，a 就是最大公约数
    return a;
}

// 测试函数
console.log(gcd(12, 18)); // 输出：6
console.log(gcd(24, 36)); // 输出：12


