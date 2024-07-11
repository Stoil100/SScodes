"use client";
import { Project } from '@/models/Project';
import React, { useEffect, useState } from 'react'

export default function ProjectPage({ params }: { params: { id: string } }){

    console.log(params.id);
    const [project, setProject] = useState<Project | null>(null);
    useEffect(() => {
        const fetchProject = async () => {
          try {
            const response = await fetch(`/api/projects/${params.id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProject(data.project);
          } catch (err) {
            console.log(err);
          }
        };
        fetchProject();
      }, [params]);
    

    console.log(project)
  return (
    <div>{project?.title}</div>
  )
}
