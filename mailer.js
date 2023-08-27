document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const emailData = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    };

    try {
        const response = await fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
        });

        if (response.ok) {
            console.log("Email sent successfully!");
        } else {
            console.error("Failed to send email");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});
