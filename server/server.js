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

app.post('/post', async()=> {
    try{
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            
        })
    }catch {

    }
});


