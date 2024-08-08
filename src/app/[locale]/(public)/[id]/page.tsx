"use client";
import { Project } from "@/models/Project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

export default function ProjectPage({ params }: { params: { id: string } }) {
    const fetchProject = async (): Promise<Project> => {
        try {
            const { data } = await axios.get(`/api/projects/${params.id}`);
            return data.project;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || "Error fetching project"
            );
        }
    };

    const {
        data: project,
        error,
        isLoading,
        isError,
    } = useQuery<Project, Error>({
        queryKey: ["project", params.id],
        queryFn: fetchProject,
        staleTime: 60000, // 1 minute
        retry: 2,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <section className="w-full min-h-[80vh] text-white space-y-4 px-6 py-4">
            <h1 className="md:text-8xl text-4xl font-bold text-center">
                {project.title}
            </h1>
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto"
            />
            <p className="text-2xl">{project.description}</p>
            <ul className="list-disc pl-6">
                {project.links.map((link, index) => (
                    <li key={index} className="text-blue-500 break-all">
                        <Link href={link}>{link}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
