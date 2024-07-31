"use client";
import { Project } from "@/models/Project";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectPage({ params }: { params: { id: string } }) {
    const [project, setProject] = useState<Project | null>(null);
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`/api/projects/${params.id}`);
                setProject(response.data.project);
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
