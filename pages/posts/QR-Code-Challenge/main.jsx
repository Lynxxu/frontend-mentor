import Image from "next/image";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen justify-center flex-col items-center bg-blue-100`}
    >
      <div className="flex items-center flex-col w-[350px] h-[550px] bg-white rounded-2xl">
        <Image
          width={300}
          height={300}
          alt="QR code"
          src="/image-qr-code.png"
          className="rounded-lg mt-[25px]"
        />
        <p className="m-[25px] mb-4 font-bold text-2xl text-gray-600 text-center">
          Improve your front-end skills by building projects
        </p>
        <p className="m-[25px] mt-0 text-gray-400 text-center">
          Scan the QR code to visit Frontend Mentor and take your coding skills
          to the next level
        </p>
      </div>
    </main>
  );
}
