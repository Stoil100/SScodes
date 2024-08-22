import { Project as ProjectType } from "@/models/Project";
import Link from "next/link";
import React from "react";

export const Project: React.FC<ProjectType> = (project) => {
    return (
        <Link
            href={{ pathname: project._id }}
            className="relative bg-cover bg-center md:w-1/3"
        >
            <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
            />
            <div className="absolute top-0 flex h-full w-full items-center justify-center bg-gray-600/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100">
                <h4 className="text-center text-5xl">{project.title}</h4>
            </div>
        </Link>
    );
};
