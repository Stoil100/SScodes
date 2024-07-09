import AuthForm from "@/components/schemas/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await auth();
    if (session) {
        redirect("/profile");
    }
    return (
        <main className="flex h-screen items-center">
                    <div className="relative hidden h-full w-1/2 flex-col items-center justify-center gap-8 overflow-hidden md:flex ">
                        <img
                            className="absolute left-0 h-max min-h-screen rotate-180 overflow-hidden object-cover"
                            src="/auth/pattern.png"
                        />
                    </div>
                    <div className="relative flex h-full w-full flex-col items-center justify-center space-y-5 px-10 drop-shadow-lg md:w-1/2 md:p-0">
                        <div className="z-10 w-full md:w-2/3">
                            <AuthForm variant="register" />
                        </div>
                    </div>
                </main>
    );
}
