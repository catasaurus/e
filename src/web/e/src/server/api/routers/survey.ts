import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "e/server/api/trpc";
import { runSurvey } from "e/server/services/runSurvey";

export const surveyRouter = createTRPCRouter({
    // procedure is protected so session is guaranteed not to be undefined
    runSurvey: protectedProcedure
        .input(z.object({ mainTraits: z.array(z.string()), subTraits: z.array(z.string()), miniTraits: z.array(z.string()), question: z.string() }))
        .mutation(({ ctx, input }) => {
            void runSurvey(input.mainTraits, input.subTraits, input.miniTraits, input.question, ctx.session.user.id, ctx.prisma)
        })
})
