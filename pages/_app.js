import "@/styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700", "800"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${poppins.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
