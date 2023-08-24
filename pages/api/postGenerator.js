// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OpenAIApi, Configuration } from "openai";

/*
Endpoint API
When API call resolves the solution or the prompt solution is in object.choices.[Object] array
 */
export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }); //end config
  //New openai instance
  const openai = new OpenAIApi(config);
  //temporary constants for the prompt
  const topic =
    "How to implement the chatGPT4 API into a nextjs application with no hassle";
  const key_words = "Nextjs React programming vscode developer SasS";
  //Calling openai api and passing the object model gpt3, temperature "accuracy risk" between 0 and 1
  //Where 0 is lowest risk, max tokens (with gpt3 it is 4000), and prompt
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 3600,
    prompt: `Lets do this step by step, write a long detailed SEO-friendly 1500 blog post about ${topic}, that targets the following keywords: ${key_words}.
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML tittle and meta description content.
    The return format must stringified JSON in the following format:{
        "postContent": post content goes here
        "title": title goes here
        "metaDescription": meta description goes here
    }
    `,
  });

  console.log("GPT Response: ", response);
  /*
    Response is parsed in JSON format grabbed out of choice 0 (openai sends 4) and accessing the text with ".?"
  */
  res.status(200).json({ post: JSON.parse(response.data.choices[0]?.text) });
}
