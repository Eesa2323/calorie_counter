let currentStep = 1;

function showStep(step) {
    document.querySelectorAll('.setup-step').forEach((el) => el.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    
}

function nextStep(step) {
    const current = document.getElementById(`step-${currentStep}`);

    // Validation for weight (step 1)
    if (currentStep === 1) {
        const weight = document.getElementById("weight").value;
        if (!weight || isNaN(weight) || weight < 20 || weight > 250) {
            alert("Please enter a valid weight between 20 and 250.");
            return;
        }
    }

    // Validation for target weight (step 2)
    if (currentStep === 2) {
        const targetWeight = document.getElementById("target-weight").value;
        if (!targetWeight || isNaN(targetWeight) || targetWeight < 20 || targetWeight > 250) {
            alert("Please enter a valid target weight between 20 and 250.");
            return;
        }
    }

    if (currentStep === 3) {
        const height = document.getElementById("height").value;
        if (!height) {
            alert("Please select your height before proceeding.");
            return;
        }
    }

    // Validation for age (step 4)
    if (currentStep === 4) {
        const age = document.getElementById("age").value;
        if (!age || isNaN(age) || age < 1 || age > 120) {
            alert("Please enter a valid age between 1 and 120.");
            return;
        }
    }
    // If it's the final step (6), redirect to home.html after short delay
  if (step === 6) {
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500); // Adjust delay as needed (e.g. 1.5 seconds)
  }

    currentStep = step;
    showStep(currentStep);
}

function prevStep(step) {
    currentStep = step;
    showStep(currentStep);
}

// Show the first step initially
document.addEventListener("DOMContentLoaded", function () {
    showStep(currentStep);
});

document.addEventListener("DOMContentLoaded", function () {
    const heightSelect = document.getElementById("height");

    heightSelect.addEventListener("change", function () {
      this.blur();            // Collapse dropdown
      this.scrollTop = 0;     // Reset scroll to top
    });
  });
