// app/profile/page.tsx
import { auth, signOut } from "@/auth";
import { ProjectsForm } from "@/components/schemas/projects";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <main className="w-full flex justify-center items-center px-4 py-6">
            {
                //@ts-ignore
                session.user!.admin! ? (
                    <section className="w-full space-y-6">
                        <h2 className="text-center text-6xl font-bold text-white">
                            Upload projects:
                        </h2>
                        <ProjectsForm />
                    </section>
                ) : (
                    <div>
                        <p>Well, there was no point in that... or was there?</p>
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button type="submit">Sign Out</button>
                        </form>
                    </div>
                )
            }
        </main>
    );
}