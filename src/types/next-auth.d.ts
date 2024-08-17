import "next-auth";

declare module "next-auth" {
    interface User {
        admin?: boolean | null;
        password?: string | null;
    }

    interface Session {
        user?: User;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        admin?: boolean | null;
        password?: string | null;
    }
}
