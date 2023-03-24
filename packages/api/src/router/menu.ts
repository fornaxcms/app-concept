import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const menuRouter = createTRPCRouter({
  getMenuById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.menu.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
