import { exampleRouter } from "e/server/api/routers/example";
import { surveyRouter } from "./routers/survey";
import { createTRPCRouter } from "e/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  survey: surveyRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
