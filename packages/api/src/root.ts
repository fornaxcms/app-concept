import { authRouter } from "./router/auth";
import { collectionRouter } from "./router/collection";
import { menuRouter } from "./router/menu";
import { pageRouter } from "./router/page";
import { projectRouter } from "./router/project";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  project: projectRouter,
  collection: collectionRouter,
  page: pageRouter,
  menu: menuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
