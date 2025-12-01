// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Miden Yap Estimator",
  description: "Fun estimator based on mindshare yapping rules",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex justify-center items-center`}
        style={{
          backgroundImage: "url('/midenn.jfif')", // <- PENTING (nama file harus sama)
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* DARK OVERLAY supaya teks tetap kebaca */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 w-full max-w-2xl px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
