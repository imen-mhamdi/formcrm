document.getElementById("leadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = document.getElementById("message");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // قراءة utm_source من العنوان وتحديث source
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source") || "website"; // القيمة الافتراضية لو ما فيش utm_source
    data.source = utmSource; // حدّث source في البيانات
    document.getElementById("source").value = utmSource; // حدّث الحقل المخفي

    try {
        const response = await fetch("http://localhost:8222/api/leads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            message.textContent = "Inscription réussie !";
            message.style.color = "green";
            e.target.reset();
        } else {
            const error = await response.json();
            message.textContent = error.message || "Erreur lors de l'inscription !";
            message.style.color = "red";
        }
    } catch (err) {
        message.textContent = "Erreur de connexion au serveur !";
        message.style.color = "red";
    }
});