// lets parse through the text from chatgpt and make the recipe page
let title = '';
let cookTime = '';
let totalCalories = '';
let serves = '';
let ingredients = '';
let instructions = '';

const recipeText = `
Title: Honey Glazed Veggie Stir-Fry with Rice and Beans
Cook time: 25 minutes
Total Calories: 330 calories per serving
Serves: 4

Ingredients:
1 cup rice
1 can beans (black beans, kidney beans, or any beans of choice)
1 large head of broccoli, chopped
2 bell peppers, sliced
2 tbsp honey
Salt and pepper to taste
Optional: soy sauce or sriracha for extra flavor

Instructions:
1. Cook the rice according to package instructions. 
2. In a large pan, sauté the chopped broccoli and sliced bell peppers until slightly tender, about 5-7 minutes. 
3. Add the beans to the pan and continue cooking for another 5 minutes. 
4. Drizzle the honey over the vegetables and beans, stirring well to coat evenly. Season with salt and pepper to taste, and add soy sauce or sriracha if desired. 
5. Serve the honey glazed veggie stir-fry over the cooked rice. Enjoy your nutritious and flavorful meal!
`;

// parse through the text
function parseRecipe(text) {
    const lines = text.split('\n');

    lines.forEach(line => {
        if (line.startsWith("Title:")) {
            title = line.replace('Title:', '').trim();
        } 
        else if (line.startsWith("Cook time:")) {
            cookTime = line.replace('Cook time:', '').trim();
        } 
        else if (line.startsWith("Total Calories:")) {
            totalCalories = line.replace('Total Calories:', '').trim();
        } 
        else if (line.startsWith("Serves:")) {
            serves = line.replace('Serves:', '').trim();
        }
    });

    const line2 = text.split('\n\n');

    line2.forEach(line2 => {
        if (line2.startsWith("Ingredients:")) {
            ingredients = "\n" + line2.replace('Ingredients:', '').trim(); // add a blank line, formatting was weird idk
        } 
        else if (line2.startsWith("Instructions:")) {
            instructions = "\n" + line2.replace('Instructions:', '').trim(); // add a blank line, formatting was weird idk
        }
    });
}

parseRecipe(recipeText);

console.log("Title:", title);
console.log("Cook Time:", cookTime);
console.log("Total Calories:", totalCalories);
console.log("Serves:", serves);
console.log("Ingredients:", ingredients);
console.log("Instructions:", instructions);

// update html
function displayRecipe() {
    document.getElementById('recipe-title').innerText = title;
    document.getElementById('cook-time').innerText = "⏱️" + cookTime;
    document.getElementById('calories').innerText = "🍞" + totalCalories;
    document.getElementById('serves').innerText = "🧑Serves " + serves;

    // ingredients as a list
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';  // clear old
    const ingredientArray = ingredients.split("\n");
    for (let i = 1; i < ingredientArray.length; i++) {
        const litem = document.createElement("li");
        litem.innerText = ingredientArray[i];
        ingredientsList.appendChild(litem);
    }

    // instructions as a list
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';  // clear old :))))))))))
    const instructionArray = instructions.split('\n');
    for (let i = 1; i < instructionArray.length; i++) {
        const litem = document.createElement('li');
        litem.innerText = instructionArray[i];
        instructionsList.appendChild(litem);
    };
}

parseRecipe(recipeText);  // parse the recipe text
displayRecipe();  // update the HTML with the parsed data
console.log()