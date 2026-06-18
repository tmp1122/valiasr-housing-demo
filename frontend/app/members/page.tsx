"use client";

import { useEffect, useState } from "react";

export default function Members() {
  const [members, setMembers] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    fetch("https://YOUR_BACKEND_URL/api/users", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then(setMembers);
  }, []);

  const approve = async (id: number) => {
    const res = await fetch(
      `https://YOUR_BACKEND_URL/api/users/approve/${id}`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await res.json();
    alert(data.message);
    location.reload();
  };

  return (
    <main className="p-10">
      <h1 className="text-xl mb-6">مدیریت اعضا</h1>

      {members.map((m: any) => (
        <div key={m.id} className="bg-slate-800 p-4 rounded mb-4">
          <p>نام: {m.full_name}</p>
          <p>کد ملی: {m.national_id}</p>
          <p>وضعیت: {m.status}</p>

          {m.status !== "approved" && (
            <button
              onClick={() => approve(m.id)}
              className="mt-3 px-4 py-2 bg-teal-500 text-black rounded"
            >
              تأیید عضویت
            </button>
          )}
        </div>
      ))}
    </main>
  );
}
