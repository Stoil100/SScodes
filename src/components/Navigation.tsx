import React from "react";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button type="submit" variant="ghost">
                <LogOut />
            </Button>
        </form>
    );
}

export const Navigation = async () => {
    const session = await auth();
    console.log(session);

    return (
        <header>
            <nav className="flex justify-between items-center w-full px-4 py-4 bg-[#020202] bg-opacity-30 text-white">
                <h1 className="text-3xl">Stoil's labs</h1>
                {session?.user ? (
                    <div className="flex items-center justify-center gap-4">
                        <LanguageSwitch />
                        <SignOut />
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <LanguageSwitch />
                        <Link href="/login">
                            <LogIn />
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};
