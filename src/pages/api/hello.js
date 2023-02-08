import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const [timedout, setTimedout] = useState(true);
  do {
    const completion = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        temperature: 1, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      })
      .catch((error) => {
        console.log("error", error);
      })
      .then((response) => {
        setTimedout(false);
        res.status(200).json({ result: completion.data });
      });
  } while (timedout);
}
