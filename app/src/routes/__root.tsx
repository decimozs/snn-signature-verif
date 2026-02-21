import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RootContext {
  queryClient: QueryClient;
}

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});
