export const metadata = {
  title: "تعاونی مسکن کارکنان پالایشگاه گاز حضرت ولیعصر (عج)",
  description: "سامانه مدیریت تعاونی مسکن",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ background: "#0f172a", color: "white", fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
