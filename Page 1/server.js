import express from 'express';
import path from 'path';
import OpenAI from 'openai';
import cors from "cors";

const app1 = express();
const port1 = 3000;

app1.use(cors());

const __dirname = path.resolve(); // You can directly use path.resolve() in CommonJS

// Serve static files from the 'public' directory
app1.use(express.static(path.join(__dirname, 'public')));
//app1.use("/static", express.static('./static/'));


// Serve the index.html file at the root URL
app1.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the index.html file at the root URL
app1.get('/preProcess', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



const openai = new OpenAI({
  apiKey: "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",

});

let contents = "I have";
  
  
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

let data = {}; // Temporary in-memory storage

app1.post('/preProcess', (req, res) => {
  data = req.body;
  res.send({ message: 'Data received succesfully '})
})

// Start the server
app1.listen(port1, () => {
  console.log(`Server running at http://localhost:${port1}`);
});



/////////////////////////////////////////////////////


