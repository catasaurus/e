import { Configuration, OpenAIApi } from "openai";
import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { z } from "zod";

// for PALM
const MODEL_NAME: string = "models/text-bison-001";
const API_KEY: string = z.string().parse(process.env.PALM_API_KEY);

const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
})


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);

// openai api free tier is not gonna be good enough so switching to PALM
export async function askQuestionOpenAI(user: string, question: string): Promise<boolean> {
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

export async function askQuestionPalm(user: string, question: string): Promise<boolean> {
        // questions should be yes or no

    const completion = await client.generateText({
        model: MODEL_NAME,
        prompt: {
                text: user + ". " + question + '. Answer yes or no without an explanation'
            }
    }).then((result) => {
        if (result[0].candidates != undefined) {
            return result[0].candidates[0]?.output;
        }
    })

    if (completion != undefined) {
        if (completion.toLowerCase() == 'yes') {
            return true;
        }
    }
    return false;
}