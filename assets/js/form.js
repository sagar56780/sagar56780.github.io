  // Initialize EmailJS
  (function() {
    emailjs.init("sagat56780@gmail.com"); // Replace with your EmailJS user ID
})();

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    window.alert('submmit')

    // Collect form data
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("comment").value
    };

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
        .then(function(response) {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        }, function(error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message.");
        });
});