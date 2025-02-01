document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    const responseBox = document.getElementById("response-box");

    if (!userInput) {
        responseBox.innerText = "请输入您的问题！";
        return;
    }

    responseBox.innerText = "处理中，请稍候...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/michaelwzhu/ShenNong-TCM-LLM", {
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

        if (response.ok && result && result.length > 0) {
            const generatedText = result[0]?.generated_text;
            responseBox.innerText = generatedText || "抱歉，我无法回答您的问题。";
        } else {
            console.error("API Error Response:", result);
            responseBox.innerText = `请求失败，请稍后再试。错误代码: ${response.status}`;
        }
    } catch (error) {
        console.error("Network or API Error:", error);
        responseBox.innerText = "网络错误，请检查您的连接或稍后重试。";
    }
});
