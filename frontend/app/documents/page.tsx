"use client";

import { useState } from "react";

export default function Documents() {
  const [file, setFile] = useState<any>(null);
  const [docType, setDocType] = useState("");

  const upload = async () => {
    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("file", file);
    form.append("doc_type", docType);

    const res = await fetch("https://YOUR_BACKEND_URL/api/documents/upload", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: form,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-xl mb-6">آپلود مدارک</h1>

      <input
        className="w-full p-3 mb-4 bg-slate-800 rounded"
        placeholder="نوع مدرک (مثلاً: کارت ملی)"
        onChange={(e) => setDocType(e.target.value)}
      />

      <input
        type="file"
        className="w-full p-3 mb-4 bg-slate-800 rounded"
        onChange={(e) => setFile(e.target.files?.[0])}
      />

      <button onClick={upload} className="w-full p-3 bg-teal-500 text-black rounded">
        آپلود
      </button>
    </main>
  );
}
