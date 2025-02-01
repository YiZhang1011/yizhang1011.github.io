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
                parameters: { "return_full_text": false, "max_new_tokens": 100 }
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);
            if (data && data.length > 0 && data[0].generated_text) {
                responseBox.innerText = data[0].generated_text;
            } else {
                responseBox.innerText = "抱歉，我无法回答您的问题。";
            }
        } else {
            const errorMsg = await response.text();
            console.error("API Error:", errorMsg);
            responseBox.innerText = "请求失败，请稍后再试。";
        }
    } catch (error) {
        console.error("Network Error:", error);
        responseBox.innerText = "网络错误，请检查您的连接。";
    }
});
