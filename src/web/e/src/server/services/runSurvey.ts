import createUsers from "./createUsers";
import askQuestion from "./askQuestion";
import { PrismaClient } from "@prisma/client";

export default async function runSurvey(mainTraits: string[], subTraits: string[], miniTraits: string[], question: string, userId: string): Promise<void> {
    const prisma = new PrismaClient()
    const users = createUsers(mainTraits, subTraits, miniTraits);
    const userLength = users.length;

    const newSurvey = await prisma.survey.create({
        data: {
            user: {
                connect: { id: userId }
            },
            userCount: userLength,
            question: question
        },
        select: {
            id: true
        }
    })

    for (const user of users) {
        const answer = await askQuestion(user, question);


        const newEntry = await prisma.surveyEntry.create({
            data: {
                user: user,
                result: answer,
                survey: {
                    connect: { id: newSurvey.id }
                }
            }
        })
    }
}