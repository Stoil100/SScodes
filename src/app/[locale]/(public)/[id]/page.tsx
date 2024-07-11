"use client";
import { Project } from "@/models/Project";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProjectPage({ params }: { params: { id: string } }) {
    const [project, setProject] = useState<Project | null>(null);
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${params.id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProject(data.project);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProject();
    }, [params]);
    if (!project) return <div>Project not found</div>;
    return (
        <section className="w-full min-h-[80vh] text-white space-y-4 px-6 py-4">
            <h1 className="md:text-8xl text-4xl font-bold text-center">
                {project!.title}
            </h1>
            <img src={project?.image!} className="w-full h-auto" />
            <p className="text-2xl">{project?.description}</p>
            <ul className="list-disc pl-6">
                {project?.links.map((link, index) => (
                    <li key={index} className="text-blue-500 break-all">
                        <Link href={link}>{link}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
