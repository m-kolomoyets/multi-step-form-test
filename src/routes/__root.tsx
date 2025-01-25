import { lazy, Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { noopReturnNull } from '@/utils/noopReturnNull';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? noopReturnNull
        : lazy(async () => {
              const res = await import('@tanstack/router-devtools');
              return {
                  default: res.TanStackRouterDevtools,
              };
          });

const TanstackQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? noopReturnNull
        : lazy(async () => {
              const res = await import('@tanstack/react-query-devtools');
              return {
                  default: res.ReactQueryDevtools,
              };
          });

export const Route = createRootRoute({
    component() {
        return (
            <>
                <Outlet />
                <Suspense>
                    <TanStackRouterDevtools position="bottom-right" />
                    <TanstackQueryDevtools position="bottom" />
                </Suspense>
            </>
        );
    },
});
