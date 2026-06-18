"use client";

import { useEffect, useState } from "react";

export default function Installments() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://YOUR_BACKEND_URL/api/installments/my", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const pay = async (id: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://YOUR_BACKEND_URL/api/installments/pay/${id}`,
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
      <h1 className="text-xl mb-6">اقساط من</h1>

      {items.map((i: any) => (
        <div key={i.id} className="bg-slate-800 p-4 rounded mb-4">
          <p>مبلغ: {i.amount} تومان</p>
          <p>تاریخ سررسید: {i.due_date}</p>
          <p>وضعیت: {i.paid ? "پرداخت شده" : "پرداخت نشده"}</p>

          {!i.paid && (
            <button
              onClick={() => pay(i.id)}
              className="mt-3 px-4 py-2 bg-teal-500 text-black rounded"
            >
              پرداخت
            </button>
          )}
        </div>
      ))}
    </main>
  );
}
