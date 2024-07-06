// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function getProjects() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio'); // Ensure you use the correct database name

    const projects = await db.collection('projects').find({}).toArray();

    return NextResponse.json({ projects });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function setProjects(req: NextRequest) {
    try {
      const client = await clientPromise;
      const db = client.db('portfolio');
      const body = await req.json();
  
      const { name, image, links } = body;
  
      const newProject = { name, image, links };
  
      await db.collection('projects').insertOne(newProject);
  
      return NextResponse.json({ message: 'Project added successfully' });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
