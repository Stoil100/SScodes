import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
    const session = await auth();
    if (!session) {
      redirect('/');
  }
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    );
}
