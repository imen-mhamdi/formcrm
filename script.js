document.getElementById("leadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = document.getElementById("message");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Get utm_source from URL
    const urlParams = new URLSearchParams(window.location.search);
    data.utm_source = urlParams.get("utm_source") || "direct";

    try {
        const response = await fetch("https://yourdomain.com/api/leads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add Authorization header if your API requires JWT
                // "Authorization": "Bearer YOUR_TOKEN"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            message.textContent = "تم التسجيل بنجاح!";
            message.style.color = "green";
            e.target.reset();
        } else {
            const error = await response.json();
            message.textContent = error.message || "خطأ في التسجيل!";
            message.style.color = "red";
        }
    } catch (err) {
        message.textContent = "خطأ في الاتصال بالخادم!";
        message.style.color = "red";
    }
});