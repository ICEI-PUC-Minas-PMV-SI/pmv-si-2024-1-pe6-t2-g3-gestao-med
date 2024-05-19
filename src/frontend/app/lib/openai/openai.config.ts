import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const open_ai_key = process.env.OPEN_AI_KEY as string
const openai = new OpenAI({
    apiKey: open_ai_key,
    dangerouslyAllowBrowser: true,
})

export { openai }