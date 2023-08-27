document.addEventListener("DOMContentLoaded", function() {
  const env = document.querySelector('meta[name="env"]').getAttribute('content');
  console.log("Environment:", env);
  
  const apiUrl = env === "Production"
    ? "https://www.danielvazquez.dev/api/send"
    : "http://localhost:3000/send";

  console.log("API URL:", apiUrl);

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    let jsonObject = {};
    
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    fetch(apiUrl, { // Use apiUrl here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  });
});
