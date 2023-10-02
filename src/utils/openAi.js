import OpenAI from "openai";
import { open_Ai_key } from "./constants";

const openAi = new OpenAI({
    apiKey:open_Ai_key,
    dangerouslyAllowBrowser: true
})

export default openAi