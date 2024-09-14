const ingredients = []; // store ingredients in here...

window.onload = function(){
    addIngredientBox(false); // automatically add the first textbox on load
}

function addIngredientBox() {
    const container = document.getElementById("ingredientBoxContainer");

    // hold textbox and buttons!
    const ingredientBoxDiv = document.createElement("div");
    ingredientBoxDiv.className = "ingredient-box"; // styling class

    // + button
    const addButton = document.createElement("button");
    addButton.innerHTML = "+"; 
    addButton.className = "add-button";
    addButton.onclick = addIngredientBox; // when you click the + button it will add another box

    // textbox input placeholder
    const ingredientInput = document.createElement("input");
    ingredientInput.type = "text";
    ingredientInput.className = "ingredient-input"; // styling class

    // remove button with the "trashcan"
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "🗑️";
    removeButton.className = "remove-button";
    removeButton.onclick = function() {
        container.removeChild(ingredientBoxDiv); // remove the entire div
    };

    ingredientBoxDiv.appendChild(addButton);
    ingredientBoxDiv.appendChild(ingredientInput);
    ingredientBoxDiv.appendChild(removeButton);

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

    const message = ingredients.length > 0
        ? `You can make something with: ${ingredients.join(", ")}`
        : "You need to add ingredients first.";

    alert(message);
}
