async function translate() {
    const question = document.getElementById("question").value;
    const responseDiv = document.getElementById("response");

    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`;

    const requestBody = {
        q: question,
        source: 'en',
        target: 'zh',
        format: 'text'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (data.error) {
            responseDiv.innerHTML = `錯誤: ${data.error.message}`;
        } else {
            const translatedText = data.data.translations[0].translatedText;
            responseDiv.innerHTML = `翻譯結果: ${translatedText}`;
        }
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = '翻譯過程中出現錯誤，請稍後再試。';
    }

    function chat() {
        const question = document.getElementById("question").value;
        const responseDiv = document.getElementById("response");
    
        // 模擬 ChatGPT 回應（這裡應該是你的模型回應邏輯）
        const simulatedResponse = `這是 ChatGPT 的回應: ${question}`;
        responseDiv.innerHTML = simulatedResponse;
    }
}
