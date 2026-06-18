import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">
        تعاونی مسکن کارکنان پالایشگاه گاز حضرت ولیعصر (عج)
      </h1>

      <p className="text-slate-300 mb-10">
        سامانه مدیریت پروژه‌ها، اقساط، مدارک و ارتباط با اعضا
      </p>

      <div className="flex justify-center gap-4">
        <Link href="/register" className="px-6 py-3 bg-teal-500 rounded-lg text-black">
          ثبت‌نام عضو جدید
        </Link>

        <Link href="/login" className="px-6 py-3 bg-slate-700 rounded-lg">
          ورود اعضا
        </Link>
      </div>

      <div className="mt-16">
        <Link href="/projects" className="text-teal-400 underline">
          مشاهده پروژه‌ها
        </Link>
      </div>
    </main>
  );
}
