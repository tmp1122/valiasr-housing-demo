"use client";

import { useState } from "react";

export default function Login() {
  const [national_id, setNid] = useState("");
  const [password, setPass] = useState("");

  const login = async () => {
    const res = await fetch("https://YOUR_BACKEND_URL/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ national_id, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-xl mb-6">ورود</h1>

      <input
        className="w-full p-3 mb-4 bg-slate-800 rounded"
        placeholder="کد ملی"
        onChange={(e) => setNid(e.target.value)}
      />

      <input
        className="w-full p-3 mb-4 bg-slate-800 rounded"
        placeholder="رمز عبور"
        type="password"
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={login} className="w-full p-3 bg-teal-500 text-black rounded">
        ورود
      </button>
    </main>
  );
}
