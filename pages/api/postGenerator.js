// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OpenAIApi, Configuration } from "openai";

/*
Endpoint API 
 */
export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }); //end config
  //New openai instance
  const openai = new OpenAIApi(config);
  //Calling openai api and passing the object model gpt3, temperature "accuracy risk" between 0 and 1
  //Where 0 is lowest risk, max tokens (with gpt3 it is 4000), and prompt
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 3600,
    promt: "prompt about what GPT should generate",
  });

  console.log("GPT Response: ", response);

  res.status(200).json({ name: "post generator" });
}