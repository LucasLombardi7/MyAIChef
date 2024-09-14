//import express from 'express'; ///IMPORTS DO NOT WORK ON BROWSER, WE NEED A FRAMEWORK (EXPRESS OR REACT) 
//import openai from 'openai';
//const app = express();
//const port = 3000;

//app.use(express.json());
//import { preProcess } from "./server"


const ingredients = []; // store ingredients in here...
let cookingTime = 0; // finalized numerical value to be fed to chatGPT
let ingredientsCounter = 0; // to count the number of ingredients

window.onload = function(){
    addIngredientBox(true); // automatically add the first textbox on load
}

function addIngredientBox(allowRemove = True) {
    if (ingredientsCounter >= 13) {
        alert("Cannot add more than 13 ingredients");
    } else {

    
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
            if (ingredientsCounter != 1)
                {
                    container.removeChild(ingredientBoxDiv); // remove the entire div    
                    ingredientsCounter--;
                    console.log(ingredients);
                }
        };
        
        ingredientBoxDiv.appendChild(removeButton);
        ingredientsCounter++;
        console.log(ingredients);
        
    }

    // append to div to the container
    container.appendChild(ingredientBoxDiv);
    }
}


async function callPreProcess(ingredients, time){
    try {
        const response = await fetch('/preProcess', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients, time }),
        });

        if (!response.ok){
            throw new Error('Error calling API');
        }

        const data = await response.body();

        console.log(ingredients)
        console.log(time)

        return data;

    } catch (error){
        console.error(error);
    }
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

    
    function handlePreProcessWithPromises() {
        const sticks = ingredients;
        const time = timeToCook;
    
        // Call the function and handle the promise
        callPreProcess(sticks, time)
            .then((result) => {
                if (result) {
                    // Handle the successful response
                    console.log('Processed data:', result);
                } else {
                    console.log('No result returned or an error occurred.');
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch or processing
                console.error('Error during processing:', error);
            });
    }
    
    // Execute the function
    handlePreProcessWithPromises();

    
    //result = callPreProcess(ingredients, timeToCook);
    //let result = new Promise(callPreProcess(ingredients, timeToCook));
    //result.then(callPreProcess)
    //console.log(result.valueOf());

    alert(message);
}
