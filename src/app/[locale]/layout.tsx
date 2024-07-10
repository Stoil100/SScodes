import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Stoil Portfolio",
    description: "",
    // icons: [{ rel: 'icon', url: Favicon.src }],
};

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
                    <main className="bg-[#0f0f0f] min-h-screen flex flex-col justify-between">
                        {/* <Navigation /> */}
                        {children}
                        <Footer />
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
