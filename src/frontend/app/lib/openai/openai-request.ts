import { openai } from "./openai.config";


export default async function OpenAiRequest(userPrompt: string) {

    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        messages: [
            { 
                role: 'system', 
                content: `Você é um farmacêutico com mais de 10 anos de experiência e responderá às solicitações com uma linguagem simples para que leigos entendam facilmente.`
            },
            {
                role: 'user',
                content: userPrompt,
                
            }
        ],
        temperature: 0
        
    })
   
    return gptResponse
}


