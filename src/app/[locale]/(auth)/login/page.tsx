import AuthForm from "@/components/schemas/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();
    if (session) {
        redirect("/profile");
    }
    return (
        <main className="flex h-screen items-center justify-center">
            <div className="relative flex h-full  w-full flex-col items-center justify-center space-y-5 px-10 drop-shadow-lg md:w-1/2 md:p-0">
                <div className="z-10 w-full md:w-2/3">
                    <AuthForm variant="login" />
                </div>
            </div>
            <div className="relative hidden h-full w-1/2 flex-col items-center justify-center gap-8 overflow-hidden md:flex ">
                <img
                    className="absolute right-0 h-max min-h-screen overflow-hidden object-cover"
                    src="/auth/pattern.png"
                />
            </div>
        </main>
    );
}
