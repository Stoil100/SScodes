import AuthForm from "@/components/schemas/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();
    if (session) {
        redirect("/profile");
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <AuthForm variant="login" />
        </main>
    );
}
