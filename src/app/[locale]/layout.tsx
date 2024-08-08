import Footer from "@/components/Footer";
import { ParallaxProvider, QueryProvider } from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Nunito } from "next/font/google";
import "./globals.css";
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
