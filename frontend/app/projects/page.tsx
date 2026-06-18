"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://YOUR_BACKEND_URL/api/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-xl mb-6">پروژه‌ها</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p: any) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="bg-slate-800 p-4 rounded-lg"
          >
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-slate-400">{p.location}</p>
            <p className="mt-2 text-teal-400">پیشرفت: {p.progress_percent}%</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
