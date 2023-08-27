document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      let jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });
  
      fetch("http://localhost:3000/send", {
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
  