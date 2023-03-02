const express = require('express')
const app = express();
const port = process.env.port || 5000;
const cors = require('cors')

app.use(cors());
app.get('/', (req, res) => {
    res.send('API data processing!')
})


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/translateOpen", async (req, res) => {
  const { target, text } = req.body;
  console.log(target, text);
  if (!text || !target) {
    return res.status(400).json({ error: "please filled you data" });
  }
  const prompt =  `Translate this into 1. ${target}:\n\n${text}\n\n`;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    // console.log("response",response.data.choices[0])
    if(response){
        console.log(response)
      res.status(200).json({ data: response.data.choices[0].text.trim() });
    }else{
      res.status(400).json({ data: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
    console.log(`Showing the data on ${port}`)
})