document.getElementById("leadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = document.getElementById("message");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

  
    const urlParams = new URLSearchParams(window.location.search);
    data.utm_source = urlParams.get("utm_source") || data.utm_source || "website"; // تأكد من القيمة

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