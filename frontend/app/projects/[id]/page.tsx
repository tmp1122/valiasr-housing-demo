"use client";

import { useEffect, useState } from "react";

export default function ProjectDetails({ params }: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`https://YOUR_BACKEND_URL/api/projects/${params.id}/details`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-10">در حال بارگذاری...</div>;

  return (
    <main className="p-10">
      <h1 className="text-2xl mb-4">{data.project.title}</h1>

      <p className="text-slate-300 mb-6">{data.project.description}</p>

      <h2 className="text-lg mb-3">گالری تصاویر</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {data.images.map((img: any) => (
          <img
            key={img.id}
            src={`https://YOUR_BACKEND_URL/${img.image_path}`}
            className="rounded-lg"
          />
        ))}
      </div>
    </main>
  );
}
