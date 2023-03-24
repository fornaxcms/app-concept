import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const pageRouter = createTRPCRouter({
  getPageById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.page.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
