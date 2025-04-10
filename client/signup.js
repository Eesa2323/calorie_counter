document.querySelector(".signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Sign up successful!");
});

async function checkUserAvailability(username, email) {
    const response = await fetch("http://localhost:6000/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email })
    });

    const data = await response.json();
    alert(data.message); // Show message in alert or UI
}

function togglePassword(inputId, icon) {
    let input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text"; 
        icon.textContent = "visibility"; // Change to visibility icon
    } else {
        input.type = "password"; 
        icon.textContent = "visibility_off"; // Change back to visibility_off
    }
}
function validatePassword() {
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("password-error");

    // - At least 10 characters
    // - Contains at least one digit
    // - Contains at least one special character
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

    if (!passwordRegex.test(password)) {
        errorMessage.textContent = "Password must be at least 10 characters long and contain a number & special character.";
        errorMessage.style.color = "red";
    } else {
        errorMessage.textContent = ""; // Clear message if valid
    }
}

function validateConfirmPassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let errorMessage = document.getElementById("password-match-error");

    if (confirmPassword.length > 0) {
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            errorMessage.style.color = "red";
        } else {
            errorMessage.textContent = ""; // Clear message when passwords match
        }
    }
}