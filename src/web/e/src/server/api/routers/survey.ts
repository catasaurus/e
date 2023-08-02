import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "e/server/api/trpc";
import { runSurvey } from "e/server/services/runSurvey";

export interface surveyInfo {
    question: string,
    // true if completed false if processing or an error has occured
    status: boolean,
    // for generating keys for JSX elements
    surveyId: string
}

export const surveyRouter = createTRPCRouter({
    // procedure is protected so session is guaranteed not to be undefined
    runSurvey: protectedProcedure
        .input(z.object({ mainTraits: z.array(z.string()), subTraits: z.array(z.string()), miniTraits: z.array(z.string()), question: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await runSurvey(input.mainTraits, input.subTraits, input.miniTraits, input.question, ctx.session.user.id, ctx.prisma);
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
                    SurveyEntry: true,
                    id: true
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
                        status: status,
                        surveyId: survey.id
                    }

                    output.push(newEntry)
                }
                
                return output
            }).catch(() => {
                const output: surveyInfo[] =  []
                return output
            })



            return surveys
        }),
    
    getSurveyData: protectedProcedure
        .input(z.object({surveyId: z.string()}))
        .query( async ({ctx, input}) => {
            const surveyInfo = await ctx.prisma.survey.findUnique({
                where: {
                    id: input.surveyId,
                    userId: ctx.session.user.id
                },
                select: {
                    question: true,
                    SurveyEntry: true
                }
            }).then((result) => {
                return result
            }).catch((err) => {
                console.log(err);
                return "Invalid survey id or internal server error"
            });

            return surveyInfo;
        })
})
