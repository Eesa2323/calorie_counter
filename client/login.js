document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const emailInput = document.getElementById("email").value.trim();
      const passwordInput = document.getElementById("password").value.trim();
  
      // Retrieve saved userAuthData from localStorage
      const storedData = localStorage.getItem("userAuthData");
  
      if (!storedData) {
        alert("No account found. Please sign up first.");
        return;
      }
  
      const parsedData = JSON.parse(storedData);
  
      // Validate login credentials
      if (emailInput === parsedData.email && passwordInput === parsedData.password) {
        alert("Login successful!");
        window.location.href = "home.html"; // Redirect to home page
      } else {
        alert("Incorrect email or password. Please try again.");
      }
    });
  });