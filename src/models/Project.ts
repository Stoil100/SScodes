type Project = {
    _id: string;
    title: string;
    description: string;
    image: any;
    links: string[];
};
type Projects = Project[];

export type { Project, Projects };
