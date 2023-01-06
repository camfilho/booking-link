import React from "react";
import Home from "./Home";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default () => (
  <>
    {
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    }
  </>
);
