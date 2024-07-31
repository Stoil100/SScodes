"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaJs, FaGit, FaNpm } from 'react-icons/fa';
import { UserRound } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/schemas/contact";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import { Projects } from "@/models/Project";

const ProfileSection: React.FC = () => {
    const t = useTranslations("Home.ProfileSection");

    return (
        <section className="shadow-lg bg-[#141414] text-white h-screen px-4 flex flex-col items-center justify-center w-full">
            <div className="space-y-4">
                <h1 className="text-7xl font-bold">
                    {t("greeting")}{" "}
                    <span className="text-[#00b4d8]">{t("name")}</span>
                </h1>
                <p className="text-2xl capitalize">{t("role")}</p>
                <a href="#contact">
                    <Button
                        variant="outline"
                        className="bg-transparent border-4 border-[#00b4d8] text-[#00b4d8] hover:bg-[#0077b6]/50 hover:text-white font-bold text-xl py-5"
                    >
                        {t("contact")}
                    </Button>
                </a>
            </div>
        </section>
    );
};
const AboutSection: React.FC = () => {
    const t = useTranslations("Home.AboutSection");

    return (
        <section
            id="about"
            className="text-white lg:px-20 px-5 min-h-[50vh] flex justify-center flex-col gap-4"
        >
            <h2 className="text-5xl font-bold">{t("title")}</h2>
            <div className="flex gap-3">
                <hr className="w-16 border-2 rounded border-[#00b4d8] mt-4" />
                <p className="text-2xl">{t("description")}</p>
            </div>
        </section>
    );
};
const icons = [
    "/home/spinner/next.png",
    "/home/spinner/typescript.png",
    "/home/spinner/tailwind.png",
    "/home/spinner/node.png",
    "/home/spinner/firebase.png",
    "/home/spinner/csharp.png",
    "/home/spinner/git.png",
];
const SkillsSection: React.FC = () => {
    const t = useTranslations("Home.SkillsSection");

    return (
        <section
            id="skills"
            className="min-h-screen w-full flex items-center overflow-hidden flex-col pb-20 justify-around text-white bg-gradient-to-b from-[#0f0f0f] to-[#023e8a]"
        >
            <h1 className="text-7xl font-bold mb-10">{t("title")}</h1>
            <div className="relative flex items-center md:w-80 md:h-80 sm:h-60 sm:w-60 h-40 w-40 justify-center">
                <Image
                    src="/home/spinner/react.png"
                    alt="Central Image"
                    layout="fill"
                    className="rounded-full shadow-xl"
                />
                <ul className="relative flex justify-center animate-spin animate-duration-[5000ms] items-center w-full h-full box-border p-2.5 rounded-full ">
                    {icons.map((icon, i) => (
                        <li
                            key={i}
                            className="absolute flex justify-center items-center w-1/4 h-1/4 box-border  rounded-full list-none z-10"
                            style={{
                                transform: `rotate(${
                                    (360 / icons.length) * i
                                }deg) translateX(300%)`,
                            }}
                        >
                            <div
                                className="w-full h-full flex justify-center items-center"
                                style={{
                                    transform: `rotate(-${
                                        (360 / icons.length) * i
                                    }deg)`,
                                }}
                            >
                                <img
                                    src={icon}
                                    className="animate-spin animate-reverse drop-shadow-2xl"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

const ProjectsSection: React.FC = () => {
    const t = useTranslations("Home.ProjectsSection");
    const [projects, setProjects] = useState<Projects>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/api/projects");
                setProjects(response.data.projects);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section
            id="projects"
            className="flex min-h-screen flex-col justify-between bg-[#023e8a] w-full"
        >
            <div className="m-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-4 py-8 text-center md:h-1/2 md:px-40">
                <h1 className="text-5xl font-bold uppercase text-white md:text-7xl">
                    {t("title")}
                </h1>
                <span className="mb-4 block h-2 w-1/3 bg-blue-700"></span>
            </div>

            <div className="flex  w-full flex-col md:flex-row ">
                {projects.map((project) => (
                    <Link
                        key={project._id} // Add key prop here
                        href={project._id}
                        className="relative bg-cover bg-center md:w-1/3"
                    >
                        <img
                            src={project.image}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 flex h-full w-full items-center justify-center bg-gray-600/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100">
                            <h4 className="text-center text-5xl">
                                {project.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

const ContactSection: React.FC = () => {
    const t = useTranslations("Home.ContactSection");

    return (
        <ParallaxBanner
            layers={[
                { image: "/home/backgrounds/contact.jpg", speed: -20 },
                {
                    children: (
                        <section
                            id="contact"
                            className="absolute inset-0 flex h-full w-full flex-wrap items-center justify-center md:justify-around gap-4 bg-slate-200/60 px-4 md:px-20 py-4"
                        >
                            <div className="max-w-xl text-center md:text-left backdrop-blur-sm px-4 py-2 rounded-xl">
                                <h1 className="text-5xl md:text-8xl border-b-4 border-[#48cae4] mb-4">
                                    {t("title")}
                                </h1>
                                <h5 className="text-3xl">{t("description")}</h5>
                            </div>
                            <ContactForm />
                        </section>
                    ),
                },
            ]}
            className="xl:min-h-[80vh] min-h-[130vh] "
        />
    );
};

export default function Home() {
    return (
        <main className="flex w-full h-max flex-col items-center justify-between ">
            <ProfileSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
        </main>
    );
}
