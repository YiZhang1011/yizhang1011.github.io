document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    const responseBox = document.getElementById("response-box");

    if (!userInput) {
        responseBox.innerText = "请输入您的问题！";
        return;
    }

    responseBox.innerText = "处理中，请稍候...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: userInput,
                parameters: { "max_new_tokens": 100, "return_full_text": true }
            })
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok) {
            if (result.hasOwnProperty("generated_text")) {
                responseBox.innerText = result.generated_text;
            } else {
                responseBox.innerText = "API 返回的数据格式不符合预期，请检查控制台日志。";
            }
        } else {
            console.error("API Error Response:", result);
            responseBox.innerText = `请求失败，请稍后再试。错误代码: ${response.status}, 错误信息: ${JSON.stringify(result)}`;
        }
    } catch (error) {
        console.error("Network or API Error:", error);
        responseBox.innerText = `网络错误，请检查您的连接或稍后重试。\n错误详情: ${error.message}`;
    }
});
