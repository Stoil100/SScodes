import React from "react";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function SignOut() {
    return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    )
  }

export const Navigation = async () => {
    const session = await auth();
    console.log(session);

    return (
        <header>
            <nav>
                <h1>Stoil's labs</h1>
                {session?.user ? (
                    <div><SignOut/></div>
                ) : (
                    <Link href="/api/auth/signin">
                        <Button>Sign in</Button>
                    </Link>
                )}
            </nav>
        </header>
    );
};
