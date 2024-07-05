
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { getMessages } from "next-intl/server";

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
                        <main>{children}</main>
                    </NextIntlClientProvider>
            </body>
        </html>
    );
}
