"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "./navigationSetup";

const languages = ["en", "bg"] as const;
type Language = (typeof languages)[number];

type Props = {
    className?: string;
};
export default function LanguageSwitch({ className }: Props) {
    const t = useTranslations("Common");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (language: Language) => {
        router.replace(pathname, { locale: language });
    };

    const getIcon = (code: Language) => {
        switch (code) {
            case "en":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="flag-icons-bg"
                        width={24}
                        height={24}
                        viewBox="0 0 640 480"
                    >
                        <path fill="#fff" d="M0 0h640v160H0z" />
                        <path fill="#00966e" d="M0 160h640v160H0z" />
                        <path fill="#d62612" d="M0 320h640v160H0z" />
                    </svg>
                );
            case "bg":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="flag-icons-gb"
                        viewBox="0 0 640 480"
                        width={24}
                        height={24}
                    >
                        <path fill="#012169" d="M0 0h640v480H0z" />
                        <path
                            fill="#FFF"
                            d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"
                        />
                        <path
                            fill="#C8102E"
                            d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
                        />
                        <path
                            fill="#FFF"
                            d="M241 0v480h160V0zM0 160v160h640V160z"
                        />
                        <path
                            fill="#C8102E"
                            d="M0 193v96h640v-96zM273 0v480h96V0z"
                        />
                    </svg>
                );

            default:
                return null;
        }
    };

    return (
        <Button
            variant="ghost"
            className={cn("w-fit bg-transparent px-0 py-0", className)}
        >
            {languages.map((code) => (
                <div
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={clsx(
                        "flex w-fit items-center gap-4 bg-transparent px-2 text-lg",
                        code === locale && "hidden"
                    )}
                >
                    {getIcon(code)}
                </div>
            ))}
        </Button>
    );
}
