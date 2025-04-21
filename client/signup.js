document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
        const passwordError = document.getElementById("password-error");
        const matchError = document.getElementById("password-match-error");

        // Password strength regex
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

        // Clear previous errors
        passwordError.textContent = "";
        matchError.textContent = "";
        document.querySelectorAll("input").forEach(input => input.classList.remove("invalid"));

        // Validate fields
        let valid = true;

        if (!username) {
            document.getElementById("username").classList.add("invalid");
            valid = false;
        }

        if (!email) {
            document.getElementById("email").classList.add("invalid");
            valid = false;
        }

        if (!password) {
            document.getElementById("password").classList.add("invalid");
            valid = false;
        }

        if (!confirmPassword) {
            document.getElementById("confirm-password").classList.add("invalid");
            valid = false;
        }

        if (!valid) {
            alert("Please fill out all fields.");
            return;
        }

        if (!passwordRegex.test(password)) {
            passwordError.textContent = "Password must be at least 10 characters long and contain a number & special character.";
            document.getElementById("password").classList.add("invalid");
            return;
        }

        if (password !== confirmPassword) {
            matchError.textContent = "Passwords do not match!";
            document.getElementById("confirm-password").classList.add("invalid");
            return;
        }

        const userAuthData = {
            username: username, // from your form input
            email: email        // from your form input
          };
        localStorage.setItem('userAuthData', JSON.stringify(userAuthData));
        window.location.href = "Setup.html";
    });
});

// Toggle password visibility
function togglePassword(inputId, icon) {
    let input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "visibility";
    } else {
        input.type = "password";
        icon.textContent = "visibility_off";
    }
}

// Live validation: Password strength
function validatePassword() {
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("password-error");

    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

    if (!passwordRegex.test(password)) {
        errorMessage.textContent = "Password must be at least 10 characters long and contain a number & special character.";
        errorMessage.style.color = "red";
    } else {
        errorMessage.textContent = "";
    }
}

// Live validation: Confirm password
function validateConfirmPassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let errorMessage = document.getElementById("password-match-error");

    if (confirmPassword.length > 0) {
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            errorMessage.style.color = "red";
        } else {
            errorMessage.textContent = "";
        }
    }
}

