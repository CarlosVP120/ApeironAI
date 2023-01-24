import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const completion = await openai.createImage({
    prompt: req.body.text,
    n: 1,
    size: "256x256",
  });
  res.status(200).json({ result: completion.data });
}
