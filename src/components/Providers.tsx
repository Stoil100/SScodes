"use client";

import {
    dehydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { ParallaxProvider as ParProvider } from "react-scroll-parallax";

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
    return <ParProvider>{children}</ParProvider>;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const dehydratedState = dehydrate(queryClient)
    return (
        <QueryClientProvider client={queryClient}>
            {/* <Hydrate state={dehydratedState}>{children}</Hydrate> */}
            {children}
        </QueryClientProvider>
    );
}
