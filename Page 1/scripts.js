const ingredients = []; // store ingredients in here...
let cookingTime = 0; // finalized numerical value to be fed to chatGPT

window.onload = function(){
    addIngredientBox(false); // automatically add the first textbox on load
}

function addIngredientBox(allowRemove = True) {
    const container = document.getElementById("ingredientBoxContainer");

    // hold textbox and buttons!
    const ingredientBoxDiv = document.createElement("div");
    ingredientBoxDiv.className = "ingredient-box"; // styling class

    // textbox input placeholder
    const ingredientInput = document.createElement("input");
    ingredientInput.type = "text";
    ingredientInput.className = "ingredient-input"; // styling class

    // we want to create a "+" button only for the first input
    const addButton = document.createElement("button");
    addButton.innerHTML = "+"; 
    addButton.className = "add-button";
    addButton.onclick = () => addIngredientBox(true); // when you click the + button it will add another box

    // let's add the + button now to the first input
    ingredientBoxDiv.appendChild(addButton);
    ingredientBoxDiv.appendChild(ingredientInput);

    // if we can, add a remove button (THIS WONT WORK FOR THE FIRST BOX)
    if (allowRemove) {
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "🗑️";
        removeButton.className = "remove-button";
        removeButton.onclick = function() {
            container.removeChild(ingredientBoxDiv); // remove the entire div
        };
        ingredientBoxDiv.appendChild(removeButton);
    }

    // append to div to the container
    container.appendChild(ingredientBoxDiv);
}

function cook() {
    const inputs = document.querySelectorAll(".ingredient-input");
    ingredients.length = 0; // before updating, let's clear the array

    inputs.forEach(input => {
        if (input.value) {
            ingredients.push(input.value); // if input HAS a value, push it
        }
    });

    // get time value
    const timeToCook = document.getElementById("timeToCook").value;

    // ensure the time is a real number
    if (!timeToCook || isNaN(timeToCook) || Number(timeToCook) <= 0) {
        alert("Please enter a valid cooking time!");
        return;
    } 
    
    const message = ingredients.length > 0
        ? `You can make something with: ${ingredients.join(", ")}`
        : "You need to add ingredients first.";

    cookingTime = Number(timeToCook);

    alert(ingredients);
    alert(cookingTime);
    alert(message);
}
