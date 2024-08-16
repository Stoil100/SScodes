import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");

        const projects = await db.collection("projects").find({}).toArray();

        return NextResponse.json({ projects });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function POST(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");

        const { title, description, image, links } = await req.json();

        const newProject = {
            title,
            description,
            image,
            links,
        };

        await db.collection("projects").insertOne(newProject);

        return NextResponse.json({ message: "Project added successfully" });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
