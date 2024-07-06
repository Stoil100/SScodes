import AuthForm from "@/components/schemas/auth";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <AuthForm variant="login" />
      </main>
  );
}
