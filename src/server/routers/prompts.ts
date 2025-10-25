import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const promptsRouter = router({
  // CREATE
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
      optimizedPrompt: z.string().min(1, "Optimized prompt is required"),
      tips: z.array(z.string()),
      purpose: z.string(),
      isPublic: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session?.user;

      console.log('✅ Create prompt mutation received:', {
        hasTitle: !!input.title,
        titleLength: input.title?.length,
        hasOptimizedPrompt: !!input.optimizedPrompt,
        tipsCount: input.tips?.length,
        purpose: input.purpose,
        isPublic: input.isPublic,
        userFromSession: sessionUser,
      });

      if (!sessionUser?.email && !sessionUser?.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No user information found in session.',
        });
      }

      try {
        const dbUser =
          (sessionUser.id
            ? await ctx.prisma.user.findUnique({ where: { id: sessionUser.id } })
            : null) ??
          (sessionUser.email
            ? await ctx.prisma.user.findUnique({ where: { email: sessionUser.email } })
            : null);

        if (!dbUser) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Associated user account was not found.',
          });
        }

        return await ctx.prisma.savedPrompt.create({
          data: {
            title: input.title,
            optimizedPrompt: input.optimizedPrompt,
            tips: input.tips,
            purpose: input.purpose,
            isPublic: input.isPublic,
            userId: dbUser.id,
          },
        });
      } catch (error) {
        console.error('❌ Failed to create saved prompt:', error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to save prompt.',
          cause: error,
        });
      }
    }),

  // READ ALL (user's prompts)
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.savedPrompt.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: 'desc' },
      });
    }),

  // READ ONE by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const prompt = await ctx.prisma.savedPrompt.findUnique({
        where: { id: input.id },
      });

      if (!prompt) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Prompt not found'
        });
      }

      // Verificar se o usuário tem permissão (dono ou público)
      if (prompt.userId !== ctx.session.user.id && !prompt.isPublic) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to view this prompt'
        });
      }

      return prompt;
    }),

  // UPDATE
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(1).max(200).optional(),
      optimizedPrompt: z.string().min(1).optional(),
      tips: z.array(z.string()).optional(),
      purpose: z.string().optional(),
      isPublic: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const prompt = await ctx.prisma.savedPrompt.findUnique({
        where: { id: input.id },
      });

      if (!prompt || prompt.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to update this prompt'
        });
      }

      const { id, ...updateData } = input;
      return ctx.prisma.savedPrompt.update({
        where: { id },
        data: updateData,
      });
    }),

  // DELETE
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const prompt = await ctx.prisma.savedPrompt.findUnique({
        where: { id: input.id },
      });

      if (!prompt || prompt.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to delete this prompt'
        });
      }

      return ctx.prisma.savedPrompt.delete({
        where: { id: input.id },
      });
    }),
});
