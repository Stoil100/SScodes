import React from "react";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, LogOut, Menu, UserRound } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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

    return (
        <header>
            <nav className="flex justify-between items-center w-full px-4 py-4 bg-[#020202] bg-opacity-30 text-white">
                <Link href="/" className="text-3xl">
                    SScodes
                </Link>
                {session?.user ? (
                    <div className="flex items-center justify-center gap-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="!bg-transparent !text-white">
                                        <Menu />
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="pt-2">
                                        <NavigationMenuLink href="/profile">
                                            <UserRound className="w-full" />
                                        </NavigationMenuLink>
                                        <NavigationMenuLink>
                                            <LanguageSwitch className="w-full" />
                                        </NavigationMenuLink>
                                        <NavigationMenuLink>
                                            <SignOut />
                                        </NavigationMenuLink>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
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
