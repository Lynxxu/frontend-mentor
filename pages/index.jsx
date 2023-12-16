import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen justify-center flex-col items-center p-24 ${inter.className}`}
    >
      <p className="text-2xl">
        Frontend-mentor <Link href="/posts/QR-code-challenge">solution </Link>{" "}
        sites
      </p>
      <p>Created by Xiangbo </p>
    </main>
  );
}
