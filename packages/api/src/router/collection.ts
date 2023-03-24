import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collectionRouter = createTRPCRouter({
  getCollectionById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.collection.findUnique({
        where: {
          id: input,
        },
        include: {
          models: {
            include: {
              fields: true,
            },
          },
        },
      });
    }),

  createCollection: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        apiId: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.collection.create({
        data: input,
      });
    }),
});
