import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Inter as FontSans, Raleway, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { ParallaxProvider, QueryProvider } from "@/components/Providers";
export const metadata: Metadata = {
    title: "Stoil Portfolio",
    description: "",
    // icons: [{ rel: 'icon', url: Favicon.src }],
};
const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-raleway",
});

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <head />
            <body className="font-sans">
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <QueryProvider>
                        <ParallaxProvider>
                            <main
                                className={cn(
                                    "bg-[#0f0f0f] min-h-screen flex flex-col justify-between scroll-smooth",
                                    nunito.className
                                )}
                            >
                                {/* <Navigation /> */}
                                {children}
                                <Footer />
                            </main>
                        </ParallaxProvider>
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
