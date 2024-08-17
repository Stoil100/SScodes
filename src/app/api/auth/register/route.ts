// pages/api/auth/register.ts
import clientPromise from "@/lib/mongodb";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        const client = await clientPromise;
        const db = client.db();

        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User exists already!" },
                { status: 422 }
            );
        }

        const hashedPassword = await hash(password, 10);

        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            admin: false,
        });

        return NextResponse.json({ message: "User created!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
