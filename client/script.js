// hamburger menu

// Per 100g
const CALORIE_INFO = {
    chicken: 115,
    rice: 270,
    potato: 200,
    egg: 200,
    avocado: 140
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));


// dropdown menu
// Toggles the dropdown menu visibility for the clicked button's section
function toggleDropdown(event, mealType) {
    // Get the specific dropdown content based on the mealType
    const dropdownContent = document.getElementById(`dropdown-${mealType}`);

    let cTotal = 0
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach((i) => {
        const cal = CALORIE_INFO[i.id]
        cTotal += (cal * i.value)
    })

    

    const test = document.getElementsByClassName("breakfast_item")    
    dropdownContent.classList.toggle("show");
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove("show");
        });
    }
};

// Handles adding the selected items and displaying them in the "selected-items" div
function submitSelection(event, mealType) {
    let selectedItemsDiv = document.getElementById("selected-items");
    selectedItemsDiv.innerHTML = ""; // Clear previous selection

    // Get the specific dropdown content based on the mealType
    const dropdownContent = document.getElementById(`dropdown-${mealType}`);
        
    const inputValues = document.getElementsByClassName(`${mealType}_item`)
    console.log(inputValues)
    
    // Loop through all dropdown items and get the quantity for each food item
    dropdownContent.querySelectorAll(".dropdown-item input").forEach(input => {
        let food = input.getAttribute("data-food");
        let quantity = input.value; // Correctly fetch the value of the input field
        if (quantity > 0) {
            let item = document.createElement("p");
            item.textContent = `${quantity * 100}g of ${food}`;
            selectedItemsDiv.appendChild(item);
        }
    });   
  
    

    // Close dropdown after adding selection
    toggleDropdown(event, mealType);
}


// water switch
document.addEventListener("DOMContentLoaded", function() {
    
    const glasses = document.querySelectorAll(".glass");
    
    // Loop through each glass and add a click event listener
    glasses.forEach(glass => {
        glass.addEventListener("click", function() {
            const isFull = this.src.includes("image3.PNG");
            
            // Switch the image
            if (isFull) {
                // If it's already a full glass, switch it to an empty glass
                this.src = "_images/image2.PNG";
            } else {
                // Otherwise, switch it to a full glass
                this.src = "_images/image3.PNG";
            }
        });
    });
});

