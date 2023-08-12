const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// console.log(process.env.API_KEY)

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5001;

app.get("/", async (req, res) => {
    res.status(200).send({ message: "Welcome to SpinoTech GPT-3" });
})

app.post("/", async (req, res) => {
    try {
        const data = req.body;
        //  console.log(data.data);

         const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: data.data,
            temperature: 0,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });
        // console.log(response.data.choices[0].text);
        res.status(200).send({
            bot:response.data.choices[0].text
        })

    } catch (error) {
        // console.error(error);
        res.status(500).send(error);
    }
})

app.listen(PORT, () => {
    console.log(`GPT backend is running on port http://localhost:${PORT}/`);
})