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
      return ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          users: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.project.delete({ where: { id: input } });
  }),

  getProjectsFromUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: {
        users: {
          some: {
            id: ctx.session.user.id,
          },
        },
      },
      include: {
        users: true,
      },
    });
  }),

  getCollectionsInProject: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.collection.findMany({
        where: {
          projectId: input,
        },
      });
    }),

  getPagesInProject: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.page.findMany({
        where: {
          projectId: input,
        },
      });
    }),

  getMenusInProject: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.menu.findMany({
        where: {
          projectId: input,
        },
      });
    }),
});
