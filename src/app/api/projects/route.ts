import { NextResponse } from "next/server";
export const API_URL = process.env.API_URL || "https://www.api.ifecodes.xyz";

async function getProjects() {
  try {
    const res = await fetch(`${API_URL}/api/projects`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.projects ?? data.data ?? []);
  } catch {
    return [];
  }
}

function isBackendHNG14Project(project: Project): boolean {
  return (
    project?.folder?.name?.toString() === "14" &&
    project?.type?.toLowerCase() === "backend"
  );
}

export type Project = {
  projectId: string;
  title: string;
  description: string;
  tech: string[];
  type: string;
  githubUrl?: string;
  liveUrl?: string;
  contribution?: string;
  featured?: boolean;
  folder?: {
    id: string;
    name: string | number;
  };
  skillsDemonstrated?: string[];
  features?: string[];
  difficulty?: string;
  [key: string]: unknown;
};


export async function GET() {
  const all = await getProjects();
  const filtered = all.filter(isBackendHNG14Project);
  return NextResponse.json(filtered);
}
