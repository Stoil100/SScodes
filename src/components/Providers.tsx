"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { ParallaxProvider as ParProvider } from "react-scroll-parallax";

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
    return <ParProvider>{children}</ParProvider>;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default function NextAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    return <SessionProvider>{children}</SessionProvider>;
}
