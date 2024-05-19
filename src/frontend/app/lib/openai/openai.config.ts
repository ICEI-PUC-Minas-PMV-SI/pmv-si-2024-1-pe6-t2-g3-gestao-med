import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

// const open_ai_key = process.env.OPEN_AI_KEY as string
const open_ai_key = 'sk-proj-gBaz15j6Z8qGZ4XRtbkJT3BlbkFJMNfhUrzfinPbp5y14UP4'
const openai = new OpenAI({
    apiKey: open_ai_key,
    dangerouslyAllowBrowser: true,
})

export { openai }