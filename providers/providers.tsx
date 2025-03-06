// app/Providers.tsx
"use client"; // Mark this as a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReduxProvider } from "./redux-provider"; // Import your ReduxProvider

export default function Providers({ children }: { children: ReactNode }) {
  // Create a client-side QueryClient instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>{children}</ReduxProvider>
    </QueryClientProvider>
  );
}