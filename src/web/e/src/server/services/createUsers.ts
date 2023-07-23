import { Configuration, OpenAIApi } from "openai";

// string array type with a minimum of one string
type arrayString = [string, ...string[]]

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);

// generates users based on 3 lists of traits
// returns bio's / ChatGPT system messages
export default function generateUsers(mainTraits: string[], subTraits: string[], miniTraits: string[]): string[] {
    let combinations: string[][] = [];

    // new entry combination
    let combination: string[];
    for (let a in mainTraits) {
        
}
    return ["a", "a"]
}