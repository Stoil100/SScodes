import NextAuthProvider from "@/components/Providers";
export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <NextAuthProvider>{children}</NextAuthProvider>;
}
