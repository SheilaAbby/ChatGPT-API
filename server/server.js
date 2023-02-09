import express from  'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

//set some middleware
app.use(cors()); //allow our server be called from the frontend
app.use(express.json()); //pass josn from frontend to backend

//Routes
app.get('/', async(req, res)=> {
    res.status(200).send({
        message: 'Hello from ChatGPT',
    })
});

app.post('/post', async(req, res)=> {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
});

app.listen(5001, ()=> {
    const PORT_NO = 5001;
    console.log(`Server is running at port http://localhost:${PORT_NO}`)
});


