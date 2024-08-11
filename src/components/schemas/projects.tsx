import { z } from "zod";

export const ProjectsSchema = (t: (arg: string) => string) =>
    z.object({
        title: z.string({ message: t("titleRequired") }),
        description: z.string().optional(),
        image: z.string().url().optional(),
        links: z.array(z.string().url()).optional(),
    });
