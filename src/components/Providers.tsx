'use client';

import { ParallaxProvider as ParProvider } from 'react-scroll-parallax';

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
  return <ParProvider>{children}</ParProvider>;
}