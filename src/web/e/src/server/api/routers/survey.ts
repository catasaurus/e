import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "e/server/api/trpc";
import { runSurvey } from "e/server/services/runSurvey";

export interface surveyInfo {
    question: string,
    // true if completed false if processing or an error has occured
    status: boolean
}

export const surveyRouter = createTRPCRouter({
    // procedure is protected so session is guaranteed not to be undefined
    runSurvey: protectedProcedure
        .input(z.object({ mainTraits: z.array(z.string()), subTraits: z.array(z.string()), miniTraits: z.array(z.string()), question: z.string() }))
        .mutation(({ ctx, input }) => {
            void runSurvey(input.mainTraits, input.subTraits, input.miniTraits, input.question, ctx.session.user.id, ctx.prisma)
        }),
    
    getSurveys: protectedProcedure
        .input(z.object({}))
        .query( async ({ctx}) => {

            const surveys = await ctx.prisma.survey.findMany({
                where: {
                    user: ctx.session.user
                },
                select: {
                    question: true,
                    userCount: true,
                    SurveyEntry: true
                }
            }).then((result) => {
                const output: surveyInfo[] = [];

                for (const survey of result) {
                    let status = true;

                    if (survey.SurveyEntry.length != survey.userCount) {
                        status = false;
                    }
                    const newEntry: surveyInfo = {
                        question: survey.question,
                        status: status
                    }

                    output.push(newEntry)
                }
                
                return output
            }).catch(() => {
                const output: surveyInfo[] =  []
                return output
            })



            return surveys
        })
})
