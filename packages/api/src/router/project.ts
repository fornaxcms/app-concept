import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),

  byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.project.findFirst({ where: { id: input } });
  }),

  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.create({ data: input });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.project.delete({ where: { id: input } });
  }),

  getProjectsFromUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: {
        users: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),
});
