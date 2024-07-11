"use client";

import React from "react";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="w-full flex flex-col px-8 py-4 bg-gray-900 text-white border-t-2 border-t-sky-500">
            <div className="w-full flex flex-col md:flex-row justify-between items-center py-3">
                <h2 className="text-xl font-bold">{t("title")}</h2>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0 items-center">
                    <a href="#about" className="hover:text-sky-500">{t("about")}</a>
                    <a href="#skills" className="hover:text-sky-500">{t("skills")}</a>
                    <a href="#projects" className="hover:text-sky-500">{t("projects")}</a>
                    <a href="#contact" className="hover:text-sky-500">{t("contact")}</a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                <LanguageSwitch />
                <p className="text-center mt-4 md:mt-0">
                    <span className="text-sky-500">
                        &copy; {t("copy", { year: new Date().getFullYear() })}
                    </span>
                </p>
            </div>
        </footer>
    );
}
