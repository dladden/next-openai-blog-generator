// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { OpenAIApi, Configuration } from "openai";

/*
Endpoint API
When API call resolves the solution or the prompt solution is in object.choices.[Object] array
 */
export default withApiAuthRequired(async function handler(req, res) {
  //importing the user
  const { user } = await getSession(req, res);
  //check if current user has credits from mongodb
  const client = await clientPromise;
  //connecting to the database
  const db = client.db("textFlow");
  //grabbing the user whose sub matches the current user
  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub,
  });
  //if user returned check the tokens if false return 403
  if (!userProfile?.availableCredits) {
    res.status(403);
    return;
  }

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }); //end config
  //New openai instance
  const openai = new OpenAIApi(config);
  //receiving the topic and keywords from new.js
  const { topic, keywords } = req.body;
  console.log(topic, keywords);

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
  }); //end POST CONTENT

  //variable for the response (if null default to empty string)
  const postResponse =
    postContentResponse.data.choices[0]?.message?.content || "";

  /*
  Using the response from gpt3.5 which is stored in postResponse 
  */
  const titleContentResponse = await openai.createChatCompletion({
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
      {
        role: "assistant",
        content: postResponse,
      },
      {
        role: "user",
        content: "Generate appropriate tittle tag text for the above blog post",
      },
    ],
  }); //end TITLE TAG

  const metaDescriptionResponse = await openai.createChatCompletion({
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
      {
        role: "assistant",
        content: postResponse,
      },
      {
        role: "user",
        content:
          "Generate SEO-friendly meta description for the above blog post",
      },
    ],
  }); //end META DESCRIPTION

  //variable for title
  const title = titleContentResponse.data.choices[0]?.message?.content || "";
  //variable for meta tag
  const metaDescription =
    metaDescriptionResponse.data.choices[0]?.message?.content || "";

  console.log("GPT Response: ", postResponse);
  console.log("GPT Title Response: ", title);
  console.log("GPT META TAG Response: ", metaDescription);

  //blog post has been generated, decrement credit by one. And increment by -1
  await db.collection("users").updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableCredits: -1,
      },
    }
  );
  //parsing the blog posts
  // const parsed = JSON.parse(res.data.choices[0]?.text.split("\n").join(""));

  /*inserting the generated post into the mongodb. Using optional 
  chain "?" incase parsed is undefined. Using parsing to parse blogs.
  Storing keywords and topic. Specifying the user to which the data
  belongs to "userProfile._id" _id is automatically generated id by mongodb.
  The date the collection insert is generated
   */
  const post = await db.collection("posts").insertOne({
    postContent: postResponse || "",
    title: title || "",
    postDescription: metaDescription || "",
    topic,
    keywords,
    userId: userProfile._id,
    created: new Date(),
  });

  /*
    Response is parsed in JSON format grabbed out of choice 0 (openai sends 4)
    and accessing the text with ".?". Additionally removing \n markers with
    split and join them with empty string
  */
  res.status(200).json({
    post: {
      postResponse,
      title,
      metaDescription,
    },
  });
});
