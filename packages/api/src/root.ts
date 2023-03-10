import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { projectRouter } from "./router/project";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
