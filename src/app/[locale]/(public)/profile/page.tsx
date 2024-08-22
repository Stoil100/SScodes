"use client";
import { ProjectsForm } from "@/components/forms/projects";
import { Project } from "@/components/Project";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Projects } from "@/models/Project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession();
    const t = useTranslations("Profile");

    if (!session && status !== "loading") {
        redirect("/login");
    }

    const fetchProjects = async (): Promise<Projects> => {
        try {
            const { data } = await axios.get("/api/projects");
            return data.projects;
        } catch (error) {
            throw new Error("Error fetching projects");
        }
    };

    const {
        data: projects,
        isLoading,
        isError,
    } = useQuery<Projects, Error>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 60000, // 1 minute
        retry: 2,
        enabled: !!session?.user?.admin,
    });

    const deleteProject = useMutation({
        mutationFn: async (projectId: string) => {
            await axios.delete(`/api/projects/${projectId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    if (!session?.user?.admin) {
        return (
            <main className="w-full flex justify-center items-center">
                <section className="text-white">
                    <p>{t("noAccessMessage")}</p>
                    <button type="submit" onClick={() => signOut()}>
                        {t("signOut")}
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="w-full flex justify-center flex-col items-center px-4 py-10 gap-8">
            <section className="w-full space-y-6">
                <h2 className="text-center text-6xl font-bold text-white">
                    {t("uploadProjects")}
                </h2>
                <ProjectsForm />
            </section>
            <section className="w-full flex flex-col gap-4 mb-4">
                <h2 className="text-center text-6xl font-bold text-white">
                    {t("manageProjects")}
                </h2>
                <div className="flex justify-between flex-wrap">
                    {isLoading ? (
                        <p className="text-white">{t("loadingProjects")}</p>
                    ) : isError ? (
                        <p className="text-red-500">
                            {t("errorFetchingProjects")}
                        </p>
                    ) : (
                        projects?.map((project) => (
                            <div
                                className="md:w-1/3 p-2 mb-10"
                                key={project._id}
                            >
                                <Project {...project} />
                                <div className="flex gap-2 py-2">
                                    <Button
                                        variant="destructive"
                                        className="flex-1 space-x-1"
                                        onClick={() =>
                                            deleteProject.mutate(project._id)
                                        }
                                    >
                                        <Trash2 />
                                        <span>{t("delete")}</span>
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger className="flex-1">
                                            <Button className="bg-blue-500 hover:bg-blue-700 space-x-1 w-full">
                                                <Edit />
                                                <span>{t("edit")}</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-black flex max-h-screen overflow-y-scroll min-w-fit">
                                            <ProjectsForm project={project} />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
