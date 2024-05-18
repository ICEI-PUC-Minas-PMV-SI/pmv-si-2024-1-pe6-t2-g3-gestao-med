import OpenAI from 'openai'

const OPEN_AI_SECRET_KEY = process.env.OPEN_AI_KEY as string


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET_KEY,
    dangerouslyAllowBrowser: true,
})

export { openai }