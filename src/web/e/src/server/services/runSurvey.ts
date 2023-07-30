import generateUsers from "./createUsers";
import { askQuestionPalm } from "./askQuestion";
import type { PrismaClient } from "@prisma/client";

export async function runSurvey(mainTraits: string[], subTraits: string[], miniTraits: string[], question: string, userId: string, prisma: PrismaClient): Promise<void> {
    const users = generateUsers(mainTraits, subTraits, miniTraits);
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
        const { result, raw } = await askQuestionPalm(user, question);


        const newEntry = await prisma.surveyEntry.create({
            data: {
                user: user,
                result: result,
                raw: raw,
                survey: {
                    connect: { id: newSurvey.id }
                }
            }
        })
    }
}

/*
// for running in deno / ts-node
export interface entry {
    user: string,
    result: boolean,
}

export async function runSurveyNoPrisma(mainTraits: string[], subTraits: string[], miniTraits: string[], question: string): Promise<entry[]> {
    const users = generateUsers(mainTraits, subTraits, miniTraits);
    const userLength = users.length;
    const entries: entry[] = [];

    for (const user of users) {
        const answer = await askQuestionPalm(user, question);

        entries.push({ user: user, result: answer })
    }

    return entries
}
*/