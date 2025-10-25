import { httpLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers/_app';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getTRPCClient() {
  return trpc.createClient({
    links: [
      httpLink({
        url: `${getBaseUrl()}/api/trpc`,
        transformer: superjson,
        headers() {
          return {
            'content-type': 'application/json',
          };
        },
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include',
          });
        },
      }),
    ],
  });
}
