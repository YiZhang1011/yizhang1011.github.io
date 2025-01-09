document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    const responseBox = document.getElementById("response-box");

    if (!userInput) {
        responseBox.innerText = "请输入您的问题！";
        return;
    }

    responseBox.innerText = "处理中，请稍候...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/distilgpt2", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userInput })
        });

        if (response.ok) {
            const data = await response.json();
            responseBox.innerText = data.generated_text || "抱歉，我无法回答您的问题。";
        } else {
            responseBox.innerText = "请求失败，请稍后再试。";
        }
    } catch (error) {
        responseBox.innerText = "网络错误，请检查您的连接。";
    }
});
