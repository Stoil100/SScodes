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
        <main>
            {
                //@ts-ignore
                session.user!.admin! ? (
                    <ProjectsForm />
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
