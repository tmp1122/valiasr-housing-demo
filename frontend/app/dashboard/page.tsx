"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://YOUR_BACKEND_URL/api/users/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <div className="p-10">در حال بارگذاری...</div>;

  return (
    <main className="p-10">
      <h1 className="text-xl mb-4">پنل عضو</h1>

      <p>نام: {user.full_name}</p>
      <p>کد ملی: {user.national_id}</p>
      <p>وضعیت: {user.status}</p>
    </main>
  );
}
