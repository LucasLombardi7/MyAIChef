import express from 'express';
import path from 'path';
import OpenAI from 'openai';


const app = express();
const port = 3001;

const openai = new OpenAI({
  apiKey: "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",

});

let contents = "I have";

// Send the HTML file for the root path
app.get('/test', (req, res) => {
    res.send("hello world")
  });
  
  // Send the HTML file for the root path
  app.get('/preProcess', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  
  function preProcess(ingredients, time){
    for (let i = 0; i <= ingredients.length - 2; i++){
        contents += " " + ingredients[i] + ","
    }
    contents += " and " + ingredients[ingredients.length - 1] + ". What is a meal I can make with these ingredients"
  
    if (time > 0 ){
        contents += " in " + time + " minutes?"
    }else{
        contents += "?"
    }
  
    contents += "Please include cook time, amount of servings made, and put total calories of the meal at the end. \n\n Use this as an example \n\n Title: \n Cook time: \n Total Calories: \n Serves: \n \n Ingredients: \n 1. \n2. \n3. \n\n Instructions: \n 1. \n 2. \n 3."
    
    const response = openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[
            {
                role:"system",
                content:"You are here to help people create recipes given whatever ingredients they have at their disposal"
            },
            {
                role:"user",
                content: contents
            }
        ]
          });
  
    console.log(response.choices[0].message.content);
    return (response.choices[0].message.content);
  }
  
  function turn (num){
    return num
  }
  
  
  
  // API route to expose the function
  app.post('/preProcess', (req, res) => {
    console.log("POSTTED")
    const { number } = req.body; // Gets data sent
    const response = num(number);
    res.json({ message: response }); // sends response back to client
  });