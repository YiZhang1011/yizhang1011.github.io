document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    const responseBox = document.getElementById("response-box");

    if (!userInput) {
        responseBox.innerText = "请输入您的问题！";
        return;
    }

    responseBox.innerText = "处理中，请稍候...";

    try {
        const apiUrl = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
        const hfToken = "Bearer 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";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": hfToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: userInput,
                parameters: {
                    "max_new_tokens": 150,
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "return_full_text": false
                }
            })
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok && result.length > 0 && result[0].generated_text) {
            responseBox.innerText = result[0].generated_text;
        } else {
            console.error("API Error Response:", result);
            responseBox.innerText = `请求失败，请稍后再试。错误代码: ${response.status}, 错误信息: ${JSON.stringify(result)}`;
        }
    } catch (error) {
        console.error("Network or API Error:", error);
        responseBox.innerText = `网络错误，请检查您的连接或稍后重试。\n错误详情: ${error.message}`;
    }
});
