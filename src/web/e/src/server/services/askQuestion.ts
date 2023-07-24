import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);


export default async function askQuestion(user: string, question: string): Promise<boolean> {
    // questions should be yes or no

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
            role: 'system',
            content: user
            }, 
            {
                role: 'user',
                content: question + '. Answer yes or no without an explanation'
            }]
    }).then((result) => {
        if (result.data.choices != undefined) {
            return result.data.choices[0]?.message?.content
        }
    })

    if (completion != undefined) {
        if (completion.toLowerCase() == 'yes') {
            return true;
        }
    }
    return false;
}