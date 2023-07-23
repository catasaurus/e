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
    let combinations: string[] = [];
    let newUser: string;

    for (let a in mainTraits) {
        let combination: (string | undefined)[] = [mainTraits[a]];
        for (let b in subTraits) {
            combination[1] = subTraits[b];
            for (let c in miniTraits) {
                combination[2] = subTraits[c];
                newUser = "You are a " + combination[0] + ". You also " + combination[1] + ". A fact about you is that you: " + combination[2];
                combinations.push(newUser)
            }
        }
}
    return combinations
}