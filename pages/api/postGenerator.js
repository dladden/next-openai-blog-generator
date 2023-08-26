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
  //receiving the topic and keywords from new.js
  const { topic, keywords } = req.body;
  console.log(topic, keywords);

  //Calling openai api and passing the object model gpt3, temperature "accuracy risk" between 0 and 1
  //Where 0 is lowest risk, max tokens (with gpt3 it is 4000), and prompt
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   temperature: 0,
  //   max_tokens: 3600,
  //   prompt: `Lets do this step by step, write a long detailed SEO-friendly 1500 blog post about ${topic}, that targets the following keywords: ${keywords}.
  //   The content should be formatted in SEO-friendly HTML.
  //   The response must also include appropriate HTML tittle and meta description content.
  //   The return format must stringified JSON in the following format:{
  //       "postContent": post content goes here
  //       "title": title goes here
  //       "metaDescription": meta description goes here
  //   }
  //   `,
  // });
  /*
Testing the GPT3.5 model (no need max_token specification
it is automatically set to infinity). Messages:
role:
system - instructions supplied to openai on its behavior
user - message which will be sent
assistant - 

*/
  const postContentResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: "You are a Blog Post generator",
      },
      {
        role: "user",
        content: `Lets do this step by step, write a long detailed SEO-friendly 1500 blog post about ${topic}, that targets the following keywords: ${keywords}.
      The content should be formatted in SEO-friendly HTML.
      The response must be limited to the appropriate HTML tags: p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i, code, pre `,
      },
    ],
  });
  console.log(keywords, topic);

  console.log(
    "GPT Response: ",
    postContentResponse.data.choices[0]?.message?.content
  );
  /*
    Response is parsed in JSON format grabbed out of choice 0 (openai sends 4)
    and accessing the text with ".?". Additionally removing \n markers with
    split and join them with empty string
  */
  // res.status(200).json({
  //   post: JSON.parse(response.data.choices[0]?.text.split("\n").join("")),
  // });
}
