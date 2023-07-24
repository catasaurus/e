// string array type with a minimum of one string
type arrayString = [string, ...string[]]

// generates users based on 3 lists of traits
// returns bio's / ChatGPT system messages
export default function generateUsers(mainTraits: string[], subTraits: string[], miniTraits: string[]): string[] {
    const combinations: string[] = [];
    let newUser: string;

    for (const a of mainTraits) {
        // const can be used because anything in mainTraits for loop scope is destroyed every iteration unless it is a global variable
        const combination: (string | undefined)[] = [a];
        for (const b of subTraits) {
            combination[1] = b;
            for (const c of miniTraits) {
                combination[2] = c;
                newUser = "You are a " + combination[0] + ". You also " + combination[1] + ". A fact about you is that you: " + combination[2];
                combinations.push(newUser)
            }
        }
}
    return combinations
}