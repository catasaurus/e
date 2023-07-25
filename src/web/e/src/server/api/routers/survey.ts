import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "e/server/api/trpc";

const surveyRouter = createTRPCRouter({
    runSurvey: publicProcedure
        .input(z.object({ mainTraits: z.array(z.string()), subTraits: z.array(z.string()), miniTraits: z.array(z.string()) }))
        .query(({ input }) => {
            
        })
})