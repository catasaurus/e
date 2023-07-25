import createUsers from "./createUsers";
import askQuestion from "./askQuestion";

export default async function runSurvey(mainTraits: string[], subTraits: string[], miniTraits: string[], question: string): Promise<void> {
    const users = createUsers(mainTraits, subTraits, miniTraits);

    for (const user of users) {
        const answer = askQuestion(user, question);
    }
}