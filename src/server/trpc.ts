import { initTRPC, TRPCError } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import superjson from 'superjson';

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  // Get session from NextAuth with headers from request
  const session = await getServerSession(authOptions);

  return {
    session,
    prisma,
    req: opts.req,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Middleware de logging para debug
const loggerMiddleware = t.middleware(async ({ path, type, next, input }) => {
  console.log('📥 tRPC Request:', {
    path,
    type,
    input,
    inputType: typeof input,
    isArray: Array.isArray(input),
  });

  const result = await next();

  console.log('📤 tRPC Response:', {
    path,
    type,
    ok: result.ok,
  });

  return result;
});

// Middleware de autenticação
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: { session: ctx.session, prisma: ctx.prisma },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure.use(loggerMiddleware);
export const protectedProcedure = t.procedure.use(loggerMiddleware).use(isAuthed);
