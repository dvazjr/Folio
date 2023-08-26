
// This waits for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("submitButton");
    const form = document.getElementById("contactForm");

    button.addEventListener("click", function(event) {
        event.preventDefault(); 
        
        // Listen for the submit event on the form
        form.addEventListener("submit", function(event) {
            // Prevent the default form submit action
            event.preventDefault();
        
            // Gather the form data
            const formData = new FormData(form);
        
            // Convert FormData to JSON (optional but useful if you want to log it or manipulate it)
            let jsonObject = {};
            formData.forEach((value, key) => {
              jsonObject[key] = value;
            });
        
            // Perform AJAX request to server
            fetch("http://localhost:3000/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonObject),
            })
            .then(response => response.json())
            .then(data => {
              // Handle success - maybe show a message to the user
              console.log("Success:", data);
            })
            .catch((error) => {
              // Handle failure - alert the user or retry
              console.error("Error:", error);
            });
          });
    })

  });
  