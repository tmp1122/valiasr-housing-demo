"use client";

import Link from "next/link";

export default function Admin() {
  return (
    <main className="p-10">
      <h1 className="text-xl mb-6">پنل مدیریت</h1>

      <div className="flex flex-col gap-4">
        <Link href="/admin/members" className="bg-slate-800 p-4 rounded">
          مدیریت اعضا
        </Link>
      </div>
    </main>
  );
}
