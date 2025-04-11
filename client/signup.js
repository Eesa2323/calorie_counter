document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
        const passwordError = document.getElementById("password-error");
        const matchError = document.getElementById("password-match-error");

        // Password strength regex
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

        // Validate fields
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
        }

        if (!passwordRegex.test(password)) {
            passwordError.textContent = "Password must be at least 10 characters long and contain a number & special character.";
            passwordError.style.color = "red";
            return;
        } else {
            passwordError.textContent = "";
        }

        if (password !== confirmPassword) {
            matchError.textContent = "Passwords do not match!";
            matchError.style.color = "red";
            return;
        } else {
            matchError.textContent = "";
        }

        // Send to backend
        try {
            const response = await fetch("http://localhost:6000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.text();

            if (response.ok) {
                alert("Sign up successful!");
                window.location.href = "setup.html"; // ✅ redirect to setup
            } else {
                alert(result); // backend message (email/username already in use)
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("An error occurred during signup.");
        }
    });
});

// Toggle password visibility (for both password + confirm password)
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

// Validate password strength live
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

// Validate password match live
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
