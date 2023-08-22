// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OpenAIApi, Configuration } from "openai";

/*
Endpoint API 
 */
export default function handler(req, res) {
  const config = Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }); //end config

  res.status(200).json({ name: "post generator" });
}
