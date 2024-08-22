import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        );
    }

    try {
        const client = await clientPromise;
        const db = client.db("portfolio");

        const project = await db
            .collection("projects")
            .findOne({ _id: new ObjectId(id) });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ project });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        );
    }

    try {
        const client = await clientPromise;
        const db = client.db("portfolio");

        const { title, description, image, links } = await req.json();

        const updatedProject = {
            title,
            description,
            image,
            links,
        };

        const result = await db.collection("projects").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedProject }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Project updated successfully" });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        );
    }

    try {
        const client = await clientPromise;
        const db = client.db("portfolio");

        const result = await db.collection("projects").deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 1) {
            return NextResponse.json({ message: "Project deleted successfully" });
        } else {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
