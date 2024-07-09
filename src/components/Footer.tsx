import React from "react";
import LanguageSwitch from "./LanguageSwitch";

export default function Footer() {
    return (
        <footer className="w-full flex flex-col px-8 py-2 text-white border-t-2 border-t-sky-500">
            <div className="w-full flex justify-between py-3">
                <h2>Stoil's Labs</h2>
                <div className="flex justify-end gap-6 items-center">
                    <h5>About</h5>
                    <h5>Skills</h5>
                    <h5>Projects</h5>
                    <h5>Contact</h5>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <LanguageSwitch />
                <p className="text-center">
                    <span className="text-sky-500">
                        &copy; {new Date().getFullYear()}
                    </span>{" "}
                    {/* {t("city")} */}
                </p>
            </div>
        </footer>
    );
}
