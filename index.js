const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
// const stripe = require("stripe")(process.env.STRIPE_SECRETE);
const port = process.env.PORT || 5000;


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(cors());
app.use(express.json());

// Define translation route
// app.post('/translate', async (req, res) => {
//     try {
//       // Get text to translate and model to use from request parameters
//       const { text } = req.body;
  
//       // Generate translations using OpenAI API
//       const response = await openai.Completion.create({
//         engine: 'text-davinci-003',
//         prompt: `Translate "${text}" to chinese.`,
//         max_tokens: 1024,
//         temperature: 0.7,
//         n: 1,
//         stop: '\n'
//       });
  
//       // Extract translated text from API response
//       const translation = response.choices[0].text;
  
//       // Send translation to client as JSON response
//       res.json({ translation });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

  



app.post('/translate', async (req, res) => {
    try {
        const { target, text } = req.body;
        // console.log(target, text);
        if (!text || !target) {
            return res.status(400).json({ error: "please filled you data" });
        }
        const prompt = `Translate this into 1. ${target}:\n\n${text}\n\n`;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.0,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        console.log("response",response.data.choices[0])
        if (response) {
            res.status(200).json({ data: response.data.choices[0].text.trim() });
        } else {
            res.status(400).json({ data: "not found" });
        }
    } catch (err) {
        console.log(err);
    }

});

app.post('/translateEng', async (req, res) => {
    try {
        const {text } = req.body;
        console.log(text);
        if (!text) {
            return res.status(400).json({ error: "please filled you data" });
        }
        const prompt = `Translate this into 1. English:\n\n${text} \n\n`;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.0,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        // console.log("response",response.data.choices[0])
        if (response) {
            res.status(200).json({ data: response.data.choices[0].text.trim() });
        } else {
            res.status(400).json({ data: "not found" });
        }
    } catch (err) {
        console.log(err);
    }

});



// app.post('/image', async (req, res) => {
//     try {
//         const { image } = req.body;
//         console.log(image);
//         if (!image) {
//             return res.status(400).json({ error: "please filled you data" });
//         }
//         const prompt = `Extract text from image`;

//         const response = await openai.createCompletion({
//             model: 'image-alpha-001',
//           prompt: prompt,
//           num_images: 1
//         });
//         // console.log("response",response.data.choices[0])
//         if (response) {
//             res.status(200).json({ data: response.data });
//         } else {
//             res.status(400).json({ data: "not found" });
//         }
//     } catch (err) {
//         console.log(err);
//         alert("please type small sentences or make the long sentence into many small sentences")
//     }

// });





app.get('/', async (req, res) => {
    res.send('Cricket lover server is running');
});

app.listen(port, () => console.log(`Cricket lover is running on ${port}`))



