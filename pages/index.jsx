import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>Front-end mentor solutions</title>
      </Head>
      <main
        className={`flex min-h-screen justify-center flex-col items-center p-24`}
      >
        <div className="text-center w-full h-full">
          <p className="text-2xl font-medium">
            Frontend-mentor{" "}
            <Link href="/posts/QR-Code-Challenge/main">solution</Link> sites
          </p>
          <p>Created by Lynx </p>
        </div>
        <div className=""></div>
      </main>
    </>
  );
}
