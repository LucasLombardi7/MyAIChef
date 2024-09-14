// scripts.js

const ingredients = [];

function addIngredientBox() {
    const container = document.getElementById("ingredientsBoxContainer");

    // new div to hold textboxes
    const ingredientBoxDiv = document.createElement("div");
    ingredientBoxDiv.className = "ingredient-box"; // add 


}

function cook(){
    const message = ingredients.length > 0
        ? 'You can make ...'
        : "You need to add ingredients first."

    alert(message);
}