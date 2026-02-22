import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

interface RootContext {
  queryClient: QueryClient;
}

const RootLayout = () => {
  return (
    <main className="fixed top-0 left-0 w-full h-screen p-6">
      <Outlet />
      <Toaster />
    </main>
  );
};

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});
