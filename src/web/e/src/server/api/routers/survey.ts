import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "e/server/api/trpc";
import runSurvey from "e/server/services/runSurvey";

/*
const surveyRouter = createTRPCRouter({
    runSurvey: publicProcedure
        .input(z.object({ mainTraits: z.array(z.string()), subTraits: z.array(z.string()), miniTraits: z.array(z.string()), question: z.string() }))
        .query(({ input }) => {
            runSurvey(input.mainTraits, input.subTraits, input.miniTraits, input.question)
        })
})
*/